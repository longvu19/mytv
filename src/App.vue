<script setup lang="ts">
// import {ref} from "vue";
import Loading from "./components/base/Loading.vue";
// const isScrollLocked = ref(false);
</script>

<template>
  <RouterView v-slot="{ Component }" :key="$route.fullPath">
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