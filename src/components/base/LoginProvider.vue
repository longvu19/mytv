<script lang="ts" setup>
  import Button from "./Button.vue";
  import { computed } from "vue";
  import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
  import type { FirebaseError } from "firebase/app";

  const props = defineProps<{
    provider: 'Google' | 'Microsoft'
  }>();
  const emits = defineEmits<{
    (e: 'closePopup'): void,
    (e: 'authError', error: FirebaseError): void
  }>();

  const auth = getAuth()!;
  auth.useDeviceLanguage();
  const authProvider = props.provider === 'Google' ? new GoogleAuthProvider() : new OAuthProvider('microsoft.com');
  const signInHandler = () => {
    signInWithPopup(auth, authProvider)
      .then(() => {
        emits('closePopup');
      }).catch((error: FirebaseError) => {
        emits('authError', error)
      });
  }

  const providerIcon = computed(() => {
    return props.provider === 'Google' ? 'google' : 'microsoft'
  })
  const classObj = computed(() => {
    return {
      "login-provider": true,
      'login-provider--google': props.provider === 'Google',
      'login-provider--microsoft': props.provider === 'Microsoft'
    }
  })
</script>

<template>
  <Button type="button" class="login-provider" :class="classObj" :icon="providerIcon" :iconMasking="false" :fullWidth="true" @click="signInHandler">Đăng nhập với {{ provider }}</Button>
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

    &--google,
    &--microsoft {
      background: #fff !important;

      :deep(.button__text) {
        color: #000;
      }
    }
  }
</style>
