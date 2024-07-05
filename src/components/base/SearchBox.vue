<template>
  <div class="search-box">
    <form action="" method="get">
      <InputBox id="searchInput" type="text" v-model="searchString" placeholder="Tìm kiếm" />
      {{ searchString }}
    </form>
  </div>
</template>
<script setup lang="ts">
import InputBox from './InputBox.vue';
import {ref} from 'vue';
import type { Ref } from 'vue';

const searchString : Ref<string> = ref('');
</script>

<style lang="scss" scoped>

.search-box {
  :deep(#searchInput) {
    &::placeholder {
      color: rgb(255, 255, 255);
    }
  }
  :deep(.input-box:not(:focus-within)) {
    border-color: white;
  }

  :deep(.input-box__icon) {
    background: #fff;
  }
}
</style>