<template>
  <div class="flex flex-col justify-center items-start w-full gap-1">
    <p class="text-[16px] text-primary-dark px-1">
      {{ title }} <span v-if="required" class="text-red-500">*</span>
    </p>
    <div class="w-full flex-container">
      <Password
        class="w-full"
        :type="type"
        :disabled="disabled"
        :placeholder="placeholder"
        :modelValue="inputValue"
        :feedback="feedback"
        :toggleMask="toggleMask"
        :fluid="fluid"
        @update:model-value="(newVal: any) => updateModel(newVal)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Password from "primevue/password";

const props = defineProps<{
  title?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  feedback?: boolean;
  toggleMask?: boolean;
  fluid?: boolean;
  placeholder?: string;
  modelValue?: string;
}>();

const inputValue = toRef(props, "modelValue");

const emit = defineEmits(["update:modelValue"]);
function updateModel(value: string) {
  emit("update:modelValue", value);
}
</script>
