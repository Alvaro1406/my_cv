<script setup lang="ts">
import { format, isToday } from "date-fns";
import type { IContact } from "~/types/contacts";

const props = defineProps<{
  contacts: IContact[];
}>();

const selectedMail = defineModel<IContact | null>();
</script>

<template>
  <div class="h-full overflow-y-auto divide-y divide-default">
    <div v-for="(mail, index) in contacts" :key="index">
      <div
        class="p-4 sm:px-6 text-sm cursor-pointer border-l-2 transition-colors"
        :class="[
          mail.unread ? 'text-highlighted' : 'text-toned',
          selectedMail && selectedMail.id === mail.id
            ? 'border-primary bg-primary/10'
            : 'border-(--ui-bg) hover:border-primary hover:bg-primary/5',
        ]"
        @click="selectedMail = mail"
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
</template>
