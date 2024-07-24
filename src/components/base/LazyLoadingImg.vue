<script lang="ts" setup>
import photoPlaceholder from "../../assets/photo.svg?url";
import Loading from "./Loading.vue";
import { ref, computed, watch, onMounted } from "vue";
import type { Ref, ComputedRef } from "vue";
const props = defineProps<{
  imgSrc: string;
  showPlaceholder?: boolean;
  imgAlt: string;
  class?: string;
}>();
// const isImgLoaded: Ref<boolean | null> = ref(null);
// const src: ComputedRef<string> = computed(() => {
//   return props.showPlaceholder ? photoPlaceholder : props.imgSrc;
// });
// const src = ref('');
const imgPromise = new Promise((resolve) => {
  const imgEl: HTMLImageElement = new Image();
  imgEl.src = props.imgSrc;
  imgEl.onload = () => resolve(imgEl);
  imgEl.onerror = () => {
    imgEl.src = photoPlaceholder;
    return resolve(imgEl);
  };
});
const src: HTMLImageElement = await imgPromise as HTMLImageElement;
// const fetchImgRes : Response = await fetch(request, {
//   mode: "cors",
// });
// console.log(fetchImgRes);

// const src = await fetchImgRes.ok ? props.imgSrc : photoPlaceholder;
// console.log(src);

// onUpdated(() => {
//   debugger
// })
const imgRef: Ref<HTMLElement | null> = ref(null);
const loadingRef: Ref<InstanceType<typeof Loading> | null> = ref(null);
// function imgLoadedHandler() {
//   isImgLoaded.value = true;
// }
// function imgLoadedFailedHandler() {
//   isImgLoaded.value = false;
// }

// watch(isImgLoaded, () => {
//   if (isImgLoaded.value) {
//     if (loadingRef.value) loadingRef.value.isShowed = false;
//   } else {
//     imgRef.value?.remove();
//   }
// }, {
//   flush: "post"
// });
onMounted(() => {
  console.log(src);
  
})
</script>
<template>
  <Suspense suspensible>
    <img :src="src.src" :alt="props.imgAlt" :class="props.class" lazy="loading" ref="imgRef" />
    <template #fallback>
      <Loading size="30px" type="square" ref="loadingRef" />
    </template>
  </Suspense>
</template>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.loading {
  z-index: 1;
}
</style>