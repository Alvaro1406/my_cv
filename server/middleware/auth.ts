import { IUser } from "~~/types/user";
import { getUserFromSession } from "../utils/auth";

// Function to validate if a user can access a route
export async function validateUserAccess(event: any, requiredRole?: string) {
  const user: IUser | null = await getUserFromSession(event);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "No autorizado",
    });
  }

  if (!user.isActive) {
    throw createError({
      statusCode: 403,
      statusMessage: "Usuario inactivo",
    });
  }

  if (requiredRole && user.role !== requiredRole) {
    throw createError({
      statusCode: 403,
      statusMessage: "Permisos insuficientes",
    });
  }

  return user;
}

// Main Middleware
export default defineEventHandler(async (event) => {
  // Only apply to API routes that begin with /api/admin
  if (event.node.req.url?.startsWith("/api/admin")) {
    try {
      // Exclude public routes as login
      const publicRoutes = [
        "/api/admin/login",
        "/api/admin/logout",
        "/api/public",
      ];

      if (publicRoutes.some((route) => event.node.req.url?.startsWith(route))) {
        return;
      }

      // Validate user access
      await validateUserAccess(event);
    } catch (error) {
      throw error;
    }
  }
});
