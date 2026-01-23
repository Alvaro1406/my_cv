<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { breakpointsTailwind } from "@vueuse/core";
import type { Mail } from "~/types";
import InboxList from "~/components/admin/inbox/InboxList.vue";
import InboxMail from "~/components/admin/inbox/InboxMail.vue";

const tabItems = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Unread",
    value: "unread",
  },
];
const selectedTab = ref("unread");

const { data: mails } = await useFetch<Mail[]>("/api/mails", {
  default: () => [],
});

// Filter mails based on the selected tab
const filteredMails = computed(() => {
  if (selectedTab.value === "unread") {
    return mails.value.filter((mail) => !!mail.unread);
  }

  return mails.value;
});

const selectedMail = ref<Mail | null>();

const isMailPanelOpen = computed({
  get() {
    return !!selectedMail.value;
  },
  set(value: boolean) {
    if (!value) {
      selectedMail.value = null;
    }
  },
});

// Reset selected mail if it's not in the filtered mails
watch(filteredMails, () => {
  if (!filteredMails.value.find((mail) => mail.id === selectedMail.value?.id)) {
    selectedMail.value = null;
  }
});
</script>

<template>
  <div class="w-full h-[85dvh] grid grid-cols-12 items-start justify-center">
    <div class="col-span-4 border-r-[0.5px] border-neutral-800 h-[100%]">
      <div
        class="w-full flex justify-end items-center p-2 border-b-[0.5px] border-neutral-800"
      >
        <UTabs
          class="w-42"
          v-model="selectedTab"
          :items="tabItems"
          :content="false"
          size="xs"
        />
      </div>
      <InboxList v-model="selectedMail" :mails="filteredMails" />
    </div>
    <div class="col-span-8 h-[100%] flex justify-center items-center">
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
