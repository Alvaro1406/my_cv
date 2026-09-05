export default defineNuxtRouteMiddleware((to) => {
  if (to.path.includes("/admin/login")) {
    setPageLayout("login");
  }
  // Logic for admin routes
  else if (to.path.includes("/admin")) {
    setPageLayout("admin");
  }
  // Logic for public routes
  else {
    setPageLayout("default");
  }
});
