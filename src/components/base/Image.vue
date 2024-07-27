<script lang="ts" setup>
import photoPlaceholder from "../../assets/photo.svg?url";
const props = defineProps<{
  imgSrc: string;
  imgAlt: string;
}>();
const imgPromise = new Promise((resolve) => {
  const imgEl: HTMLImageElement = new Image();
  imgEl.src = props.imgSrc;
  imgEl.onload = () => resolve(imgEl);
  imgEl.onerror = () => {
    imgEl.src = photoPlaceholder;
    return resolve(imgEl);
  };
});
const imgEl = await imgPromise as HTMLImageElement;
</script>
<template>
  <img :src="imgEl.src" :alt="props.imgAlt">
</template>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>