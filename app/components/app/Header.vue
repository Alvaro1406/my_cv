<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Experiencia",
    to: "",
    // active: route.path.startsWith(""),
  },
  {
    label: "Habilidades",
    to: "",
    // active: route.path.startsWith(""),
  },
  {
    label: "Sobre mi",
    to: "",
    // active: route.path.startsWith(""),
  },
  {
    label: "Contacteme",
    to: "",
    // active: route.path.startsWith(""),
  },
]);
</script>

<template>
  <UHeader mode="drawer">
    <template #title>
      <p>Alvaro<span class="text-blue-500">BG</span></p>
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="mx-2.5 flex justify-center items-center"
      />
    </template>
  </UHeader>
</template>
