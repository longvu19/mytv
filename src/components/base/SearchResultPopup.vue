<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { ComputedRef, onUnmounted } from "vue";
import { getMovieSearchResult } from "../../services/movieService";
import type {
  MovieSearchResultResponse,
  MovieListInfo,
} from "../../services/types";
import SearchResult from "./SearchResult.vue";
const props = defineProps<{
  keyword: string;
  isMobile?: boolean;
}>();
const abortController = new AbortController();
onUnmounted(() => {
  abortController.abort();
})
const searchResult: MovieSearchResultResponse | null = await getMovieSearchResult(props.keyword, 10, abortController);
const data: ComputedRef<MovieListInfo[]> = computed(() => {
  return searchResult ? searchResult.data.items : [];
});

const emits = defineEmits<{
  (e: 'closePopup', event: Event): void
}>();

onMounted(() => {
  window.addEventListener("click", (e) => {
    emits("closePopup", e);
  }, {
    once: true
  })
})
</script>

<template>
  <div v-if="searchResult" class="search-result" :class="{ 'search-result--mobile': props.isMobile }">
    <div class="search-result__list-container">
      <SearchResult :result="data" :imgHost="searchResult.data.APP_DOMAIN_CDN_IMAGE" v-if="data.length > 0" />
      <div v-else class="search-result__no-result">Không tìm thấy kết quả cho "{{ keyword }}"</div>
    </div>
    <div class="search-result__footer" v-if="data.length > 0">
      <RouterLink :to="{ name: 'tim-kiem', query: { k: keyword } }" class="search-result__footer-link" :class="{ 'search-result__footer-link--mobile': props.isMobile }">
        Xem thêm
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$className: "search-result";

.#{$className} {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: rgb(17, 17, 17);

  &__no-result {
    text-align: center;
    color: white;
    padding: 10px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &--mobile {
    display: flex;
    position: static;
    flex-grow: 1;
    background: transparent;
    height: calc(100% - 70px);

    .#{$className}__list-container {
      max-height: unset;
      flex-grow: 1;
    }

    .#{$className}__no-result {
      height: 100%;
    }
  }

  &__list-container {
    max-height: 380px;
    overflow: auto;
  }

  &__footer {
    display: flex;
  }

  &__footer-link {
    display: block;
    width: 100%;
    padding: 10px 0;
    text-decoration: none;
    color: white;
    text-align: center;
    background: rgb(17, 17, 17);

    &--mobile {
      padding: 20px 0;
    }

    &:hover {
      background: rgb(64, 64, 64);
    }
  }
}
</style>