import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "~~/server/utils/prismaImport";
import type { ILoginResponse } from "~~/types/user";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Usuario y contraseña son requeridos",
    });
  }

  try {
    // Search for user
    const user = await prisma.user.findUnique({
      where: {
        username,
        visible: true,
      },
    });

    // Verify username
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Nombre de usuario incorrecto",
      });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: "Credenciales incorrectas",
      });
    }

    // Verify user is active or not
    if (!user.isActive) {
      throw createError({
        statusCode: 403,
        statusMessage: "Usuario inactivo",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    /**
     * Delete existing sessions for the user
     */
    await prisma.userSession.deleteMany({
      where: {
        userId: user.id,
      },
    });

    // Create session
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    // Store session in the database
    await prisma.userSession.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    // Configure cookies
    setCookie(event, "auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
    });

    return {
      success: true,
      message: {
        es: "Inicio de sesión exitoso",
        en: "Login successful",
      },
      user: {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      } as ILoginResponse,
      token,
    };
  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Error del servidor",
    });
  }
});
