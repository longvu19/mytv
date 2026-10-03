<script setup lang="ts">
import { useRoute } from "vue-router";
import Loading from "./components/base/Loading.vue";
const route = useRoute();
// Switching episode/server keeps the movie page mounted; only a new movie remounts it
const viewKey = (): string => route.name === "phim" ? `phim/${route.params.slug}` : route.fullPath;
</script>

<template>
  <RouterView v-slot="{ Component }" :key="viewKey()">
    <Transition name="fade">
      <Suspense>
        <div>
          <component :is="Component" />
        </div>
        <template #fallback>
          <Loading />
        </template>
      </Suspense>
    </Transition>
  </RouterView>
</template>
