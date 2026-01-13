import type { IErrorCatch } from "~/types/error-catch";
import type { IProfile, IAuthCredentials, IAuthResponse } from "~/types/auth";

export const useAuth = () => {
  /** Properties */
  const user = ref<IProfile>({} as IProfile);
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
        const user = response.user;
        const token = response.token;
        localStorage.setItem("user", JSON.stringify(user));
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
      const response = await $fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.success) {
        if (import.meta.client) {
          localStorage.removeItem("user");
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

  /**
   * Get profile function
   */
  async function getProfile() {
    loading.value = true;
    try {
      const response = await $fetch("/api/admin/profile", {
        method: "GET",
      });

      if (response.success) {
        user.value = response.data;
        if (import.meta.client) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      }
      loading.value = false;
    } catch (error: IErrorCatch | any) {
      message.value = error.response._data?.message;
      loading.value = false;
    }
  }

  /**
   * Get profile function
   * @param data Partial profile data to update the user's profile information
   * @returns The response from the API after updating the profile information
   */
  async function updateProfile(data: Partial<IProfile>) {
    loading.value = true;
    const formData = new FormData();
    for (const key in data) {
      if (data[key as keyof IProfile]) {
        formData.append(key, data[key as keyof IProfile] as string);
      }
    }
    try {
      const response = await $fetch("/api/admin/profile", {
        method: "PUT",
        body: formData,
      });

      if (response.success) {
        await getProfile();
        return response;
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
    getProfile,
    updateProfile,
    user,
    loading,
    message,
  };
};
