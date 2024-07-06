<script lang="ts" setup>
import Title from "./base/Title.vue";
import MovieGrid from "./base/MovieGrid.vue";
import Pagination from "./base/Pagination.vue";
import type { CategoryMoviesResponse } from "../services/types";
import { getCategoryMovies } from "../services/categoryMoviesService";

const props = withDefaults(
  defineProps<{
    title: string;
    slug: string;
    page?: number;
  }>(),
  {
    title: "Phim",
    page: 1,
  }
);

const ITEM_PER_PAGE = 15;

const movies: CategoryMoviesResponse = await getCategoryMovies(
  props.slug,
  props.page,
  ITEM_PER_PAGE
);
</script>

<template>
  <div class="category-movie">
    <Title class="category-movie__title">{{ title }}</Title>
    <MovieGrid :imgHost="movies.data.APP_DOMAIN_CDN_IMAGE" :movies="movies.data.items" />
    <Pagination v-bind="movies.data.params.pagination" />
  </div>
</template>

<style lang="scss" scoped>
.category-movie {
  padding: 100px 30px 0;

  &__title {
    margin-bottom: 30px;
  }
}
</style>