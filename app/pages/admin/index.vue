<script setup lang="ts">
// Vue
import { ref } from "vue";
// Socket.io
import { useSocket } from "~/plugins/socket.io";
// Components
import InboxList from "~/components/admin/inbox/InboxList.vue";
import InboxMail from "~/components/admin/inbox/InboxMail.vue";
// Import types
import type { TabsItem } from "@nuxt/ui";
import type { IContactFilters } from "~/types/contacts";

/**
 * Tabs properties
 */
const selectedTab = ref("all");
const tabItems: TabsItem[] = [
  {
    label: "Todos",
    value: "all",
  },
  {
    label: "Sin leer",
    value: "unread",
  },
];

const {
  contacts,
  total,
  totalUnread,
  totalArchived,
  message,
  loading,
  getContacts,
} = useContacts();

const selectedMail = ref(null);

const filters = ref<IContactFilters>({
  search: "",
  unread: undefined,
  archived: false,
});

async function fetchContacts() {
  switch (selectedTab.value) {
    case "unread":
      filters.value.unread = true;
      filters.value.archived = false;
      break;
    default:
      filters.value.unread = undefined;
      filters.value.archived = false;
      break;
  }
  await getContacts(filters.value);
}

/**
 * Socket.io setup
 */
const socket = useSocket();
socket.on("new-contact", async (value) => {
  await fetchContacts();
});

watch(selectedTab, async () => {
  await fetchContacts();
});

onBeforeMount(async () => {
  await fetchContacts();
});
</script>

<template>
  <div class="w-full h-[85dvh] grid grid-cols-12 items-start justify-center">
    <div class="col-span-4 border-r-[0.5px] border-neutral-800 h-full">
      <div
        class="w-full flex justify-end items-center p-2 border-b-[0.5px] border-neutral-800"
      >
        <UTabs
          v-model="selectedTab"
          :items="tabItems"
          :content="false"
          size="sm"
        >
          <template #trailing="{ item }">
            <p v-if="item.value === 'all'">{{ total }}</p>
            <p v-else-if="item.value === 'unread'">
              {{ totalUnread }}
            </p>
            <p v-else-if="item.value === 'archived'">
              {{ totalArchived }}
            </p>
          </template>
        </UTabs>
      </div>
      <div class="w-full h-[80dvh]">
        <InboxList
          v-model="selectedMail"
          :contacts="contacts"
          :loading="loading"
        />
      </div>
    </div>
    <div class="col-span-8 h-full flex justify-center items-center">
      <InboxMail
        v-if="selectedMail"
        :mail="selectedMail"
        @close="selectedMail = null"
      />
      <div v-else class="hidden lg:flex flex-1 items-center justify-center">
        <UIcon name="i-lucide-inbox" class="size-32 text-dimmed" />
      </div>
    </div>
  </div>
</template>
