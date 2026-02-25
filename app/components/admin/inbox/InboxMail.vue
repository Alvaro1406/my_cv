<script setup lang="ts">
import { format } from "date-fns";
import type { IContact } from "~/types/contacts";

defineProps<{
  loading?: Boolean;
}>();

const { contact, selectContactId } = useContacts();

const dropdownItems = [
  [
    {
      label: "Mark as unread",
      icon: "i-lucide-check-circle",
    },
    {
      label: "Mark as important",
      icon: "i-lucide-triangle-alert",
    },
  ],
  [
    {
      label: "Star thread",
      icon: "i-lucide-star",
    },
  ],
];

function clearData() {
  contact.value = {} as IContact;
  selectContactId.value = false;
}
</script>

<template>
  <div class="w-full h-full overflow-y-auto divide-y divide-default">
    <UDashboardPanel id="inbox-2">
      <UDashboardNavbar :title="contact.subject" :toggle="false">
        <template #leading>
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            class="-ms-1.5"
            @click="clearData()"
          />
        </template>

        <template #right>
          <UTooltip text="Archive">
            <UButton icon="i-lucide-inbox" color="neutral" variant="ghost" />
          </UTooltip>

          <UTooltip text="Reply">
            <UButton icon="i-lucide-reply" color="neutral" variant="ghost" />
          </UTooltip>

          <UDropdownMenu :items="dropdownItems">
            <UButton
              icon="i-lucide-ellipsis-vertical"
              color="neutral"
              variant="ghost"
            />
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>

      <div
        class="flex flex-col sm:flex-row justify-between gap-1 p-4 sm:px-6 border-b border-default"
      >
        <div class="flex items-start gap-4 sm:my-1.5">
          <div class="min-w-0">
            <p class="font-semibold text-highlighted">
              {{ contact.name }}
            </p>
            <p class="text-muted">
              {{ contact.email }}
            </p>
          </div>
        </div>

        <p class="max-sm:pl-16 text-muted text-sm sm:mt-2">
          {{ format(new Date(contact.createdAt), "dd MMM HH:mm") }}
        </p>
      </div>

      <div class="flex-1 p-4 sm:p-6 overflow-y-auto">
        <p class="whitespace-pre-wrap">
          {{ contact.message }}
        </p>
      </div>
    </UDashboardPanel>
  </div>
</template>
