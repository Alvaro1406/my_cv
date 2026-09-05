export default defineNuxtRouteMiddleware((to) => {
  if (to.path.includes("/admin")) {
    try {
      if (import.meta.client) {
        const token = localStorage.getItem("auth-token");
        const publicRoutes = ["/admin/login"];

        if (!token) {
          if (publicRoutes.some((route: string) => to.path.includes(route))) {
            return;
          }

          return navigateTo("/admin/login");
        }
      }
    } catch (error) {
      throw error;
    }
  }
});
