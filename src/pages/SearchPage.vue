<script lang="ts" setup>
import { useRoute } from "vue-router";
import Layout from "../components/layout/Layout.vue";
import SearchMovieGrid from "../components/SearchMovieGrid.vue";
import Loading from "../components/base/Loading.vue";

const route = useRoute();
const keyword : string =  route.query.k as string;

</script>
<template>
  <Layout>
    <Suspense timeout="5000">
      <SearchMovieGrid
        :keyword="keyword"
      />
      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </Layout>
</template>