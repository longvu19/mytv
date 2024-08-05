<script lang="ts" setup>
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  const props = defineProps<{
    currentPage: number;
    totalItems: number;
    totalItemsPerPage: number;
    totalPages: number;
  }>();
  const router = useRouter();

  const isFirstDivideShowed = computed(() => {
    return props.currentPage - 2 >= 1;
  });
  const isLastDivideShowed = computed(() => {
    return props.currentPage + 3 < props.totalPages;
  });
  const renderPages = computed(() => {
    let start = 2;
    if (props.currentPage >= 4 && props.currentPage < props.totalPages - 3) {
      start = props.currentPage - 1;
    } else if (props.currentPage >= props.totalPages - 3) {
      start = props.totalPages - 3;
    }
    return Array.from({ length: 3 }, (_, i) => i + start);
  });
  const activeClass = "pagination__item--active";
</script>

<template>
  <div class="pagination">
    <ul class="pagination__list">
      <li class="pagination__item" :class="{ [activeClass]: currentPage === 1 }">
        <RouterLink :to="{
          name: router.currentRoute.value.name,
          query: { page: 1 },
          force: true,
        }">
          1
        </RouterLink>
      </li>
      <li class="pagination__item" v-if="isFirstDivideShowed">...</li>
      <li class="pagination__item" :class="{ [activeClass]: currentPage === page }" v-for="page in renderPages" :key="page">
        <RouterLink :to="{
          name: router.currentRoute.value.name,
          query: { page: page },
          force: true,
        }">
          {{ page }}
        </RouterLink>
      </li>
      <li class="pagination__item" v-if="isLastDivideShowed">...</li>
      <li class="pagination__item" :class="{ [activeClass]: currentPage === totalPages }">
        <RouterLink :to="{
          name: router.currentRoute.value.name,
          query: { page: totalPages },
          force: true,
        }">
          {{ totalPages }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;

    &__list {
      display: flex;
      gap: 25px;
      background: linear-gradient(90deg,
          rgb(131, 58, 180) 0%,
          rgb(253, 29, 29) 50%,
          rgb(252, 176, 69) 100%);
      background-clip: text;

      a {
        display: block;
        text-decoration: none;
        color: transparent;
        font-weight: 700;
        font-size: 1.2rem;
        line-height: 2rem;
      }
    }

    &__item--active {
      a {
        font-size: 2rem;
      }
    }
  }
</style>