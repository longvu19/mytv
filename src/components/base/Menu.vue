<script setup lang="ts">
import { reactive } from 'vue';
import Icon from './Icon.vue';

const menus = reactive([
  {
    name: 'Trang chủ',
    path: 'home',
    icon: 'home'
  },
  {
    name: 'Phim bộ',
    path: 'phim-bo',
    icon: 'movie'
  },
  {
    name: 'Phim lẻ',
    path: 'phim-le',
    icon: 'tape'
  },
  {
    name: 'TV Shows',
    path: 'tv-shows',
    icon: 'tv'
  },
  {
    name: 'Hoạt hình',
    path: 'hoat-hinh',
    icon: 'cn'
  }
]);
</script>

<template>
  <nav class="main-menu">
    <ul class="main-menu__list">
      <li class="main-menu__item" v-for="(menu, index) in menus" :key="index">
        <RouterLink :to="{ name: menu.path, state: { category: menu.name }, force: true }" class="main-menu__link">
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