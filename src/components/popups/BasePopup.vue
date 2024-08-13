<script lang="ts" setup>
  import Button from "../base/Button.vue";
  import { inject } from 'vue';
  const emitter = inject('emitter');
  const props = withDefaults(defineProps<{
    width?: string;
    height?: string;
    title?: string
  }>(), {
    width: "300px",
    height: "auto",
  })
  const emits = defineEmits<{
    (e: 'closePopup'): void
  }>()

  const closePopup = () => {
    emitter.emit('closePopup', false);
    emits('closePopup');
  }
</script>

<template>
  <div class="popup">
    <div class="popup__header" v-if="$slots.header || props.title">
      <slot name="header">
        <h3 class="popup__title">{{ props.title }}</h3>
      </slot>
    </div>
    <div class="popup__body">
      <slot name="default"></slot>
    </div>
    <div class="popup__footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
    <Button type="button" class="popup__close-btn" :noBorder="true" size="small" icon="close" @click="closePopup" />
  </div>
</template>

<style lang="scss" scoped>
  .popup {
    width: v-bind(width);
    height: v-bind(height);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    border-radius: 15px;
    z-index: 999;
    padding: 20px 0;
    contain: layout;

    &::before {
      content: "";
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      border-radius: 15px;
      background: linear-gradient(130deg, rgba(55, 55, 56, 1) 0%, rgba(55, 55, 56, 0) 100%);
      z-index: -1;
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 15px;
      background: linear-gradient(153deg, rgba(30, 30, 33, 1) 0%, rgba(23, 23, 25, 1) 100%);
      z-index: -1;
    }

    &__header {
      padding: 15px 30px;
      text-align: center;
    }

    &__title {
      margin: 0;
      font-size: 1.2rem;
      color: #fff;
    }

    &__body {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      padding: 15px 30px;
    }

    &__footer {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 30px 30px 15px;
    }

    &__close-btn {
      position: absolute;
      top: 10px;
      right: 0px;
    }
  }
</style>
