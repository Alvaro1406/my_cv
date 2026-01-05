export default defineNuxtRouteMiddleware((to) => {
  if (to.path !== "/login") {
    if (import.meta.client) {
      const token = localStorage.getItem("auth-token");
      if (to.path !== "/login" && !token) {
        return navigateTo("/login");
      }
    }
  }
});
