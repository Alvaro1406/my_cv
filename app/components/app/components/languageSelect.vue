<script setup lang="ts">
const { locale, setLocale } = useI18n();

const locales = ref([
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "br", name: "Brasil" },
]);
</script>

<template>
  <ULocaleSelect
    :model-value="locale"
    :locales="locales as any"
    @update:model-value="(newLocale: any) => setLocale(newLocale)"
  />
</template>
