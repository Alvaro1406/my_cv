export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/admin") {
    if (import.meta.client) {
      const token = localStorage.getItem("auth-token");
      if (to.path.startsWith("/admin/login") && !token) {
        return navigateTo("/admin/login");
      }
    }
  }
});
