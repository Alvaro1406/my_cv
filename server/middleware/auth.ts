import { IUser } from "~~/types/user";
import { getUserFromSession } from "../utils/auth";
import { prisma } from "~~/server/utils/prisma";

// Function to validate if a user can access a route
export async function validateUserAccess(event: any): Promise<IUser> {
  const token = getCookie(event, "auth-token");
  const user: IUser | null = await getUserFromSession(event);

  const userSession = await prisma.userSession.findUnique({
    where: { token: token },
    select: {
      id: true,
      expiresAt: true,
    },
  });

  // Create session expiration check
  if (userSession && new Date() > userSession.expiresAt) {
    throw createError({
      statusCode: 401,
      statusMessage: "Sesión expirada",
    });
  }

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "No autorizado",
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
      const publicRoutes = ["/api/auth/login", "/api/auth/logout"];

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
