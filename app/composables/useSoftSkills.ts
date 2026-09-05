import type { ISoftSkills, responseSoftSkills } from "~/types/soft-skills";

export const useSoftSkills = () => {
  /** Properties */
  const softSkills = ref<ISoftSkills[]>([]);
  const message = ref<string>("");
  const loading = ref<boolean>(false);

  /**
   * Function to fetch soft skills
   * @returns void
   */
  async function getSoftSkills(params?: Record<string, any>) {
    message.value = "";
    loading.value = true;
    try {
      const response: responseSoftSkills = await $fetch(
        "/api/public/soft-skills",
        {
          method: "GET",
        },
      );

      if (response.success) {
        softSkills.value = response.data.softSkills;
      }

      loading.value = false;
    } catch (error: any) {
      message.value =
        error.response._data?.message || "Error fetching soft skills";
      loading.value = false;
    }
  }

  return {
    softSkills,
    message,
    loading,
    getSoftSkills,
  };
};
