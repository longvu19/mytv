<script lang="ts" setup>
  import { computed, ref, shallowRef } from "vue";
  import type { Component, ShallowRef } from "vue";
  import LoginForm from "../forms/LoginForm.vue";
  import RegisterForm from "../forms/RegisterForm.vue";
  import BasePopup from "./BasePopup.vue";
  import Button from "../base/Button.vue";
  import LoginProvider from "../base/LoginProvider.vue";
  import { authErrors } from "../../utils/errors";
  import type { FirebaseError } from "firebase/app";

  const currentComponent: ShallowRef<Component> = shallowRef(LoginForm);
  const errorMessage = ref<string | null>(null);
  const hasAccount = ref(true);
  const toggleHasAccount = (state?: boolean) => {
    hasAccount.value = state ? state : !hasAccount.value;
  }
  const popupTitle = computed(() => hasAccount.value ? "Đăng nhập" : "Đăng ký");
  const activeComponent = (component: Component) => {
    currentComponent.value = component;
  }
  const signInHandler = () => {
    activeComponent(LoginForm);
    toggleHasAccount(true);
  }
  const signUpHandler = () => {
    activeComponent(RegisterForm);
    toggleHasAccount(false);
  }

  const showAuthError = (error: FirebaseError) => {
    errorMessage.value = authErrors.get(error.code.replace("auth/", "")) as string;
  }

  const emits = defineEmits<{
    (e: 'closePopup'): void
  }>()

</script>

<template>
  <BasePopup width="500px" :title="popupTitle" class="auth-popup" @closePopup="emits('closePopup')">
    <KeepAlive>
      <component :is="currentComponent" @closePopup="emits('closePopup')"></component>
    </KeepAlive>
    <Button class="auth-popup__forget-password-link" type="button" size="small" :primary="false" :noBorder="true">Quên mật khẩu?</Button>
    <div class="auth-popup__separator">hoặc</div>
    <div class="auth-popup__providers">
      <LoginProvider provider="Google" @closePopup="emits('closePopup')" @authError="showAuthError" />
      <LoginProvider provider="Microsoft" @closePopup="emits('closePopup')" @authError="showAuthError" />
    </div>
    <p class="auth-popup__error-message" v-if="errorMessage">{{ errorMessage }}</p>
    <template v-slot:footer>
      <p v-if="hasAccount">Chưa có tài khoản? <Button class="auth-popup__footer-link" type="link" :noBorder="true" @click="signUpHandler">Đăng ký ngay</Button></p>
      <p v-else>Đã có tài khoản? <Button class="auth-popup__footer-link" type="link" :noBorder="true" @click="signInHandler">Đăng nhập ngay</Button></p>
    </template>
  </BasePopup>
</template>

<style lang="scss" scoped>
  .auth-popup {
    display: flex;
    flex-direction: column;

    &__error-message {
      color: rgb(255, 93, 93);
      font-weight: 300;
    }

    :deep(.popup__body) {
      align-items: center;
      gap: 10px;
    }

    :deep(.popup__footer) {
      text-align: center
    }

    &__forget-password-link {
      text-transform: none;
    }

    &__separator {
      text-align: center;
      font-size: 0.9rem;
      display: flex;
      gap: 15px;
      width: 100%;
      max-width: 400px;
      align-items: center;
      justify-content: center;

      &::before,
      &::after {
        content: '';
        flex-grow: 1;
        height: 1px;
        background: rgba(255, 255, 255, 0.1);
        display: block;
      }
    }

    &__providers {
      display: flex;
      gap: 15px;
      flex-direction: column;
      width: 100%;
      max-width: 400px;
      padding: 15px 0;
    }
  }
</style>
