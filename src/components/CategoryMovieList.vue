<script lang="ts" setup>
import Title from './base/Title.vue';
import MovieList from './base/MovieList.vue';
import Button from './base/Button.vue';
import type { CategoryMoviesResponse, MovieListInfo } from '../services/types';
import { getCategoryMovies } from '../services/categoryMoviesService';
const props = defineProps<{
  title: string;
  category: string;
}>()

const categoryMoiveList: CategoryMoviesResponse = await getCategoryMovies(props.category);
const movieList: MovieListInfo[] = await categoryMoiveList.data.items;
const APP_DOMAIN_CDN_IMAGE = await categoryMoiveList.data.APP_DOMAIN_CDN_IMAGE;

</script>

<template>
  <div class="category">
    <div class="category__tilte-container">
      <Title class="category__title">{{ title }}</Title>
      <RouterLink :to="{ name: category, state: { category: title }, force: true }" class="main-menu__link">
        <Button type="button" size="small">Xem thêm</Button>
      </RouterLink>
    </div>
    <div class="category__list">
      <MovieList :movies="movieList" :imgHost="APP_DOMAIN_CDN_IMAGE" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.category {
  display: flex;
  flex-direction: column;
  padding: 0 60px;
  min-height: 310px;

  &__tilte-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>