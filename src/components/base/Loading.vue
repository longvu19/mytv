<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";
import Icon from "./Icon.vue";
import type { LoadingProps } from "../../services/types";
const props = withDefaults(defineProps<LoadingProps>(), {
  size: "50px",
  type: "spinner",
});
const isShowed: Ref<boolean> = ref(true);
defineExpose({ isShowed });
</script>

<template>
  <div class="loading" v-if="isShowed">
    <div
      class="loading__icon"
      :class="{ 'loading__icon--spinning': props.type === 'spinner' }"
    >
      <Icon
        :src="props.type === 'spinner' ? 'loading' : 'square'"
        :masking="false"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  background: #111;
  opacity: 0.7;
  transition: opacity 1s ease;

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: v-bind(size);
    height: v-bind(size);
  }

  &__icon--spinning {
    animation: rotate 2s linear infinite;
    :deep(.icon) {
      animation: gradient 5s ease infinite;
    }
  }

  &.fade-leave-active {
    opacity: 1;
  }

  &.fade-leave-to {
    opacity: 0;
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>