import { useRouter } from "vue-router";
import type { IAuthCredentials, IAuthResponse } from "~/interfaces/auth";
import type { IErrorCatch } from "~/interfaces/error-catch";

export const useAuth = () => {
  const router = useRouter();

  const loading = ref<boolean>(false);
  const message = ref<string>("");

  async function login(userData: IAuthCredentials) {
    message.value = "";
    loading.value = true;
    try {
      const response: IAuthResponse = await $fetch("/api/auth/login", {
        method: "POST",
        body: userData,
      });
      if (response.success) {
        router.push("/admin");
      }
      loading.value = false;
    } catch (error: IErrorCatch | any) {
      message.value = error.response._data?.message;
      loading.value = false;
    }
  }

  return {
    login,
    loading,
    message,
  };
};
