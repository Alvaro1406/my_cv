import type { IErrorCatch } from "~/types/error-catch";
import type { IAuthCredentials, IAuthResponse } from "~/types/auth";

export const useAuth = () => {
  const message = ref<string>("");
  const loading = ref<boolean>(false);

  const router = useRouter();

  async function login(userData: IAuthCredentials) {
    message.value = "";
    loading.value = true;
    try {
      const response: IAuthResponse = await $fetch("/api/auth/login", {
        method: "POST",
        body: userData,
      });

      if (response.success) {
        // Set the token in a localStorage
        const token = response.token;
        localStorage.setItem("auth-token", token);

        router.push("/");
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
