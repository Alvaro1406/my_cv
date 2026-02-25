import type { IContact, IContactByIdRes } from "~/types/contacts";

export const useContacts = () => {
  /** Properties */
  const contacts = ref<IContact[]>([]);
  const total = useState<number>("contacts:total", () => 0);
  const totalUnread = useState<number>("contacts:totalUnread", () => 0);
  const totalArchived = useState<number>("contacts:totalArchived", () => 0);
  const contact = useState<IContact>("contact", () => ({}) as IContact);
  const selectContactId = useState<boolean>("selectedContactId", () => false);
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

  /**
   * Get contact by ID
   * @param id id of the contact to fetch
   * @returns void
   */
  async function getContactById(id: string) {
    message.value = "";
    loading.value = true;
    try {
      const response: IContactByIdRes = await $fetch(
        `/api/admin/contact/${id}`,
        {
          method: "GET",
        },
      );

      if (response.success) {
        contact.value = response.data;
        selectContactId.value = true;
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
    contact,
    selectContactId,
    message,
    loading,
    getContacts,
    getContactById,
  };
};
