import type { IContact } from "~/types/contacts";

export const useContacts = () => {
  /** Properties */
  const contacts = ref<IContact[]>([]);
  const total = useState<number>("contacts:total", () => 0);
  const totalUnread = useState<number>("contacts:totalUnread", () => 0);
  const totalArchived = useState<number>("contacts:totalArchived", () => 0);
  const message = ref<string>("");
  const loading = ref<boolean>(false);

  /**
   * Function to fetch contacts from the API with optional filters
   * @param params Parameters for filtering contacts (search, unread, archived)
   * @returns void
   */
  async function getContacts(params?: {
    search?: string;
    unread?: boolean;
    archived?: boolean;
  }) {
    message.value = "";
    loading.value = true;
    try {
      const response = await $fetch("/api/admin/contact", {
        method: "GET",
        query: params,
      });

      if (response.success) {
        contacts.value = response.data.contacts;
        total.value = response.data.total;
        totalUnread.value = response.data.totalUnread;
        totalArchived.value = response.data.totalArchived;
      }

      loading.value = false;
    } catch (error: any) {
      message.value =
        error.response._data?.message || "Error fetching contacts";
      loading.value = false;
    }
  }

  return {
    contacts,
    total,
    totalUnread,
    totalArchived,
    message,
    loading,
    getContacts,
  };
};
