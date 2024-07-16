<template>
  <div class="search-box" ref="searchBox">
    <form @submit.prevent="submitSearchHandler" method="get">
      <InputBox id="searchInput" type="text" v-model="searchString" placeholder="Tìm kiếm" />
      <Button type="button" class="search-box__close-button" :noBorder="true" icon="close" v-if="isMobile" @click="closeSearchBox">
      </Button>
    </form>
    <SearchResultPopup v-if="searchResult" :result="searchResult" :keyword="searchString" @closePopup="closePopupHandler" :isMobile="props.isMobile" />
  </div>
</template>
<script setup lang="ts">
import InputBox from "./InputBox.vue";
import SearchResultPopup from "./SearchResultPopup.vue";
import Button from "./Button.vue";
import { ref, watch } from "vue";
import type { Ref } from "vue";
import { debounce } from "../../utils/helper";
import { getMovieSearchResult } from "../../services/movieService";
import type { MovieSearchResultResponse } from "../../services/types";
import { useRouter } from "vue-router";
const router = useRouter();
const searchString: Ref<string> = ref("");
const searchResult: Ref<MovieSearchResultResponse | null> = ref(null);
const searchBox: Ref<HTMLElement | null> = ref(null);

const props = defineProps<{
  isMobile: boolean;
}>();

const emits = defineEmits<{
  (e: "closePopup"): void;
}>();

function closeSearchBox() {
  searchString.value = "";
  emits("closePopup");
}
watch(
  searchString,
  debounce(async () => {
    if (searchString.value !== "")
      searchResult.value = await getMovieSearchResult(searchString.value);
  }, 300)
);

function closePopupHandler(event: Event): void {
  if (searchBox.value?.contains(event.target as Node))
    searchResult.value = null;
}

function submitSearchHandler() {
  if (searchString.value !== "")
    router.push({ name: "tim-kiem", query: { k: searchString.value } });
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

  &--mobile {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;

    form {
      display: flex;
      flex-direction: row;
      border-bottom: 1px solid rgba(255, 255, 225, 0.4);
      align-items: center;
    }

    :deep(.input-box) {
      height: 70px;
      border-radius: 0;
      border: none;
      padding: 0 20px;

      &:after {
        position: absolute;
        content: "";
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 30px;
        background: #fff;
      }
    }

    :deep(.input-box:focus-within) {
      &:focus-within {
        border-top: none;
        border-right: none;
        border-left: none;
        background: none;

        .input-box__icon {
          background: #fff;
        }
      }
    }
  }
}
</style>