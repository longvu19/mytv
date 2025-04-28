<script lang="ts" setup>
import { VideoPlayer } from 'vue-hls-video-player';
import type { Episode } from '../../services/types';
const props = defineProps<{
  ep: Episode,
  thumb: string
}>()
</script>

<template>
  <div>
    <iframe :src="props.ep.embed" frameborder="0" class="movie-player"></iframe>
  </div>
</template>

<style lang="scss" scoped>
.movie-player
{
  width: 100%;
  height: 100vh;
  outline: none;
}
</style>