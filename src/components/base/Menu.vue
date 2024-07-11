<script setup lang="ts">
import { reactive,ref } from "vue";
import Icon from "./Icon.vue";
import Button from "./Button.vue";
const props = defineProps<{
  active?: boolean;
}>();
const emits = defineEmits<{
  (e: "toggleMenu"): void;
}>();
import logo from "/logo-mytv.svg?url";
const closeMenu = () => {
  emits("toggleMenu");
}
const menus = reactive([
  {
    name: "Trang chủ",
    path: "home",
    icon: "home",
  },
  {
    name: "Phim bộ",
    path: "phim-bo",
    icon: "movie",
  },
  {
    name: "Phim lẻ",
    path: "phim-le",
    icon: "tape",
  },
  {
    name: "TV Shows",
    path: "tv-shows",
    icon: "tv",
  },
  {
    name: "Hoạt hình",
    path: "hoat-hinh",
    icon: "cn",
  },
]);
</script>

<template>
  <nav
    class="main-menu"
    :class="{
      'main-menu--active': props.active,
      'main-menu--fixed': $isSm.value || $isMd.value,
    }"
  >
    <div class="main-menu__logo">
      <RouterLink to="/" class="main-menu__logo-link">
        <img :src="logo" alt="MyTV" />
      </RouterLink>
    </div>
    <Button type="button" class="main-menu__close" :noBorder="true" icon="close" @click="closeMenu" />
    <ul class="main-menu__list">
      <li class="main-menu__item" v-for="(menu, index) in menus" :key="index">
        <RouterLink
          :to="{ name: menu.path, state: { category: menu.name }, force: true }"
          class="main-menu__link"
        >
          <Icon :src="menu.icon" class="main-menu__icon" />
          <span>{{ menu.name }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.main-menu {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: left 0.25s cubic-bezier(0.05, 0.64, 0.02, 1);
  position: static;

  &__logo {
    display: none;
    align-items: center;
    justify-content: center;
    height: 80px;
    width: auto;
    margin-top: 100px;
  }

  &__logo-link {
    height: 100%;
    img {
      height: 100%;
    }
  }

  &__close {
    display: none;
    position: absolute;
    top: 20px;
    right: 0px;
    z-index: 100;
  }

  &--fixed {
    flex-direction: column;
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: -100%;
    background: radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%);
    z-index: 10;
    gap: 50px;
    .main-menu__close {
      display: block;
    }
    .main-menu__logo {
      display: flex;
    }
    .main-menu__list {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 20px;
      width: 100%;
      padding: 20px;
    }
    .main-menu__item {
      height: 30px;
    }
    .main-menu__link {
      gap: 30px;
    }
  }

  &--active {
    left: 0;
  }

  &__list {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    height: 100%;
  }

  &__item {
    list-style: none;
    height: 100%;
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #fff;
    font-weight: 400;
    height: 100%;
    font-size: 0.9rem;
    gap: 10px;
    transition: color 0.25s;

    .main-menu__icon {
      height: 25px;
      width: 25px;
      transition: background 0.25s;
    }

    &:hover {
      color: #df5f2d;

      .main-menu__icon {
        background: #df5f2d;
      }
    }
  }
}
</style>