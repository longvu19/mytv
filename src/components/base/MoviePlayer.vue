<script lang="ts" setup>
import { VideoPlayer } from 'vue-hls-video-player';
const props= defineProps<{
  link: string,
  thumb: string
}>()
</script>

<template>
  <div>
    <VideoPlayer type="default" :previewImageLink="props.thumb" :link="props.link" :progress="30" :isMuted="false" :isControls="true" class="movie-player" />
  </div>
</template>

<style lang="scss" scoped>
.movie-player {
  width: 100%;
  height: 100vh;
  outline:none;
}
</style>