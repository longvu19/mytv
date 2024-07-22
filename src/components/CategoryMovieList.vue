<script lang="ts" setup>
import Title from './base/Title.vue';
import MovieList from './base/MovieList.vue';
import Button from './base/Button.vue';
import '@splidejs/vue-splide/css';
import { Splide } from '@splidejs/vue-splide';
import type { CategoryMoviesResponse, MovieListInfo } from '../services/types';
import { getCategoryMovies } from '../services/categoryMoviesService';
import { reactive } from 'vue';
const props = defineProps<{
  title: string;
  category: string;
}>()

const categoryMoiveList: CategoryMoviesResponse = await getCategoryMovies(props.category);
const movieList: MovieListInfo[] = await categoryMoiveList.data.items;
const APP_DOMAIN_CDN_IMAGE = await categoryMoiveList.data.APP_DOMAIN_CDN_IMAGE;

const options = reactive({ type: 'slide', drag: 'free', wheel: false, lazyLoad: true, autoWidth: false, speed: 300, gap: "20px", pagination: false, waitForTransition: true, omitEnd: true, focus: 0});
</script>

<template>
  <Splide class="category" :options="options" :has-track="false">
    <div class="category__tilte-container">
      <Title class="category__title">{{ title }}</Title>
      <RouterLink :to="{ name: category, state: { category: title }, force: true }" class="main-menu__link">
        <Button type="button" size="small">Xem thêm</Button>
      </RouterLink>
      <div class="splide__arrows"></div>
    </div>
    <div class="category__list">
      <MovieList :movies="movieList" :imgHost="APP_DOMAIN_CDN_IMAGE" />
    </div>
  </Splide>
</template>

<style lang="scss" scoped>
.category {
  display: flex;
  flex-direction: column;
  padding: 0 60px;
  min-height: 310px;
  @media (max-width: 1024px){
    padding: 0 40px;
  }
  @media (max-width: 768px){
    padding: 0 20px;
  }

  &__tilte-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
  }
  .splide__arrows {
    display: flex;
    gap: 10px;
    margin-left: auto;
    &>* {
      position: static;
      transform: none;
    }
  }
}
</style>