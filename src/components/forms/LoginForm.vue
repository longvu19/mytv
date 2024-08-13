<script setup lang="ts">
  import InputBox from "../base/InputBox.vue";
  import Button from "../base/Button.vue";
  import { ref, computed } from "vue";
  import type { Ref } from "vue";
  import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
  import { FirebaseError } from "firebase/app";
  import { authErrors } from "../../utils/errors";
  const userName: Ref<string> = ref("");
  const password: Ref<string> = ref("");
  const isPasswordVisible: Ref<boolean> = ref(false);
  const auth = getAuth();
  function toggleShowPassword() {
    isPasswordVisible.value = !isPasswordVisible.value;
  };
  const errorMessage: Ref<string | null> = ref(null);

  const emits = defineEmits<{
    (e: 'closePopup'): void
  }>()

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, userName.value, password.value).then(() => {
      emits('closePopup')
    })
      .catch((error: FirebaseError) => {
        errorMessage.value = authErrors.get(error.code.replace("auth/", "")) as string;
      });
  };

  const passwordShowIcon = computed(() => {
    return isPasswordVisible.value ? "eye-show" : "eye-hide";
  })
  const passwordShowType = computed(() => {
    return isPasswordVisible.value ? "text" : "password";
  })
</script>

<template>
  <form action="" type="submit" @submit.prevent="handleSubmit" method="post" class="login-form">
    <InputBox id="userNameInput" type="email" v-model="userName" placeholder="Email" />
    <InputBox id="passwordInput" :type="passwordShowType" v-model="password" placeholder="Mật khẩu" iconSize="25px" :icon="passwordShowIcon" :iconClickHandler="toggleShowPassword" />
    <p class="login-form__error-message" v-if="errorMessage">{{ errorMessage }}</p>
    <Button type="submit" class="login-form__submit-btn" :primary="true" size="medium" :fullWidth="true">Đăng nhập</Button>
  </form>
</template>

<style lang="scss" scoped>
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 400px;

    &__error-message {
      color: rgb(255 93 93);
      font-weight: 300;
    }
  }
</style>