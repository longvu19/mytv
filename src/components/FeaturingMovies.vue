<script lang="ts" setup>
import { reactive } from 'vue';
import { getFeaturingMovies } from '../services/featuringMoviesService';
import type { FeaturingMovieResponse, MovieInfo } from '../services/types';
import MasterCarousel from './base/MasterCarousel.vue';
const options = reactive({ rewind: true, type: 'fade', autoplay: true, lazyLoad: true, speed: 1000,breakpoints: {
		768: {
			pagination: false,
		},
  } });
const movies: FeaturingMovieResponse = await getFeaturingMovies();
const movieItems: MovieInfo[] = await movies.items;
</script>

<template>
  <div class="featuring">
    <div class="featuring__banner">
      <MasterCarousel class="featuring__banner-slides" :slides="movieItems" :options="options" label="Phim nổi bật" />
    </div>
  </div>
</template>
<style lang="scss">
.featuring {
  height: 730px;
  position: relative;
  transition: opacity 1s ease;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    height: 500px;
  }

  &__banner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;

    &.fade-enter-from {
      opacity: 0;
    }

    &.fade-enter-to {
      opacity: 1;
    }
  }

  &__banner-slides {
    position: relative;
    z-index: 0;
    width: 100%;
    height: 100%;

    &:before {
      content: '';
      display: block;
      width: 100%;
      height: 75px;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      z-index: 1;
      background-blend-mode: multiply;
      mix-blend-mode: multiply;
      background-image: linear-gradient(180deg, rgb(0, 0, 0) 5%, rgba(0, 0, 0, 0.7) 55%, rgba(17, 17, 17, 0) 100%);
      pointer-events: none;
    }
  }
}
</style>