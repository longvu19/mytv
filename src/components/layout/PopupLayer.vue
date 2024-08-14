<script lang="ts" setup>
  import { ref, onUpdated } from "vue";
  import type { Ref } from "vue";
  import { lockScroll } from "../../utils/helper";
  const popupsRef: Ref<HTMLElement | null> = ref(null);

  onUpdated(() => {
    lockScroll(popupsRef.value?.style.display !== 'none');
  })

  const emits = defineEmits<{
    (e: 'closePopup', state: boolean): void
  }>();
  const hideOverlay = (state: boolean) => {
    emits('closePopup', state);
  }
</script>

<template>
  <div ref="popupsRef" class="overlay">
    <div id="popups" class="overlay__content" @click.self="hideOverlay(true)">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;


    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }

    &__content {
      width: inherit;
      height: inherit;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: clamp(10px, 5vh, 50px);
      overflow: auto;
      contain: strict;

      :deep(.popup) {
        margin: auto;
      }
    }
  }
</style>
