<script setup lang="ts">
import * as z from "zod";
import type { FormError } from "@nuxt/ui";
import type { FormSubmitEvent } from "@nuxt/ui";

const { loading, changePassword } = useAuth();

const passwordSchema = z.object({
  oldPassword: z.string().min(8, "Must be at least 8 characters"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type PasswordSchema = z.output<typeof passwordSchema>;

const password = reactive<Partial<PasswordSchema>>({
  oldPassword: undefined,
  password: undefined,
});

const validate = (state: Partial<PasswordSchema>): FormError[] => {
  const errors: FormError[] = [];
  if (
    state.oldPassword &&
    state.password &&
    state.oldPassword === state.password
  ) {
    errors.push({ name: "new", message: "Passwords must be different" });
  }
  return errors;
};

// Handle form submission to update the user's profile information
async function onSubmit(event: FormSubmitEvent<PasswordSchema>) {
  await changePassword({ ...event.data });
}
</script>

<template>
  <UPageCard
    title="Contraseña"
    description="Confirme su contraseña antigua e ingrese la nueva contraseña."
    variant="subtle"
  >
    <UForm
      id="security"
      :schema="passwordSchema"
      :state="password"
      :validate="validate"
      class="flex flex-col gap-4 max-w-xs"
      @submit="onSubmit"
    >
      <UFormField name="current">
        <UInput
          v-model="password.oldPassword"
          type="password"
          placeholder="Contraseña existente"
          class="w-full"
        />
      </UFormField>

      <UFormField name="new">
        <UInput
          v-model="password.password"
          type="password"
          placeholder="Nueva contraseña"
          class="w-full"
        />
      </UFormField>

      <UButton
        label="Guardar cambios"
        class="w-fit"
        type="submit"
        form="security"
      />
    </UForm>
  </UPageCard>
</template>
