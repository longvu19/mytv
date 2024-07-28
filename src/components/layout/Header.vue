<script setup lang="ts">
import Menu from "../base/Menu.vue";
import SearchBox from "../base/SearchBox.vue";
import Button from "../base/Button.vue";
import { useResponsive } from "../../plugins/responsive";
import { ref, onMounted, computed, watch } from "vue";
import { lockScroll } from "../../utils/helper";
import logo from "/logo-mytv.svg?url";
const scrollTop = ref(0);
const { $isSm, $isMd, $isLg, $isXl } = useResponsive();
const isMobile = computed(() => {
  return $isSm.value || $isMd.value;
});
const headerClassObject = computed(() => {
  return {
    "header--bg-active": scrollTop.value > 0,
  };
});
const menuActive = ref(false);
const searchBoxActive = ref(false);
const toggleMenu = () => {
  menuActive.value = !menuActive.value;
  lockScroll((isMobile || $isLg || $isXl) && menuActive.value);
};
const toggleSearchBox = () => {
  searchBoxActive.value = !searchBoxActive.value;
  lockScroll((isMobile) && searchBoxActive.value);
};
const activeSearchBox = () => {
  searchBoxActive.value = true;
}
watch([isMobile, searchBoxActive], () => {
  lockScroll(isMobile.value && searchBoxActive.value)
})
onMounted(() => {
  window.addEventListener("scroll", () => {
    scrollTop.value = window.scrollY;
  });
});
</script>
<template>
  <header class="header" :class="{ ...headerClassObject, 'header--mobile': isMobile }">
    <div class="header__left" :class="{ 'header__left--mobile': isMobile }">
      <Button type="button" :noBorder="true" icon="hamburger" v-if="isMobile || $isLg || $isXl" @click="toggleMenu">
      </Button>
      <div class="header__logo">
        <RouterLink to="/" class="header__logo-link">
          <h1>MyTV</h1>
          <img :src="logo" alt="MyTV" />
        </RouterLink>
      </div>
      <Button type="button" :noBorder="true" icon="search" v-if="isMobile" @click="toggleSearchBox">
      </Button>
      <Menu :active="menuActive" @toggleMenu="toggleMenu" />
    </div>
    <div class="header__right" :class="{
    'header__right--mobile': isMobile,
    'header__right--active': searchBoxActive,
  }">
      <SearchBox :isMobile="isMobile" :class="{ 'search-box--mobile': isMobile }" @activeSearchBox="activeSearchBox" @closePopup="toggleSearchBox" />
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
  border-bottom: 1px solid rgb(147 147 147);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background: rgb(0, 0, 0, 0);
    transition: background 0.3s;
    z-index: -1;
  }

  &--mobile {
    padding: 0 10px;
  }

  &--bg-active:before {
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
      height: 100dvh;
      transition: right 0.5s cubic-bezier(0.05, 0.64, 0.02, 1);
      align-items: flex-start;
      background: rgb(0, 0, 0, 0.7);

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        background: rgb(0, 0, 0, 0.7);
        z-index: -1;
      }
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