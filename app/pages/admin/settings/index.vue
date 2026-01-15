<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

// Import composables for toast notifications and authentication
const toast = useToast();
const { user, loading, getProfile, updateProfile } = useAuth();

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

// Handle form submission to update the user's profile information
async function onSubmit(event: FormSubmitEvent<ProfileSchema>) {
  const response = await updateProfile({
    firstName: event.data.firstName,
    lastName: event.data.lastName,
    email: event.data.email,
    username: event.data.username,
    phoneNumber: event.data.phoneNumber,
    image: selectedFile.value as unknown as string, // Cast the file to a string for the API
  });
  if (response?.success) {
    toast.add({
      title: "Perfecto",
      description: "Tu perfil se ha actualizado correctamente.",
      icon: "i-lucide-check",
      color: "success",
    });
  } else {
    toast.add({
      title: "Error",
      description:
        "Hubo un error al actualizar tu perfil. Por favor, inténtalo de nuevo.",
      icon: "i-lucide-x",
      color: "error",
    });
  }
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
        name="image"
        label="Imagen de perfil"
        description="JPG, GIF or PNG. 2MB Max."
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
            accept=".jpg, .jpeg, .png"
            @change="onFileChange"
          />
        </div>
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
        name="firstName"
        label="Nombre"
        description="Nombre para mostrar en tu perfil y recibos."
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput v-model="user.firstName" autocomplete="off" />
      </UFormField>
      <USeparator />
      <UFormField
        name="lastName"
        label="Apellidos"
        description="Apellidos para mostrar en tu perfil y recibos."
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput v-model="user.lastName" autocomplete="off" />
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
        name="phoneNumber"
        label="Teléfono"
        description="Número de teléfono para contacto."
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput v-model="user.phoneNumber" autocomplete="off" />
      </UFormField>
    </UPageCard>
  </UForm>
</template>
