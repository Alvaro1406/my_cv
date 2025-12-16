import { prisma } from "~~/server/utils/prismaImport";

export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, "auth-token");

    if (token) {
      await prisma.userSession.deleteMany({
        where: {
          token: token,
        },
      });
    }

    deleteCookie(event, "auth-token");

    return {
      success: true,
      message: {
        es: "Sesión cerrada correctamente",
        en: "Logged out successfully",
      },
    };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al cerrar sesión",
    });
  }
});
