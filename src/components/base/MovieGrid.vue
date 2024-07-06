<script lang="ts" setup>
import MovieItem from "./MovieItem.vue";
import type { MovieListInfo } from "../../services/types";
defineProps<{
  movies: MovieListInfo[];
  imgHost: string;
}>();
const ITEM_PER_ROW = 5;
</script>

<template>
  <div class="movie-grid">
    <MovieItem
      class="movie-grid__item"
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
      :imgHost="imgHost"
    />
  </div>
</template>

<style lang="scss" scoped>
.movie-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  &__item {
    flex: 0 0 auto;
    width: calc((100% - (15px * 4)) / v-bind(ITEM_PER_ROW));
    height: 250px;
  }
  :deep(.movie-item__info) {
    opacity: 1;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 1%,
      rgba(0, 0, 0, 0.81) 63%,
      rgba(0, 0, 0, 1) 100%
    );
  }
}
</style>