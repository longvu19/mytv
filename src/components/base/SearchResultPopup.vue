<script lang="ts" setup>
import { computed } from "vue";
import type { ComputedRef } from "vue";
import type {
  MovieSearchResultResponse,
  MovieListInfo,
} from "../../services/types";
import SearchResult from "./SearchResult.vue";
const props = defineProps<{
  result: MovieSearchResultResponse;
  keyword: string;
}>();
const data: ComputedRef<MovieListInfo[]> = computed(() => {
  return props.result.data.items;
});
</script>

<template>
  <div class="search-result">
    <SearchResult
      class="search-result__list-container"
      :result="data"
      :imgHost="props.result.data.APP_DOMAIN_CDN_IMAGE"
    />
    <div class="search-result__footer">
      <RouterLink
        :to="{ name: 'tim-kiem', query: { k: keyword } }"
        class="search-result__footer-link"
      >
        Xem thêm
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-result {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #111;
}

.search-result__list-container{
  max-height: 380px;
}

.search-result__footer {
  display: flex;
}

.search-result__footer-link {
  display: block;
  width: 100%;
  padding: 10px 0;
  text-decoration: none;
  color: white;
  text-align: center;
  background: #111;

  &:hover {
    background: #424242;
  }
}
</style>