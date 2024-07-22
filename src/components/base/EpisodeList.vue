<script lang="ts" setup>
import type { Episode, MovieEpisode } from '../../services/types';
import { useRoute } from 'vue-router';
const route = useRoute();
const props = defineProps<{
  episodes: MovieEpisode,
  currentEp: number,
  totalEp: number
}>();
const epData: Episode[] = props.episodes.server_data;
const epList: string[] = epData.map((ep: Episode) => ep.slug);
</script>

<template>
  <ul class="movie-episodes">
    <li class="movie-episodes__item" v-for="(index) in totalEp" :key="index">
      <RouterLink :to="{ name: route.name, params: { ...route.params, ...{ ep: epList[index - 1] } }, force: true }" class="movie-episodes__link" :class="{ 'movie-episodes__link--active': index === currentEp + 1, 'movie-episodes__link--disable': epData[index - 1] === undefined }">
        {{ index }}
      </RouterLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.movie-episodes {

  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, 30px);
  grid-auto-rows: 30px;
  gap: 10px;
  justify-content: space-between;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, 35px);
    grid-auto-rows: 35px;
    gap: 15px;
  }

  &__item {
    flex: 0 0 auto;
    width: 30px;
    height: 30px;

    @media (max-width: 768px) {
      width: 35px;
      height: 35px;
    }
  }

  &__link {
    display: block;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: 300;
    color: white;
    border-radius: 5px;
    text-decoration: none;
    border: 1px solid #fff;

    &--active {
      background-size: 100% 100%;
      background-position: 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
      background-image: radial-gradient(49% 81% at 45% 47%, #FFE20345 0%, #073AFF00 100%), radial-gradient(113% 91% at 17% -2%, #FF5A00FF 1%, #FF000000 99%), radial-gradient(142% 91% at 83% 7%, #FFDB00FF 1%, #FF000000 99%), radial-gradient(142% 91% at -6% 74%, #FF0049FF 1%, #FF000000 99%), radial-gradient(142% 91% at 111% 84%, #FF7000FF 0%, #FF0000FF 100%);
      border: none;
    }

    &--disable {
      opacity: 0.5;
      pointer-events: none;
    }
  }
}
</style>