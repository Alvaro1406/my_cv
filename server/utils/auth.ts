import jwt from "jsonwebtoken";
import { prisma } from "~~/server/utils/prisma";

export async function getUserFromSession(event: any) {
  try {
    // Get token from cookie
    const token = getCookie(event, "auth-token");

    if (!token) {
      return null;
    }

    // Verify token and get user info
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as any;

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        password: true,
        firstName: true,
        lastName: true,
        image: true,
        email: true,
        phoneNumber: true,
        role: true,
        isActive: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error getting user from session:", error);
    return null;
  }
}
