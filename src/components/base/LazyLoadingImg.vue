<script lang="ts" setup>
import Loading from "./Loading.vue";
import Image from "./Image.vue";
const props = defineProps<{
  imgSrc: string;
  showPlaceholder?: boolean;
  imgAlt: string;
  class?: string;
}>();

</script>
<template>
  <Suspense>
    <Image :imgSrc="props.imgSrc" :imgAlt="props.imgAlt" :class="props.class" />
    <template #fallback>
      <Loading size="30px" type="square" />
    </template>
  </Suspense>
</template>

<style lang="scss" scoped>
.loading {
  z-index: 1;
}
</style>