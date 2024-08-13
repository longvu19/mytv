<script lang="ts" setup>
  import { ref, inject } from 'vue';
  import Header from './Header.vue';
  import Footer from './Footer.vue';
  import PopupLayer from './PopupLayer.vue';
  const isPopupShow = ref(false);
  const togglePopupLayer = (state: boolean) => {
    isPopupShow.value = state;
  }
  const emitter = inject('emitter');

  emitter.on('closePopup', togglePopupLayer);
</script>

<template>
  <div class="main-layout">
    <Header class="main-layout__header" />
    <main class="main-layout__main">
      <slot />
    </main>
    <Footer class="main-layout__footer" />
  </div>
  <PopupLayer v-show="isPopupShow" @closePopup="togglePopupLayer(false)">
  </PopupLayer>
</template>

<style lang="scss" scoped>
  .main-layout {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
    height: 100%;

    &__main {
      flex-grow: 1;
      min-height: inherit;
    }

    &__header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 99;
    }
  }
</style>