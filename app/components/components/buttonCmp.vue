<template>
  <UButton
    :label="label"
    :color="color"
    :variant="variant"
    :size="size"
    :icon="icon"
    :trailing-icon="trailingIcon"
    :active="active"
    :active-class="activeClass"
    :disabled="disabled"
  />
</template>

<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";

withDefaults(
  defineProps<{
    label?: string;
    color?: ButtonProps["color"];
    variant?: ButtonProps["variant"];
    size?: ButtonProps["size"];
    icon?: string;
    trailingIcon?: string;
    active?: boolean;
    activeClass?: string;
    disabled?: boolean;
  }>(),
  {
    label: "Button",
    color: "primary",
    variant: "outline",
    size: "xl",
    icon: "",
    trailingIcon: "",
    active: false,
    activeClass: "",
    disabled: false,
  },
);
</script>
