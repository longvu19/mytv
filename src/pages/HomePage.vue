<script lang="ts" setup>
  import Layout from "../components/layout/Layout.vue";
  import FeaturingMovies from "../components/FeaturingMovies.vue";
  import Loading from "../components/base/Loading.vue";
  import CategoryMovieList from "../components/CategoryMovieList.vue";
  const categories = [
    { title: "Phim lẻ", slug: "phim-le" },
    { title: "Phim bộ", slug: "phim-bo" },
    { title: "TV Shows", slug: "tv-shows" },
    { title: "Hoạt hình", slug: "hoat-hinh" },
  ];
</script>
<template>
  <Layout>
    <!-- One Suspense per section: each shows as soon as its own request returns -->
    <Suspense>
      <FeaturingMovies />
      <template #fallback>
        <div class="featuring-placeholder">
          <Loading />
        </div>
      </template>
    </Suspense>
    <div class="categories">
      <Suspense v-for="category in categories" :key="category.slug">
        <CategoryMovieList :title="category.title" :category="category.slug" />
        <template #fallback>
          <div class="category-placeholder"></div>
        </template>
      </Suspense>
    </div>
  </Layout>
</template>
<style lang="scss" scoped>
  .categories {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  // Same size as the loaded sections so the page does not jump
  .featuring-placeholder {
    position: relative;
    z-index: 0;
    height: 730px;
    margin-bottom: 50px;

    @media (max-width: 768px) {
      height: 500px;
    }
  }

  .category-placeholder {
    min-height: 310px;
  }
</style>
