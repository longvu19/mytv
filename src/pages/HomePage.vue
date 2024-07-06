<script lang="ts" setup>
import Layout from '../components/layout/Layout.vue';
import FeaturingMovies from '../components/FeaturingMovies.vue';
import Loading from '../components/base/Loading.vue';
import CategoryMovieList from '../components/CategoryMovieList.vue';
</script>
<template>
  <Layout>
    <Transition name="fade">
      <Suspense timeout="5000" :suspensible="false">
        <template #default>
          <div>
            <FeaturingMovies />
            <div class="categories">
              <CategoryMovieList title="Phim lẻ" category="phim-le" />
              <CategoryMovieList title="Phim bộ" category="phim-bo" />
              <CategoryMovieList title="TV Shows" category="tv-shows" />
            </div>
          </div>
        </template>
        <template #fallback>
          <Loading />
        </template>
      </Suspense>
    </Transition>
  </Layout>
</template>
<style lang="scss" scoped>
.categories {
  display: flex;
  flex-direction: column;
  gap: 50px;
}
</style>