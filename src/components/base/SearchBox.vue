<template>
  <div class="search-box">
    <form @submit.prevent="submitSearchHandler" method="get">
      <InputBox
        id="searchInput"
        type="text"
        v-model="searchString"
        placeholder="Tìm kiếm"
        @blur="inputBlurHandler"
      />
    </form>
    <SearchResultPopup v-if="searchResult" :result="searchResult" :keyword="searchString" />
  </div>
</template>
<script setup lang="ts">
import InputBox from "./InputBox.vue";
import SearchResultPopup from "./SearchResultPopup.vue";
import { ref, watch } from "vue";
import type { Ref } from "vue";
import { debounce } from "../../utils/helper";
import { getMovieSearchResult } from "../../services/movieService";
import type { MovieSearchResultResponse } from "../../services/types";
import {useRouter} from "vue-router";
const router = useRouter();
const searchString: Ref<string> = ref("");
const searchResult: Ref<MovieSearchResultResponse | null> = ref(null);
watch(
  searchString,
  debounce(async () => {
    if(searchString.value !== "") searchResult.value = await getMovieSearchResult(searchString.value);
  }, 300)
);

function inputBlurHandler() {
  searchResult.value = null;
}

function submitSearchHandler() {
  if(searchString.value !== "") router.push({ name: 'tim-kiem', query: { k: searchString.value } });
}
</script>

<style lang="scss" scoped>
.search-box {
  position: relative;
  width: 300px;
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