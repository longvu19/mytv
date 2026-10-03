<script lang="ts" setup>
import { ref, watch, onBeforeUnmount } from 'vue';
import type Hls from 'hls.js';
import type { EpisodeSource } from '../../services/types';
const props = defineProps<{
  source: EpisodeSource,
  thumb: string
}>()
const emit = defineEmits<{
  (e: 'error'): void
}>()

const video = ref<HTMLVideoElement | null>(null);
let hls: Hls | null = null;
let loadId = 0;

const destroyHls = () => {
  hls?.destroy();
  hls = null;
}

const loadHls = async () => {
  const id = ++loadId;
  destroyHls();
  const el = video.value;
  if (!el || props.source.type !== 'hls') return;
  const { default: HlsLib } = await import('hls.js/light');
  // source changed while hls.js was loading
  if (id !== loadId) return;
  if (!HlsLib.isSupported()) {
    // No MSE (iOS Safari): fall back to native HLS
    if (el.canPlayType('application/vnd.apple.mpegurl')) {
      el.src = props.source.url;
    } else {
      emit('error');
    }
    return;
  }
  const instance = new HlsLib();
  instance.on(HlsLib.Events.ERROR, (_event, data) => {
    if (data.fatal) emit('error');
  });
  instance.loadSource(props.source.url);
  instance.attachMedia(el);
  hls = instance;
}

watch([() => props.source.url, video], loadHls, { immediate: true });
onBeforeUnmount(destroyHls);
</script>

<template>
  <div>
    <video v-if="props.source.type === 'hls'" ref="video" class="movie-player" :poster="props.thumb" controls @error="emit('error')"
      playsinline></video>
    <iframe v-else :src="props.source.url" frameborder="0" allowfullscreen class="movie-player"></iframe>
  </div>
</template>

<style lang="scss" scoped>
.movie-player
{
  display: block;
  width: 100%;
  height: 100vh;
  outline: none;
  background-color: #000;
}
</style>
