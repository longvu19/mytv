<template>
  <div class="search-box" ref="searchBox">
    <form @submit.prevent="submitSearchHandler" method="get">
      <InputBox id="searchInput" type="text" v-model="searchString" :bgTransparent="true" @focus="activeSearchBox" placeholder="Tìm kiếm" icon="search" :iconClickHandler="submitSearchHandler" />
      <Button type="button" class="search-box__close-button" :noBorder="true" icon="close" v-if="isMobile" @click="closeSearchBox">
      </Button>
    </form>
    <SearchResultPopup v-if="keyword" :keyword="keyword" :stopRequest="stopRequest" @closePopup="closePopupHandler" :isMobile="props.isMobile" />
  </div>
</template>
<script setup lang="ts">
  import InputBox from "./InputBox.vue";
  import SearchResultPopup from "./SearchResultPopup.vue";
  import Button from "./Button.vue";
  import { ref, watch } from "vue";
  import type { Ref } from "vue";
  import { debounce } from "../../utils/helper";
  import { useRouter } from "vue-router";
  const router = useRouter();
  const searchString: Ref<string> = ref("");
  const keyword: Ref<string> = ref("");
  const searchBox: Ref<HTMLElement | null> = ref(null);
  const stopRequest: Ref<boolean> = ref(false);
  const props = defineProps<{
    isMobile: boolean;
  }>();

  const emits = defineEmits<{
    (e: "closePopup"): void;
    (e: "toggleSearchBox", state: boolean): void;
  }>();

  function closeSearchBox() {
    searchString.value = "";
    emits("closePopup");
  }
  watch(
    searchString,
    debounce(() => {
      stopRequest.value = !stopRequest.value;
      keyword.value = searchString.value;
    }, 500, true)
  );

  function closePopupHandler(event: Event): void {
    if (!searchBox.value?.contains(event.target as Node)) {
      keyword.value = '';
      emits("toggleSearchBox", false);
    }
  }

  function activeSearchBox(): void {
    emits("toggleSearchBox", true);
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

    &__loading {
      min-height: 424px;
      top: 100%;

      &--mobile {
        min-height: unset;
        position: relative;
        top: unset;
      }
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