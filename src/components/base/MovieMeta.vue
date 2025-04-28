<script lang="ts" setup>
import { onMounted, Reactive, reactive } from 'vue';
import type { MovieDetail } from '../../services/types';
const props = defineProps<{
  movie: MovieDetail
}>()
const metas: Reactive<{ [key: string]: string }> = reactive({});
onMounted(() => {
  const metasObj = Object.values(props.movie.category);
  metasObj.forEach((item: any) => {
    metas[`${item.group.name}`] = item.list.map((i: any) => i.name).join(', ');
  });
})
</script>

<template>
  <div class="movie-meta">
    <template v-for="(value, key) in metas" :key="key">
      <p class="movie-meta__item">
        <span class="movie-meta__label">{{ key }}:</span>
        <span class="movie-meta__value">{{ value }}</span>
      </p>
    </template>
    <p class="movie-meta__item movie-meta__item--fullwidth">
      <span class="movie-meta__label">Nội dung phim:</span>
      <span class="movie-meta__value" v-html="movie.description"></span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.movie-meta
{
  margin: 0;
  padding: 0;
  display: flex;
  gap: 10px;
  flex-direction: column;

  &__item
  {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }

  &__item--fullwidth
  {
    flex-direction: column;
  }

  &__label
  {
    font-weight: 600;
    white-space: nowrap;
  }

  &__value
  {
    font-weight: 300;
    font-size: 0.9rem;
  }

}
</style>