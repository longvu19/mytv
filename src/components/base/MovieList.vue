<template>
  <SplideTrack v-if="movies" class="movie-list">
    <template v-for="movie in movies" :key="movie.id">
      <SplideSlide class="movie-list__item">
        <MovieItem :movie="movie" :img-host="imgHost" />
      </SplideSlide>
    </template>
  </SplideTrack>
</template>
<script lang="ts" setup>
import { SplideTrack, SplideSlide } from '@splidejs/vue-splide';
import MovieItem from './MovieItem.vue';
import type { MovieListInfo } from '../../services/types';
defineProps<{
  movies: MovieListInfo[] | null;
  imgHost: string;
}>()

</script>
<style lang="scss" scoped>
.movie-list {
  margin-top: 30px;

  :deep(.splide__arrow--prev) {
    left: -2.6em;
  }

  :deep(.splide__arrow--next) {
    right: -2.6em;
  }

  &__item {
    flex: 0 0 350px;
    position: relative;
    overflow: hidden;
    height: 250px;
    @media (max-width: 425px) {
      flex: 0 0 100%;
    }
  }
}
</style>