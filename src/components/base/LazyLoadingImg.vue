<script lang="ts" setup>
import Loading from "./Loading.vue";
import Image from "./Image.vue";
const props = withDefaults(defineProps<{
  imgSrc: string;
  showPlaceholder?: boolean;
  imgAlt: string;
  class?: string;
  size?: string;
}>(), {
  size: "100%",
});

</script>
<template>
  <Suspense>
    <Image :imgSrc="props.imgSrc" :imgAlt="props.imgAlt" :class="props.class" :size="props.size" />
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