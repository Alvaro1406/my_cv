<template>
  <div class="flex items-center justify-center w-[100%] h-[100dvh]">
    <div
      class="xs:w-[90%] sm:w-[70vh] h-auto bg-white z-999 p-8 my-12 rounded-lg shadow-lg gap-4 flex flex-col items-center"
    >
      <h1 class="text-2xl font-bold text-center text-primary">
        Iniciar Sesión Admin
      </h1>
      <InputText
        title="Usuario"
        placeholder=""
        :required="true"
        :model-value="loginData.username"
        @update:model-value="(newVal: string) => (loginData.username = newVal)"
      />
      <InputPassword
        title="Contraseña"
        :toggle-mask="true"
        :fluid="true"
        :required="true"
        :model-value="loginData.password"
        @update:model-value="(newVal: string) => (loginData.password = newVal)"
      />
      <ButtonPrimary
        label="Iniciar Sesión"
        class="w-full mt-4"
        :loading="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/** Define page metadata */
definePageMeta({
  layout: "auth-admin",
});

// Import components
import ButtonPrimary from "~/components/default/ButtonPrimary.vue";
import InputText from "~/components/default/InputText.vue";
import InputPassword from "~/components/default/InputPassword.vue";

const loginData = ref<{ username: string; password: string }>({
  username: "",
  password: "",
});
</script>
