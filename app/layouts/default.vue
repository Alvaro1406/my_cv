<script setup lang="ts">
import Header from "~/components/app/Header.vue";
import Footer from "~/components/app/Footer.vue";
</script>

<template>
  <Header />
  <UContainer class="py-2">
    <slot />
  </UContainer>
  <Footer />
</template>
