<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui";

definePageMeta({
  layout: "login",
});

const { loading, message, login } = useAuth();

const authData: AuthFormField[] = [
  {
    name: "username",
    type: "username",
    label: "Usuario",
    placeholder: "Usuario",
    required: true,
  },
  {
    name: "password",
    label: "Contraseña",
    type: "password",
    placeholder: "Ingrese su contraseña",
    required: true,
  },
];

const schema = z.object({
  username: z.string("Usuario requerido"),
  password: z.string("Contraseña requerida"),
});

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  await login(payload.data);
}
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="Inicio de sesión"
        description="Accede a tu cuenta para continuar"
        icon="i-lucide-user"
        :fields="authData"
        :submit="{
          label: loading ? 'Iniciando sesión...' : 'Iniciar sesión',
          variant: 'subtle',
          loading: loading,
        }"
        @submit="onSubmit"
      >
        <template #validation>
          <UAlert
            v-if="message !== ''"
            color="error"
            icon="i-lucide-info"
            :description="message"
          />
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
