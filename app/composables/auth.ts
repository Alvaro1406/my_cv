import type { IErrorCatch } from "~/types/error-catch";
import type { IAuthCredentials, IAuthResponse } from "~/types/auth";

export const useAuth = () => {
  /** Properties */
  const message = ref<string>("");
  const loading = ref<boolean>(false);

  /** Import router */
  const router = useRouter();

  /**
   * Login function
   * @param userData username, password
   */
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

  /**
   * Logout function
   */
  async function logout() {
    loading.value = true;
    try {
      const response = await $fetch("/api/auth/login", {
        method: "POST",
      });

      if (response.success) {
        if (import.meta.client) {
          localStorage.removeItem("auth-token");
        }
        router.push("/login");
      }
      loading.value = false;
    } catch (error: IErrorCatch | any) {
      message.value = error.response._data?.message;
      loading.value = false;
    }
  }

  return {
    login,
    logout,
    loading,
    message,
  };
};
