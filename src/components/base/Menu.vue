<script setup lang="ts">
  import { reactive } from "vue";
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
  <nav class="main-menu" :class="{
    'main-menu--active': props.active,
    'main-menu--fixed': $isSm.value || $isMd.value || $isLg.value || $isXl.value,
  }">
    <div class="main-menu__content">
      <div class="main-menu__logo" v-if="$isSm.value || $isMd.value || $isLg.value || $isXl.value">
        <RouterLink to="/" class="main-menu__logo-link">
          <img :src="logo" alt="MyTV" />
        </RouterLink>
      </div>
      <Button type="button" class="main-menu__close" :noBorder="true" icon="close" @click="closeMenu" v-if="$isSm.value || $isMd.value || $isLg.value || $isXl.value" />
      <ul class="main-menu__list">
        <li class="main-menu__item" v-for="(menu, index) in menus" :key="index">
          <RouterLink :to="{ name: menu.path, state: { category: menu.name }, force: true }" class="main-menu__link">
            <div class="main-menu__icon-wrapper">
              <Icon :src="menu.icon" class="main-menu__icon" />
            </div>
            <span>{{ menu.name }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
  $className: ".main-menu";

  #{$className} {
    height: 100%;
    transition: left 0.25s cubic-bezier(0.05, 0.64, 0.02, 1);
    position: static;

    &__content {
      display: flex;
      align-items: center;
      justify-content: center;
      height: inherit;
    }

    &__logo {
      display: none;
      align-items: center;
      justify-content: center;
      height: 80px;
      width: auto;
    }

    &__logo-link {
      height: 100%;

      img {
        height: 100%;
        aspect-ratio: 217/80;
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
      position: fixed;
      width: 100%;
      height: 100dvh;
      top: 0;
      left: -100%;
      z-index: 10;
      overflow: auto;

      #{$className}__content {
        padding-top: 100px;
        flex-direction: column;
        height: fit-content;
        min-height: 100%;
        justify-content: flex-start;
        gap: 50px;
        position: relative;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 100%;
          background: radial-gradient(circle at 24.1% 68.8%, rgba(50, 50, 50, 0.7) 0%, rgba(0, 0, 0, 0.7) 99.4%);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          z-index: -1;
        }
      }


      #{$className}__close {
        display: block;
      }

      #{$className}__logo {
        display: flex;
      }

      #{$className}__list {
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 20px;
        width: 100%;
        padding: 20px;
        height: auto;
      }

      #{$className}__item {
        height: 30px;
      }

      #{$className}__link {
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

      #{$className}__icon {
        height: 25px;
        width: 25px;
        transition: background 0.25s;
      }

      #{$className}__icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25px;
        height: 100%;
      }

      &:hover {
        color: #df5f2d;

        #{$className}__icon {
          background: #df5f2d;
        }
      }
    }
  }
</style>