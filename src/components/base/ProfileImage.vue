<script lang="ts" setup>
  import { computed } from 'vue';
  import type { ComputedRef } from 'vue';
  import userImage from '../../assets/user.svg?url';
  import LazyLoadingImg from './LazyLoadingImg.vue';
  const props = withDefaults(defineProps<{
    src?: string;
    size?: string;
    isLoggedIn?: boolean;
  }>(), {
    src: userImage,
    size: '40px',
    isLoggedIn: false
  })

  const imageSize: ComputedRef<string> = computed(() => {
    return props.src !== userImage ? '100%' : '70%';
  })
</script>

<template>
  <div class="profile-image" :class="{ 'profile-image--logged-in': props.isLoggedIn }">
    <div class="profile-image__img-wrapper">
      <LazyLoadingImg :imgSrc="props.src" :showPlaceholder="false" imgAlt="User" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .profile-image {
    width: v-bind(size);
    height: v-bind(size);
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    border: 2px solid transparent;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    &:before {
      content: "";
      position: absolute;
      inset: -1px;
      border-radius: 50%;
      border: 2px solid transparent;
      background: white border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
      z-index: 1;
    }

    &--logged-in {
      &:before {
        background: linear-gradient(90deg, rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%) border-box;
      }
    }

    &__img-wrapper {
      width: v-bind(imageSize);
      height: v-bind(imageSize);
    }
  }
</style>
