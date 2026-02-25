<script setup lang="ts">
import { format, isToday } from "date-fns";
import type { IContact } from "~/types/contacts";

const props = defineProps<{
  contacts: IContact[];
  loading?: Boolean;
}>();

const { contact, getContactById } = useContacts();

async function selectedContact(id: string) {
  await getContactById(id);
}
</script>

<template>
  <div class="h-full overflow-y-auto divide-y divide-default">
    <div v-if="!loading">
      <div v-for="(mail, index) in contacts" :key="index">
        <div
          class="p-4 sm:px-6 text-sm cursor-pointer border-l-2 transition-colors"
          :class="[
            mail.unread ? 'text-highlighted' : 'text-toned',
            contact && contact.id === mail.id
              ? 'border-primary bg-primary/10'
              : 'border-(--ui-bg) hover:border-primary hover:bg-primary/5',
          ]"
          @click="selectedContact(mail.id)"
        >
          <div
            class="flex items-center justify-between"
            :class="[mail.unread && 'font-semibold']"
          >
            <div class="flex items-center gap-3">
              {{ mail.name }}

              <UChip v-if="mail.unread" />
            </div>

            <span>{{
              isToday(new Date(mail.createdAt))
                ? format(new Date(mail.createdAt), "HH:mm")
                : format(new Date(mail.createdAt), "dd MMM")
            }}</span>
          </div>
          <p class="truncate" :class="[mail.unread && 'font-semibold']">
            {{ mail.subject }}
          </p>
          <p class="text-dimmed line-clamp-1">
            {{ mail.message }}
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-for="item in 10" :key="item">
        <div class="p-4 sm:px-6 text-sm cursor-pointer grid gap-2">
          <USkeleton class="h-4 w-[100px]" />
          <USkeleton class="h-4 w-[200px]" />
          <USkeleton class="h-4 w-[150px]" />
        </div>
      </div>
    </div>
  </div>
</template>
