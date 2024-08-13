<script lang="ts" setup>
  import ProfileImage from './base/ProfileImage.vue';
  import { RouterLink } from 'vue-router';
  import AuthPopup from './popups/AuthPopup.vue';
  import { ref, inject } from 'vue';
  import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
  import type { User } from 'firebase/auth';
  const auth = getAuth();
  const user = ref(auth.currentUser);

  onAuthStateChanged(auth, (currentUser: User | null) => {
    if (currentUser) {user.value = currentUser;}
    else {user.value = null;}
  })
  const isAuthPopupActive = ref(false);
  const emitter = inject('emitter');
  const togglePopup = (state?: boolean) => {
    isAuthPopupActive.value = state ? state : !isAuthPopupActive.value;
    emitter.emit('closePopup', isAuthPopupActive.value);
  }

</script>

<template>
  <div class="user-nav">
    <template v-if="user">
      <ProfileImage :isLoggedIn="true" />
      <RouterLink @click.prevent="signOut(auth)" :to="{ force: false, hash: '' }" class="user-nav__link">Đăng xuất</RouterLink>
    </template>
    <template v-else>
      <RouterLink @click.prevent="togglePopup(true)" :to="{ force: false, hash: '' }">
        <ProfileImage />
      </RouterLink>
    </template>
  </div>
  <Teleport v-if="isAuthPopupActive" to='#popups'>
    <AuthPopup @closePopup="togglePopup(false)" />
  </Teleport>
</template>

<style lang="scss" scoped>
  .user-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    &__link {
      text-decoration: none;
      color: inherit;
      font-size: 14px;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
