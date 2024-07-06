<script lang="ts" setup>
import photoPlaceholder from "../../assets/photo.svg?url";
import Loading from "./Loading.vue";
import { ref, computed, watch } from "vue";
import type { Ref, ComputedRef } from "vue";
const props = defineProps<{
  imgSrc: string;
  showPlaceholder: boolean;
  imgAlt: string;
}>();
const isImgLoaded: Ref<boolean | null> = ref(null);
const src: ComputedRef<string> = computed(() => {
  return props.showPlaceholder ? photoPlaceholder : props.imgSrc;
});
const imgRef: Ref<HTMLElement | null> = ref(null);
const loadingRef: Ref<InstanceType<typeof Loading> | null> = ref(null);
function imgLoadedHandler() {
  isImgLoaded.value = true;
}
function imgLoadedFailedHandler() {
  isImgLoaded.value = false;
}

watch(isImgLoaded, () => {
  if (isImgLoaded.value) {
    if (loadingRef.value) loadingRef.value.isShowed = false;
  } else {
    imgRef.value?.remove();
  }
});
</script>
<template>
  <img
    v-show="isImgLoaded"
    :src="src"
    :alt="props.imgAlt"
    @load="imgLoadedHandler"
    @error="imgLoadedFailedHandler"
    lazy="loading"
    ref="imgRef"
  />
  <Loading v-show="!isImgLoaded" size="30px" type="square" ref="loadingRef" />
</template>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>