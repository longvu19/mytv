<script setup lang="ts">
  import InputBox from "../base/InputBox.vue";
  import Button from "../base/Button.vue";
  import { ref } from "vue";
  import type { Ref } from "vue";
  import { sendPasswordResetEmail , getAuth } from "firebase/auth";
  import { FirebaseError } from "firebase/app";
  import { authErrors } from "../../utils/errors";
  const userName: Ref<string> = ref("");
  const auth = getAuth();
 
  const errorMessage: Ref<string | null> = ref(null);

  const emits = defineEmits<{
    (e: 'emailSent'): void,
    (e: 'cancel'): void
  }>()

  const handleSubmit = () => {
    sendPasswordResetEmail(auth, userName.value).then(() => {
      emits('emailSent')
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
    <div class="reset-password-form__btn-group">
      <Button type="button" class="reset-password-form__submit-btn" :primary="false" size="medium" :fullWidth="true" @click="goBack">Quay lại</Button>
      <Button type="submit" class="reset-password-form__submit-btn" :primary="true" size="medium" :fullWidth="true">Gửi</Button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
  .reset-password-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 400px;

    &__error-message {
      color: rgb(255 93 93);
      font-weight: 300;
    }

    &__btn-group {
      display: flex;
      gap: 15px;
      flex-direction: row;
    }
  }
</style>