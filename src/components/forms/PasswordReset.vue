<template>
  <form action="" type="submit" @submit.prevent="handleSubmit" method="post" class="reset-password-form">
    <InputBox id="passwordInput" :disabled="successMessage !== null" :type="passwordShowType" v-model.lazy="password"
      placeholder="Mật khẩu" iconSize="25px" :icon="passwordShowIcon"
      :iconClickHandler="() => toggleShowPassword('password')" />
    <InputBox id="confirmPasswordInput" :disabled="successMessage !== null" :type="confirmPasswordShowType"
      v-model.lazy="confirmPassword" placeholder="Xác nhận mật khẩu" iconSize="25px" :icon="confirmPasswordShowIcon"
      :iconClickHandler="() => toggleShowPassword('confirmPassword')" />
    <p class="reset-password-form__error-message" v-if="errorMessage">{{ errorMessage }}</p>
    <p class="reset-password-form__success-message" v-if="successMessage">{{ successMessage }}</p>
    <RouterLink v-if="successMessage" class="reset-password-form__link" :to="{ name: 'home' }">Quay về trang chủ.
    </RouterLink>
    <Button type="submit" class="reset-password-form__submit-btn" v-else :primary="true" size="medium"
      :fullWidth="true">Đặt
      lại mật
      khẩu</Button>
  </form>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import InputBox from "../base/InputBox.vue";
import Button from "../base/Button.vue";
import { ref, computed, onMounted } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import { verifyPasswordResetCode, confirmPasswordReset, getAuth } from "firebase/auth";
import { FirebaseError } from 'firebase/app';

const password: Ref<string> = ref("");
const confirmPassword: Ref<string> = ref("");
const isPasswordVisible: Ref<boolean> = ref(false);
const isConfirmPasswordVisible: Ref<boolean> = ref(false);
const isFbError: Ref<boolean> = ref(false);
const submitClicked: Ref<boolean> = ref(false);
const successMessage: Ref<string | null> = ref(null);
const errorMessage: ComputedRef<string | null> = computed(() => {
  if ((password.value === '' || confirmPassword.value === '') && submitClicked.value) {
    submitClicked.value = false;
    return 'Mật khẩu không được để trống.';
  }
  if (password.value !== confirmPassword.value) {
    return password.value === confirmPassword.value ? null : "Xác nhận mật khẩu không đúng.";
  }
  if (isFbError.value) {
    isFbError.value = false;
    return "Có lỗi xảy ra trong quá trình đặt lại mật khẩu.";
  }
  return null;
})
const actionCode: Ref<string | null> = ref(null);
// const auth = getAuth();
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
const toggleShowPassword = (type: string) => {
  if (type === 'password') {
    isPasswordVisible.value = !isPasswordVisible.value;
  } else {
    isConfirmPasswordVisible.value = !isConfirmPasswordVisible.value;
  }
};
const handleSubmit = () => {
  submitClicked.value = true;
  verifyPasswordResetCode(getAuth(), <string>actionCode.value).then(() => {
    confirmPasswordReset(getAuth(), <string>actionCode.value, password.value).then(() => {
      successMessage.value = "Mật khẩu đã được đặt lại thành công. Vui lòng đăng nhập lại.";
    }).catch((error: FirebaseError) => {
      isFbError.value = true;
      console.log(error);
    })
  }).catch((error: FirebaseError) => {
    isFbError.value = true;
    console.log(error);
  })
}
onMounted(() => {
  const params = new URLSearchParams(document.location.search);
  actionCode.value = params.get('oobCode');
  if (!actionCode.value) {
    window.location.href = '/';
  }
})
</script>

<style scoped lang="scss">
.reset-password-form
{
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;

  &__error-message
  {
    color: rgb(255 93 93);
    font-weight: 300;
  }

  &__success-message
  {
    color: rgb(0, 139, 53);
    font-weight: 300;
  }

  &__link
  {
    text-decoration: none;
    color: white;
    font-weight: 500;
  }
}
</style>