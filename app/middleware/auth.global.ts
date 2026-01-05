export default defineNuxtRouteMiddleware((to) => {
  if (to.path !== "/login") {
    const token = useCookie<string | null>("auth-token");
    if (!token.value) {
      return navigateTo("/login");
    }
  }
});
