import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "~~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  try {
    /**
     * Token verification
     */
    const token = getCookie(event, "auth-token");
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: "No autorizado",
      });
    }

    /**
     * Decoding the token
     */
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "your-secret-key"
    ) as any;

    // Search for user
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    // Verify username
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "Usuario no encontrado",
      });
    }

    /**
     * Validations
     */
    const body = await readBody(event);
    const { oldPassword, password } = body;

    // Required fields
    if (!oldPassword || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Los campos oldPassword y password son obligatorios",
      });
    }

    // Verify old password
    const passwordDecode = await bcrypt.compare(oldPassword, user.password);
    if (!passwordDecode) {
      throw createError({
        statusCode: 400,
        statusMessage: "Contraseña antigua incorrecta",
      });
    }

    // Code password to save in the database
    const passwordHash = await bcrypt.hash(password, 10);

    /**
     * Updating user profile
     */
    const updateUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: passwordHash },
      select: {
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
      },
    });

    return {
      success: true,
      data: updateUser,
      message: "Contraseña actualizada exitosamente",
    };
  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }

    console.error("Error updating profile:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error del servidor al actualizar el perfil",
    });
  }
});
