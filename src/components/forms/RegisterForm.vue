<script setup lang="ts">
  import InputBox from "../base/InputBox.vue";
  import Button from "../base/Button.vue";
  import { ref, computed, watch } from "vue";
  import type { Ref } from "vue";
  import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
  import type { FirebaseError } from "firebase/app";
  import { authErrors } from "../../utils/errors";

  const userName: Ref<string> = ref("");
  const password: Ref<string> = ref("");
  const confirmPassword: Ref<string> = ref("");
  const isPasswordVisible: Ref<boolean> = ref(false);
  const isConfirmPasswordVisible: Ref<boolean> = ref(false);
  const auth = getAuth()!;
  const errorMessage: Ref<string | null> = ref(null);
  const isPasswordConfirmed: Ref<boolean> = ref(false);
  const emits = defineEmits<{
    (e: 'closePopup'): void;
  }>()

  const passwordShowIcon = computed(() => {
    return isPasswordVisible.value ? "eye-show" : "eye-hide";
  })
  const passwordShowType = computed(() => {
    return isPasswordVisible.value ? "text" : "password";
  })
  const confirmPasswordShowIcon = computed(() => {
    return isConfirmPasswordVisible.value ? "eye-show" : "eye-hide";
  })
  const confirmPasswordShowType = computed(() => {
    return isConfirmPasswordVisible.value ? "text" : "password";
  })
  const handleSubmit = () => {
    if (isPasswordConfirmed.value) {
      createUserWithEmailAndPassword(auth, userName.value, password.value).then(() => {
        emits('closePopup')
      })
        .catch((error: FirebaseError) => {
          errorMessage.value = authErrors.get(error.code.replace("auth/", "")) as string;
        });
    }
  };
  const toggleShowPassword = (type: string) => {
    if (type === 'password') {
      isPasswordVisible.value = !isPasswordVisible.value;
    } else {
      isConfirmPasswordVisible.value = !isConfirmPasswordVisible.value;
    }
  };
  watch([password, confirmPassword], () => {
    if (password.value !== '' && confirmPassword.value !== '') {
      isPasswordConfirmed.value = password.value === confirmPassword.value;
      errorMessage.value = !isPasswordConfirmed.value ? "Xác nhận mật khẩu không đúng." : null;
    }
  })
</script>

<template>
  <form action="" type="submit" @submit.prevent="handleSubmit" method="post" class="register-form">
    <InputBox id="userNameInput" type="email" v-model="userName" placeholder="Email" />
    <InputBox id="passwordInput" :type="passwordShowType" v-model.lazy="password" placeholder="Mật khẩu" iconSize="25px" :icon="passwordShowIcon" :iconClickHandler="() => toggleShowPassword('password')" />
    <InputBox id="confirmPasswordInput" :type="confirmPasswordShowType" v-model.lazy="confirmPassword" placeholder="Mật khẩu" iconSize="25px" :icon="confirmPasswordShowIcon" :iconClickHandler="() => toggleShowPassword('confirmPassword')" />
    <p class="register-form__error-message" v-if="errorMessage">{{ errorMessage }}</p>
    <Button type="submit" class="register-form__submit-btn" :primary="true" size="medium" :fullWidth="true">Đăng ký</Button>
  </form>
</template>

<style lang="scss" scoped>
  .register-form {
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