<template>
  <span
    class="icon"
    v-if="icon && masking"
    :style="{ maskImage: `url('${icon}')`, WebkitMaskImage: `url('${icon}')` }"
    :alt="`${icon}`"
  >
  </span>
  <span class="icon icon--non-masking" v-else-if="icon">
    <img :src="icon" :width="props.size" :height="props.size" />
  </span>
</template>
<script setup lang="ts">
import { computed } from "vue";
// URLs only (a few bytes each): icons render immediately instead of one lazy chunk per icon
const iconUrls = import.meta.glob<string>("../../assets/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});
const props = withDefaults(
  defineProps<{
    src: string;
    masking?: boolean;
    size?: string;
  }>(),
  {
    masking: true,
  }
);

const icon = computed<string | null>(() => iconUrls[`../../assets/${props.src}.svg`] ?? null);
</script>
<style lang="scss" scoped>
.icon {
  display: block;
  mask-size: 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  mask-position: center;
  background: white;
  width: 100%;
  height: 100%;

  img {
    aspect-ratio: 1 / 1;
  }
  &--non-masking {
    background: none;
  }
}
</style>