<script setup lang="ts">
import InputBox from "../base/InputBox.vue";
import Button from "../base/Button.vue";
import { ref, computed } from "vue";
import type { ComputedRef, Ref } from "vue";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { authErrors } from "../../utils/errors";
const userName: Ref<string> = ref("");
const auth = getAuth();

const errorMessage: Ref<string | null> = ref(null);
const successMessage: Ref<string | null> = ref(null);
const timer: Ref<string | null> = ref(null);
const emailSent: Ref<boolean> = ref(false);
const emits = defineEmits<{
  (e: 'emailSent'): void,
  (e: 'cancel'): void
}>()

const submitBtnContent: ComputedRef<string | null> = computed(() => {
  return emailSent.value ? timer.value : 'Gửi';
});

const setCountdown = (t: number) => {
  let intervalId = setInterval(() => {
    let mins = Math.floor(t / 60);
    let secs = t % 60;
    timer.value = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    emailSent.value = true;
    t--;
    if (t === 0) {
      clearInterval(intervalId);
      successMessage.value = null;
      emailSent.value = false;
    }
  }, 1000);
}

const handleSubmit = () => {
  setCountdown(30);
  sendPasswordResetEmail(auth, userName.value).then(() => {
    emits('emailSent');
    successMessage.value = 'The link to reset password has been sent to your email.'
  })
    .catch((error: FirebaseError) => {
      errorMessage.value = authErrors.get(error.code.replace("auth/", "")) as string;
    });
};
const goBack = () => {
  emits('cancel')
}
</script>

<template>
  <form action="" type="submit" @submit.prevent="handleSubmit" method="post" class="reset-password-form">
    <InputBox id="userNameInput" type="email" v-model="userName" placeholder="Email" />
    <p class="reset-password-form__error-message" v-if="errorMessage">{{ errorMessage }}</p>
    <p class="reset-password-form__success-message" v-if="successMessage">{{ successMessage }}</p>
    <div class="reset-password-form__btn-group">
      <Button type="button" class="reset-password-form__submit-btn" :primary="false" size="medium" :fullWidth="true"
        @click="goBack">Quay lại</Button>
      <Button type="submit" :disabled="userName === '' || emailSent" class="reset-password-form__submit-btn"
        :primary="true" size="medium" :fullWidth="true">{{ submitBtnContent }}</Button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
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

  &__btn-group
  {
    display: flex;
    gap: 15px;
    flex-direction: row;
  }
}
</style>