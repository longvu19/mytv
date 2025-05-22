<script lang="ts" setup>
import { ref, watchEffect, computed } from "vue";
import type { ComputedRef, Ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
import Layout from "../components/layout/Layout.vue";
import MoviePlayer from "../components/base/MoviePlayer.vue";
import MovieMeta from "../components/base/MovieMeta.vue";
import EpisodeList from "../components/base/EpisodeList.vue";
import LazyLoadingImg from "../components/base/LazyLoadingImg.vue";
import { getMovieDetail } from "../services/movieService";
import type {
  MovieDetailResponse,
  Episode
} from "../services/types";
const props = withDefaults(defineProps<{
  slug: string;
  ep?: string;
  server?: string;
}>(), {
  ep: '1',
})
const movieResponse: MovieDetailResponse = await getMovieDetail(props.slug);
const { movie, status } = movieResponse;
const episodes = movie.episodes;
const currentEp: Ref<Episode | null> = ref(null);
const currentEpNum: Ref<number> = ref(0);
const poster_url: Ref<string> = ref('');
const servers: string[] = [
  'vietsub',
  'thuyet-minh'
]
const serverIndex: ComputedRef<number> = computed(() => {
  const server = props.server || servers[0];
  return servers.indexOf(server);
})
if (!status) {
  alert("Phim đang được cập nhật");
  router.push({ name: "home" });
} else {
  watchEffect(() => {
    let ep = props.ep ? episodes[serverIndex.value].items.find(episode => episode.slug === props.ep || episode.name === props.ep) : episodes[serverIndex.value].items[serverIndex.value];
    if (ep) {
      currentEp.value = ep;
      currentEpNum.value = episodes[serverIndex.value].items.indexOf(ep);
    } else {
      alert("Chưa có tập phim này");
      router.push({ name: route.name, params: { ...route.params, ...{ ep: episodes[serverIndex.value].items[0].slug, server: servers[serverIndex.value] } }, force: true });
    }
  })
  const verified_url = computed(async () => {
    if (movie.poster_url) {
      return movie.poster_url;
    } else {
      const photoPlaceholder = await import("../assets/photo.svg?url");
      return photoPlaceholder.default;
    }
  })
  poster_url.value = await verified_url.value;
}
</script>

<template>
  <Layout v-if="status">
    <MoviePlayer class="movie-player" :ep="currentEp" v-if="currentEp" :thumb="movie.thumb_url" />
    <div class="movie-info">
      <div class="movie-info__episodes">
        <div class="movie-info__episodes-server" v-for="episode, index in episodes" :key="index">
          <strong class="movie-info__episodes-title">{{ episode.server_name }}</strong>
          <EpisodeList class="movie-info__episodes-list" :isServerSelected="index === serverIndex" :episodes="episode"
            :currentEp="currentEpNum" :server="servers[index]" :totalEp="parseInt(movie.total_episodes)" />
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