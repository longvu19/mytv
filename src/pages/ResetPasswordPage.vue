<script setup lang="ts">
import Layout from "../components/layout/Layout.vue";
import Loading from "../components/base/Loading.vue";
import Title from "../components/base/Title.vue";
import PasswordReset from "../components/forms/PasswordReset.vue";
</script>

<template>
  <Layout :only-logo="true">
    <Transition name="fade">
      <Suspense>
        <template #default>
          <div class="reset-password-page">
            <Title class="reset-password-page__title">Đặt lại mật khẩu mới</Title>
            <PasswordReset></PasswordReset>
          </div>
        </template>
        <template #fallback>
          <Loading />
        </template>
      </Suspense>
    </Transition>
  </Layout>
</template>

<style scoped lang="scss">
.reset-password-page
{
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
  align-self: center;
  margin:0 auto;
  justify-self: center;


  &__title
  {
    text-align: center;
  }
}
</style>