import type {
  ITechnicalMastery,
  responseTechMastery,
} from "~/types/tech-mastery";

export const useTechMastery = () => {
  /** Properties */
  const techMastery = ref<ITechnicalMastery[]>([]);
  const message = ref<string>("");
  const loading = ref<boolean>(false);

  /**
   * Function to fetch technical
   * @returns void
   */
  async function getTechMastery(params?: Record<string, any>) {
    message.value = "";
    loading.value = true;
    try {
      const response: responseTechMastery = await $fetch(
        "/api/public/tech-mastery",
        {
          method: "GET",
        },
      );

      if (response.success) {
        techMastery.value = response.data.techMastery;
      }

      loading.value = false;
    } catch (error: any) {
      message.value =
        error.response._data?.message || "Error fetching contacts";
      loading.value = false;
    }
  }

  return {
    techMastery,
    message,
    loading,
    getTechMastery,
  };
};
