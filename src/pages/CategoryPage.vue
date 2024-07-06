<script lang="ts" setup>
import { onUpdated, ref, onMounted } from "vue";
import type { Ref } from "vue";
import { useRouter } from "vue-router";
import Layout from "../components/layout/Layout.vue";
import CategoryMovieGrid from "../components/CategoryMovieGrid.vue";
import Loading from "../components/base/Loading.vue";

const router = useRouter();

const page: number = parseInt(router.currentRoute.value.query.page as string ?? "1");

const category: Ref<string> = ref("");
onMounted(() => {
  category.value = <string>router.options.history.state.category;
});

onUpdated(() => {
  category.value = <string>router.options.history.state.category;
});
</script>
<template>
  <Layout>
    <Transition name="fade">
      <Suspense timeout="5000">
        <CategoryMovieGrid :title="category" :slug="router.currentRoute.value.name as string" :page="page" />
        <template #fallback>
          <Loading />
        </template>
      </Suspense>
    </Transition>
  </Layout>
</template>