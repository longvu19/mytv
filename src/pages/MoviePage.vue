<script lang="ts" setup>
import { ref, watch, watchEffect, computed } from "vue";
import type { ComputedRef, Ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
import Layout from "../components/layout/Layout.vue";
import MoviePlayer from "../components/base/MoviePlayer.vue";
import MovieMeta from "../components/base/MovieMeta.vue";
import EpisodeList from "../components/base/EpisodeList.vue";
import LazyLoadingImg from "../components/base/LazyLoadingImg.vue";
import Button from "../components/base/Button.vue";
import { getMovieDetail } from "../services/movieService";
import { getAltServers, buildServerGroups } from "../services/episodeSourceService";
import { usePlayerStore } from "../stores/movie";
import type {
  MovieDetailResponse,
  PlayableEpisode,
  EpisodeSource,
  ServerGroup
} from "../services/types";
const props = defineProps<{
  slug: string;
  ep?: string;
  server?: string;
}>()
const movieResponse: MovieDetailResponse = await getMovieDetail(props.slug);
const { movie, status } = movieResponse;
// Wait this long for the secondary source before starting the player with what we have
const ALT_SOURCE_WAIT_MS = 1500;
const servers: Ref<ServerGroup[]> = ref(status ? buildServerGroups(movie.episodes, []) : []);
const isAvailable: boolean = Boolean(status) && servers.value.length > 0;
const isAltLoading: Ref<boolean> = ref(isAvailable);
const isPlayerReady: Ref<boolean> = ref(!isAvailable);
const playerStore = usePlayerStore();
const currentEp: Ref<PlayableEpisode | null> = ref(null);
const currentEpNum: Ref<number> = ref(0);
const poster_url: Ref<string> = ref('');
const failedSources: Ref<Set<string>> = ref(new Set());
const sourceNotice: Ref<string> = ref('');
// Source chosen for the current episode, kept when the secondary source arrives mid-playback
const pinnedSource: Ref<{ episode: string; url: string } | null> = ref(null);
const serverIndex: ComputedRef<number> = computed(() => {
  return Math.max(servers.value.findIndex(server => server.key === props.server), 0);
})
const episodeId = (ep: PlayableEpisode): string => `${servers.value[serverIndex.value].key}/${ep.slug}`;
const usableSources = (ep: PlayableEpisode): EpisodeSource[] => {
  const usable = ep.sources.filter(source => !failedSources.value.has(source.url));
  return usable.length ? usable : ep.sources;
}
const defaultSource = (ep: PlayableEpisode): EpisodeSource | null => {
  const candidates = usableSources(ep);
  return candidates.find(source => source.provider === playerStore.preferredProvider) ?? candidates[0] ?? null;
}
const currentSource: ComputedRef<EpisodeSource | null> = computed(() => {
  const ep = currentEp.value;
  if (!ep || !isPlayerReady.value) return null;
  return usableSources(ep).find(source => source.url === pinnedSource.value?.url) ?? defaultSource(ep);
})
const sourceLabel = (source: EpisodeSource | null): string => {
  const index = currentEp.value?.sources.findIndex(item => item.url === source?.url) ?? -1;
  return `Nguồn ${index + 1}`;
}
const selectSource = (source: EpisodeSource) => {
  failedSources.value.delete(source.url);
  sourceNotice.value = '';
  playerStore.setPreferredProvider(source.provider);
  if (currentEp.value) pinnedSource.value = { episode: episodeId(currentEp.value), url: source.url };
}
const onSourceError = () => {
  const failed = currentSource.value;
  if (!failed) return;
  failedSources.value.add(failed.url);
  const next = currentSource.value;
  sourceNotice.value = next && next.url !== failed.url
    ? `${sourceLabel(failed)} đang lỗi, đã chuyển sang ${sourceLabel(next)}.`
    : `${sourceLabel(failed)} đang lỗi, vui lòng thử lại sau.`;
}
if (!isAvailable) {
  alert("Phim đang được cập nhật");
  router.push({ name: "home" });
} else {
  // Secondary source loads in the background so it never blocks the page
  const altServers = getAltServers(movie).then(alt => {
    if (alt.length) servers.value = buildServerGroups(movie.episodes, alt);
  }).finally(() => {
    isAltLoading.value = false;
  });
  Promise.race([altServers, new Promise(resolve => setTimeout(resolve, ALT_SOURCE_WAIT_MS))]).then(() => {
    isPlayerReady.value = true;
  });
  watchEffect(() => {
    const items = servers.value[serverIndex.value].items;
    let ep = props.ep ? items.find(episode => episode.slug === props.ep || episode.name === props.ep) : items[0];
    if (ep) {
      currentEp.value = ep;
      currentEpNum.value = items.indexOf(ep);
    } else if (!isAltLoading.value) {
      alert("Chưa có tập phim này");
      router.push({ name: route.name, params: { ...route.params, ...{ ep: items[0].slug, server: servers.value[serverIndex.value].key } }, force: true });
    }
  })
  watch([currentEp, isPlayerReady], () => {
    const ep = currentEp.value;
    if (!ep || !isPlayerReady.value) return;
    const id = episodeId(ep);
    if (pinnedSource.value?.episode === id && ep.sources.some(source => source.url === pinnedSource.value?.url)) return;
    pinnedSource.value = { episode: id, url: defaultSource(ep)?.url ?? '' };
    sourceNotice.value = '';
  }, { immediate: true })
  const verified_url = computed(async () => {
    if (movie.poster_url_webp || movie.poster_url) {
      return movie.poster_url_webp || movie.poster_url;
    } else {
      const photoPlaceholder = await import("../assets/photo.svg?url");
      return photoPlaceholder.default;
    }
  })
  poster_url.value = await verified_url.value;
}
</script>

<template>
  <Layout v-if="isAvailable">
    <MoviePlayer class="movie-player" :source="currentSource" v-if="currentSource"
      :thumb="movie.thumb_url_webp || movie.thumb_url" @error="onSourceError" />
    <div class="movie-player movie-player--placeholder" v-else></div>
    <div class="movie-info">
      <div class="movie-info__sources" v-if="currentEp && currentEp.sources.length > 1">
        <strong class="movie-info__episodes-title">Nguồn phát</strong>
        <div class="movie-info__sources-list">
          <Button v-for="source, index in currentEp.sources" :key="source.url" type="button" size="small"
            :primary="source.url === currentSource?.url" @click="selectSource(source)">
            Nguồn {{ index + 1 }}
          </Button>
        </div>
        <p class="movie-info__sources-notice" v-if="sourceNotice">{{ sourceNotice }}</p>
      </div>
      <div class="movie-info__episodes">
        <div class="movie-info__episodes-server" v-for="server, index in servers" :key="server.key">
          <strong class="movie-info__episodes-title">{{ server.name }}</strong>
          <EpisodeList class="movie-info__episodes-list" :isServerSelected="index === serverIndex" :episodes="server"
            :currentEp="currentEpNum" :server="server.key"
            :totalEp="Math.max(parseInt(movie.total_episodes) || 0, server.items.length)" />
        </div>
      </div>
      <h2 class="movie-info__title">{{ movie.name }}</h2>
      <div class="movie-info__content">
        <div class="movie-info__left" v-if="!$isMd.value && !$isSm.value">
          <div class="movie-info__poster">
            <LazyLoadingImg class="movie-info__poster-img" :imgSrc="poster_url" :imgAlt="movie.name" />
          </div>
        </div>
        <div class="movie-info__right">
          <MovieMeta :movie="movie" />
        </div>
      </div>
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
// Same box as the player while waiting for sources, so nothing jumps
.movie-player--placeholder
{
  width: 100%;
  height: 100vh;
  background-color: #000;
}

.movie-info
{
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  display: block;
  margin: 0 auto;

  &__episodes-server+&__episodes-server
  {
    margin-top: 15px;
  }

  &__sources
  {
    margin-top: 20px;

    @media (max-width: 768px)
    {
      margin-top: 0;
    }
  }

  &__sources-list
  {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 15px;
  }

  &__sources-notice
  {
    margin-top: 10px;
    font-size: 0.9rem;
    color: #ffb4a2;
  }

  &__title
  {
    font-size: 2rem;
    font-weight: 600;
    margin-top: 20px;

    @media (max-width: 768px)
    {
      margin-top: 30px;
    }
  }

  &__content
  {
    display: flex;
    gap: 20px;
    margin-top: 20px;
  }

  &__left
  {
    flex: 0 0 30%;
  }

  &__right
  {
    flex: 1 0 70%;
  }

  &__poster
  {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__poster-img
  {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__episodes
  {
    margin-top: 20px;

    @media (max-width: 768px)
    {
      margin-top: 0;
    }
  }

  &__episodes-title
  {
    font-size: 1.2rem;
    font-weight: 600;
  }

  &__episodes-list
  {
    margin-top: 20px;
  }
}
</style>