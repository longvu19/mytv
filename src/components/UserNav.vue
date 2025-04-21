<script lang="ts" setup>
  import ProfileImage from './base/ProfileImage.vue';
  import { RouterLink } from 'vue-router';
  import { ref, defineAsyncComponent, shallowRef } from 'vue';
  import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
  import type { User } from 'firebase/auth';
  import type { Component, ShallowRef } from 'vue';
  import EventBus from '../utils/eventBus';
  const auth = getAuth();
  const user = ref(auth.currentUser);
  const authPopup: ShallowRef<Component | null> = shallowRef(null)
  onAuthStateChanged(auth, (currentUser: User | null) => {
    if (currentUser) { user.value = currentUser; }
    else { user.value = null; }
  })
  const isAuthPopupActive = ref(false);
  const togglePopup = (state?: boolean) => {
    if (!authPopup.value) {
      authPopup.value = defineAsyncComponent(() => import('./popups/AuthPopup.vue'))
    }
    isAuthPopupActive.value = state ? state : !isAuthPopupActive.value;
    EventBus.emit('closePopup', isAuthPopupActive.value);
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
  <Teleport v-if="isAuthPopupActive && authPopup" to='#popups'>
    <component :is="authPopup" @closePopup="togglePopup(false)"></component>
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
