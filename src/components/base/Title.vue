<script lang="ts" setup>

</script>

<template>
  <h2 class="title">
    <slot></slot>
  </h2>
</template>

<style lang="scss">
.title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  text-transform: uppercase;
  color: #fff;
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
}
</style>