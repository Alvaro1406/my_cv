import { prisma } from "~~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "El ID del contacto es obligatorio",
      });
    }

    await prisma.contact.delete({
      where: {
        id: id,
      },
    });

    return {
      success: true,
      message: "Contacto eliminado correctamente",
    };
  } catch (error) {
    console.error("Error update contact:", error);
    throw error;
  }
});
