<template>
  <div
    class="row items-center justify-center fixed w-[100%] h-[100dvh] bg-gray-300"
  >
    <main>
      <slot />
    </main>
    <bg_shadows_blue_1 class="absolute left-0 h-[100%] w-[100%]" />
    <bg_shadows_blue_2 class="absolute bottom-0 left-0" />
    <bg_shadows_orange_1 class="absolute top-0 h-[100%] w-[100%]" />
    <bg_shadows_orange_2 class="absolute bottom-0 right-0" />
  </div>
</template>

<script setup lang="ts">
import bg_shadows_blue_1 from "~/assets/shadows_efects/bg_shadows_blue_1.vue";
import bg_shadows_blue_2 from "~/assets/shadows_efects/bg_shadows_blue_2.vue";
import bg_shadows_orange_1 from "~/assets/shadows_efects/bg_shadows_orange_1.vue";
import bg_shadows_orange_2 from "~/assets/shadows_efects/bg_shadows_orange_2.vue";
</script>
