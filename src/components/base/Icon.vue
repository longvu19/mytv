<template>
  <span
    class="icon"
    v-if="icon && masking"
    :style="{ maskImage: `url('${icon}')`, WebkitMaskImage: `url('${icon}')` }"
    :alt="`${icon}`"
  >
  </span>
  <span class="icon icon--non-masking" v-else-if="icon">
    <img :src="icon" alt="" />
  </span>
</template>
<script setup lang="ts">
import { ref, watchEffect } from "vue";
import type { Ref } from "vue";
const props = withDefaults(
  defineProps<{
    src: string;
    masking?: boolean;
  }>(),
  {
    masking: true,
  }
);

const icon: Ref<string | null> = ref(null);
const rendered = ref("false");

watchEffect(async () => {
  try {
    const svgModule = await import(`../../assets/${props.src}.svg?url`);
    icon.value = (await svgModule.default) || svgModule;
    rendered.value = "true";
  } catch (error) {
    console.log(error);
  }
});
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

  &--non-masking {
    background: none;
  }
}
</style>