<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Experiencia",
    to: "/experience",
    active: route.path.startsWith("/experience"),
  },
  {
    label: "Habilidades",
    to: "/skills",
    active: route.path.startsWith("/skills"),
  },
  {
    label: "Sobre mi",
    to: "/about-us",
    active: route.path.startsWith("/about-us"),
  },
  {
    label: "Contacteme",
    to: "/contact",
    active: route.path.startsWith("/contact"),
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
