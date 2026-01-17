<script setup lang="ts">
import type { INotifications } from "~/types/notifications";

const { showNotifications } = useDashboard();

const notifications = ref<INotifications[]>([]);
</script>

<template>
  <USlideover v-model:open="showNotifications" title="Notificaciones">
    <template #body>
      <NuxtLink
        v-for="(notification, index) in notifications"
        :key="index"
        :to="`/inbox?id=${notification.id}`"
        class="px-3 py-2.5 rounded-md hover:bg-elevated/50 flex items-center gap-3 relative -mx-3 first:-mt-3 last:-mb-3"
      >
        <UChip color="error" :show="!!notification.unread" inset>
          <!--<UAvatar
            v-bind="notification.sender.avatar"
            :alt="notification.sender.name"
            size="md"
          />-->
        </UChip>

        <div class="text-sm flex-1">
          <!--<p class="flex items-center justify-between">
            <span class="text-highlighted font-medium">{{
              notification.sender.name
            }}</span>

            <time
              :datetime="notification.createdAt"
              class="text-muted text-xs"
              v-text="formatTimeAgo(new Date(notification.createdAt))"
            />
          </p>-->

          <p class="text-dimmed">
            {{ notification.description }}
          </p>
        </div>
      </NuxtLink>
    </template>
  </USlideover>
</template>
