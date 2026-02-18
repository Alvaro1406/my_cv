import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  // We obtain the original $fetch reference so as not to break base configurations.

  const $fetch = globalThis.$fetch;
  // We overwrite the global $fetch by adding our interceptors.
  globalThis.$fetch = $fetch.create({
    // This hook is executed when the API returns an error (4xx, 5xx).
    async onResponseError({ response }) {
      // We check if the error is 401 (Unauthorized).
      if (response.status === 401) {
        // Exclude public routes as login
        const publicRoutes = ["/api/auth/login", "/api/auth/logout"];
        if (publicRoutes.some((route) => response.url?.includes(route))) {
          return;
        }

        // 1. Clear the cookie/token so that the app's state is updated.
        const token = useCookie<string | null>("auth-token");
        token.value = null;

        // 2. Clear localStorage token if we are on client-side
        if (import.meta.client) {
          localStorage.removeItem("user");
          localStorage.removeItem("auth-token");
        }

        // 3. Redirect to login
        // We use navigateTo so it works both on client and server
        await navigateTo("/admin/login");
      }
    },
  });
});
