<script lang="ts" setup>
  // import photoPlaceholder from "../../assets/photo.svg?url";
  import { ref } from "vue";
  import Loading from './Loading.vue';
  const props = withDefaults(defineProps<{
    imgSrc: string;
    imgAlt: string;
    class?: string|object;
    size?: string
  }>(), {
    size: "100%",
  });
  const imageLoaded = ref(false);
  // const imgPromise = new Promise((resolve) => {
  //   const imgEl: HTMLImageElement = new Image();
  //   imgEl.src = props.imgSrc;
  //   imgEl.alt = props.imgAlt;
  //   imgEl.onload = () => resolve(imgEl);
  //   imgEl.onerror = () => {
  //     imgEl.src = photoPlaceholder;
  //     return resolve(imgEl);
  //   };
  // });
  // const imgEl = await imgPromise as HTMLImageElement;
  // const picture = ref<HTMLElement | null>()
  // watch(picture, () => {
  //   if (picture.value) {
  //     picture.value.appendChild(imgEl);
  //   }
  // })
</script>
<template>
  <!-- <figure ref="picture">
  </figure> -->
  <img :src="props.imgSrc" :alt="props.imgAlt" @load="imageLoaded = true" :class="props.class" loading="lazy"/>
  <Loading v-if="!imageLoaded" type="square" size="30px" />
</template>

<style lang="scss" scoped>
  img{
    width: v-bind(size);
    height: v-bind(size);
    object-fit: cover;
  }
</style>