<script lang="ts" setup>
import { computed } from "vue";
import MovieItem from "./MovieItem.vue";
import type { MovieListInfo } from "../../services/types";
import { useResponsive } from "../../plugins/responsive";
const { $isSm, $isMd, $isLg } = useResponsive();
defineProps<{
  movies: MovieListInfo[];
  imgHost: string;
}>();
const ITEM_PER_ROW = computed(() => {
  return [$isSm.value, $isMd.value, $isLg.value].indexOf(true) + 1 || 5;
});
</script>

<template>
  <div class="movie-grid">
    <MovieItem class="movie-grid__item" v-for="movie in movies" :key="movie.id" :movie="movie" :imgHost="imgHost" />
  </div>
</template>

<style lang="scss" scoped>
.movie-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  &__item {
    flex: 0 0 auto;
    width: calc((100% - (15px * (v-bind(ITEM_PER_ROW) - 1))) / v-bind(ITEM_PER_ROW));
    height: 250px;
  }

  :deep(.movie-item__info) {
    opacity: 1;
    background: linear-gradient(to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 1%,
        rgba(0, 0, 0, 0.81) 63%,
        rgba(0, 0, 0, 1) 100%);
  }
}
</style>