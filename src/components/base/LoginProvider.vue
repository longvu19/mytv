<script lang="ts" setup>
  import Button from "./Button.vue";
  import { computed } from "vue";
  const props = defineProps<{
    provider: 'Google' | 'Facebook'
  }>()
  const providerIcon = computed(() => {
    return props.provider === 'Google' ? 'google' : 'facebook'
  })
  const classObj = computed(() => {
    return {
      "login-provider": true,
      'login-provider--google': props.provider === 'Google',
      'login-provider--facebook': props.provider === 'Facebook'
    }
  })
</script>

<template>
  <Button type="button" class="login-provider" :class="classObj" :icon="providerIcon" :iconMasking="false" :fullWidth="true">Đăng nhập với {{ provider }}</Button>
</template>

<style lang="scss" scoped>
  .login-provider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    border: none;

    :deep(.button__text) {
      font-size: 0.9rem;
      font-weight: 500;
      text-transform: none;
    }

    &--google {
      background: #fff !important;

      :deep(.button__text) {
        color: #000;
      }
    }

    &--facebook {
      background: #4460A0 !important;

      :deep(.button__text) {
        color: #fff;
      }
    }
  }
</style>
