<template>
  <Message :severity="severity">{{ text }}</Message>
</template>

<script setup lang="ts">
import Message from "primevue/message";

defineProps<{
  severity: "success" | "info" | "warn" | "error" | "secondary" | "contrast";
  text: string;
}>();
</script>
