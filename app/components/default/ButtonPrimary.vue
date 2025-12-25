<template>
  <Button type="button" :label="label" :icon="icon" :loading="loading" />
</template>

<script setup lang="ts">
import Button from "primevue/button";

defineProps<{
  loading?: boolean;
  label?: string;
  icon?: string;
}>();
</script>
