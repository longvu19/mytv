<script lang="ts" setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import Button from './Button.vue';
import type { MovieInfo } from '../../services/types';
import LazyLoadingImg from './LazyLoadingImg.vue';
defineProps<{
  options: any;
  slides: MovieInfo[] | null;
  label: string
}>()
</script>
<template>
  <Splide class="master-carousel" :options="options" :aria-label="label">
    <template v-for="(movie) in slides" :key="movie.id">
      <SplideSlide class="master-carousel__item">
        <div class="master-carousel__image">
          <LazyLoadingImg :imgSrc="movie.thumb_url" :showPlaceholder="movie.thumb_url === '' || movie.thumb_url === null" :imgAlt="movie.name" />
        </div>
        <div class="master-carousel__info">
          <h3 class="master-carousel__title">{{ movie.name }}</h3>
          <p class="master-carousel__o-title">{{ movie.origin_name }} - {{ movie.year }}</p>
          <RouterLink :to="{ name: 'phim', params: { slug: movie.slug } }" class="main-menu__link">
          <Button type="button" class="master-carousel__button" size="large" icon="play" :primary="true">Xem ngay</Button>
          </RouterLink>
        </div>
      </SplideSlide>
    </template>
  </Splide>
</template>

<style lang="scss" scoped>
.master-carousel {
  :deep(.splide__track) {
    height: 100%;
  }

  &__info {
    position: absolute;
    bottom: 0;
    left: 2vw;
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 20px;
    color: white;
    gap: 10px;
  }

  &__title {
    font-size: 2.5rem;
  }

  &__o-title {
    font-size: 1.5rem;
  }

  &__button {
    align-self: flex-start;
    margin-top: 10px;
  }

  &__image {
    position: relative;
    height: 100%;
    z-index: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    }

    &::after {
      content: '';
      width: calc(100% + 2px);
      height: 36%;
      position: absolute;
      right: -1px;
      bottom: -1px;
      left: -1px;
      z-index: 3;
      background-image: linear-gradient(0deg, #111 0, rgba(17, 17, 17, 0) 82%);
      pointer-events: none;
    }

    &::before {
      content: '';
      width: calc(100% + 2px);
      height: 50%;
      position: absolute;
      right: -1px;
      bottom: -1px;
      left: -1px;
      z-index: 2;
      background-image: linear-gradient(0deg, #111 0, rgba(17, 17, 17, 0) 100%);
      pointer-events: none;
    }
  }

  :deep(.splide__pagination) {
    position: absolute;
    right: 150px;
    bottom: 20px;
    left: auto;
    transform: translateY(-50%);
  }

  :deep(.splide__arrows) {
    position: absolute;
    right: 50px;
    bottom: 20px;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-self: center;
  }

  :deep(.splide__arrow) {
    position: static;
    transform: none;
  }
}
</style>