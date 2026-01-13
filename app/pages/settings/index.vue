<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

// Import composables for toast notifications and authentication
const toast = useToast();
const { user, loading, getProfile } = useAuth();

// Create a ref for the file input element to handle file uploads
const selectedFile = ref<File | null>(null);
const fileRef = ref<HTMLInputElement>();

// Define the schema for the profile form using Zod for validation
const profileSchema = z.object({
  firstName: z.string().min(2, "Too short"),
  lastName: z.string().min(2, "Too short"),
  email: z.string().email("Invalid email"),
  username: z.string().min(2, "Too short"),
  phoneNumber: z.string().optional(),
  image: z.string().optional(),
});
type ProfileSchema = z.output<typeof profileSchema>;

async function onSubmit(event: FormSubmitEvent<ProfileSchema>) {
  toast.add({
    title: "Success",
    description: "Your settings have been updated.",
    icon: "i-lucide-check",
    color: "success",
  });
  console.log(event.data);
}

// Handle file input change event to update the user's avatar image
function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement;

  if (!input.files?.length) {
    return;
  }
  user.value.image = URL.createObjectURL(input.files[0]!);
  selectedFile.value = input.files[0]!;
}

function onFileClick() {
  fileRef.value?.click();
}

// Hooks
onBeforeMount(async () => {
  await getProfile();
});
</script>

<template>
  <UForm id="settings" :schema="profileSchema" :state="user" @submit="onSubmit">
    <UPageCard
      title="Perfil"
      description="Información personal y detalles de contacto."
      variant="naked"
      orientation="horizontal"
      class="mb-4"
    >
      <UButton
        form="settings"
        label="Guardar cambios"
        color="neutral"
        type="submit"
        class="w-fit lg:ms-auto"
      />
    </UPageCard>

    <UPageCard variant="subtle">
      <UFormField
        name="name"
        label="Nombre"
        description="Nombre completo para mostrar en tu perfil y recibos."
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput v-model="user.firstName" autocomplete="off" />
      </UFormField>
      <USeparator />
      <UFormField
        name="email"
        label="Correo electrónico"
        description="Tu dirección de correo electrónico para recibir notificaciones."
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput v-model="user.email" type="email" autocomplete="off" />
      </UFormField>
      <USeparator />
      <UFormField
        name="username"
        label="Nombre de usuario"
        description="Tu nombre de usuario único para iniciar sesión."
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput v-model="user.username" type="username" autocomplete="off" />
      </UFormField>
      <USeparator />
      <UFormField
        name="image"
        label="Imagen de perfil"
        description="JPG, GIF or PNG. 1MB Max."
        class="flex max-sm:flex-col justify-between sm:items-center gap-4"
      >
        <div class="flex flex-wrap items-center gap-3">
          <UAvatar
            :src="user.image"
            :alt="user.firstName + ' ' + user.lastName"
            size="lg"
          />
          <UButton label="Choose" color="neutral" @click="onFileClick" />
          <input
            ref="fileRef"
            type="file"
            class="hidden"
            accept=".jpg, .jpeg, .png, .gif"
            @change="onFileChange"
          />
        </div>
      </UFormField>
    </UPageCard>
  </UForm>
</template>
