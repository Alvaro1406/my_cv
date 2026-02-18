export default defineNuxtRouteMiddleware((to) => {
  // Logic for the login route
  if (to.path.startsWith("/admin/login")) {
    setPageLayout("login");
  }
  // Logic for admin routes
  else if (to.path.startsWith("/admin")) {
    setPageLayout("admin");
  }
  // Logic for public routes
  else {
    setPageLayout("default");
  }
});
