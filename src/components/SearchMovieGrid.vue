<script lang="ts" setup>
import Title from "./base/Title.vue";
import MovieGrid from "./base/MovieGrid.vue";
import type { MovieSearchResultResponse } from "../services/types";
import { getMovieSearchResult } from "../services/movieService";

const props = defineProps<{
  keyword: string;
}>();

const ITEM_PER_PAGE = 15;

const movies: MovieSearchResultResponse = await getMovieSearchResult(
  props.keyword,
  ITEM_PER_PAGE
);
</script>

<template>
  <div class="search-movie">
    <Title class="search-movie__title"
      >Tìm kiếm với từ khoá: "{{ keyword }}"</Title
    >
    <MovieGrid
      :imgHost="movies.data.APP_DOMAIN_CDN_IMAGE"
      :movies="movies.data.items"
    />
  </div>
</template>

<style lang="scss" scoped>
.search-movie {
  padding: 100px 30px 0;

  &__title {
    margin-bottom: 30px;
  }
}
</style>