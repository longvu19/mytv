<script lang="ts" setup>
import type { MovieListInfo } from "../../services/types";
import LazyLoadingImg from "./LazyLoadingImg.vue";
const props = defineProps<{
  result: MovieListInfo[];
  imgHost: string;
}>();

</script>

<template>
  <ul class="search-result-list">
    <li
      v-for="movie in props.result"
      :key="movie.id"
      class="search-result-list__item"
    >
      <RouterLink
        :to="{ name: 'phim', params: { slug: movie.slug } }"
        class="search-result-list__item-link"
      >
        <span class="search-result-list__item-poster">
          <LazyLoadingImg
            :imgSrc="`${imgHost}/${movie.poster_url}`"
            :showPlaceholder="
              movie.poster_url === null || movie.poster_url === ''
            "
            :imgAlt="movie.name"
          />
        </span>
        <span class="search-result-list__item-title">
          <span class="search-result-list__item-name">{{ movie.name }}</span>
          <span class="search-result-list__item-o-name">{{
            movie.origin_name
          }}</span>
        </span>
      </RouterLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.search-result-list {
  display: flex;
  flex-direction: column;
  &__item {
    display: block;
    width: 100%;
    border-bottom: 1px solid #424242;
    transition: background 0.25s;
    &:hover {
      background: #424242;
    }
  }

  &__item-link {
    display: flex;
    align-items: center;
    width: 100%;
    height: 75px;
    text-decoration: none;
    gap: 10px;
  }

  &__item-poster {
    flex-shrink: 0;
    width: 50px;
    height: 100%;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__item-title {
    display: flex;
    flex-direction: column;
    gap: 5px;
    flex-grow: 1;
  }

  &__item-name {
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    color: #fff;
  }

  &__item-o-name {
    display: block;
    font-size: 0.8rem;
    font-weight: 300;
    color: #ccc;
  }
}
</style>