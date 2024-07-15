<script setup lang="ts">
import Menu from "../base/Menu.vue";
import SearchBox from "../base/SearchBox.vue";
import Button from "../base/Button.vue";
import { useResponsive } from "../../plugins/responsive";
import { ref, onMounted, computed, reactive, watch } from "vue";
import logo from "/logo-mytv.svg?url";
const scrollTop = ref(0);
const responsive = useResponsive();
// const isMobile = computed(() => {
//   const isSm = responsive.isSm;
//   const isMd = responsive.isMd;
  
//   return isSm || isMd;
// });
const isMobile = ref(responsive.isSm || responsive.isMd)
watch(isMobile, () => {
  console.log(isMobile);
  
})

const classObject = computed(() => {
  return {
    "header--bg-active": scrollTop.value > 0,
    'header--mobile': isMobile
  };
});
const menuActive = ref(false);
const toggleMenuMenu = () => {
  menuActive.value = !menuActive.value;
}
onMounted(() => {
  window.addEventListener("scroll", () => {
    scrollTop.value = window.scrollY;
  });
});
</script>
<template>
  <header
    class="header"
    :class="classObject"
  >
    <div
      class="header__left"
      :class="{ 'header__left--mobile': isMobile}"
    >
      <Button
        type="button"
        :noBorder="true"
        icon="hamburger"
        v-if="isMobile"
        @click="toggleMenuMenu"
      >
      </Button>
      <div class="header__logo">
        <RouterLink to="/" class="header__logo-link">
          <h1>MyTV</h1>
          <img :src="logo" alt="MyTV" />
        </RouterLink>
      </div>
      <Button
        type="button"
        :noBorder="true"
        icon="search"
        v-if="isMobile"
      >
      </Button>
      <Menu :active="menuActive" @toggleMenu="toggleMenuMenu"/>
    </div>
    <div class="header__right" :class="{ 'header__right--mobile': isMobile}">
      <SearchBox />
    </div>
  </header>
</template>
<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  padding: 0 60px;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  background: rgb(0, 0, 0, 0);
  transition: background 0.3s;
  border-bottom: 1px solid rgb(147 147 147);
  backdrop-filter: blur(10px);

  &--mobile {
    padding: 0 10px;
  }

  &--bg-active {
    background: rgb(0, 0, 0, 0.7);
  }

  &__left,
  &__right {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    height: 100%;
    flex-shrink: 0;
  }

  &__left {
    &--mobile {
      width: 100%;
      justify-content: space-between;
    }
  }

  &__right {
    &--mobile {
      position: fixed;
      top: 0;
      right: -100%;
      width: 100%;
      height: 100%;
      transition: right 0.5s cubic-bezier(0.05, 0.64, 0.02, 1);
    }
    &--active {
      right: 0;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;

    &-link {
      text-decoration: none;
      height: 100%;
      flex-shrink: 0;
      img {
        height: 100%;
        width: auto;
      }

      h1 {
        margin: 0;
        color: white;
        visibility: hidden;
        font-size: 0;
      }
    }
  }
}
</style>