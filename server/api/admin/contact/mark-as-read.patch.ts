// TO DO: Refactor this endpoint to use the paramsFilter function and handle the logic in a more efficient way, avoiding multiple database calls in a loop.
import { prisma } from "~~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const { id } = body;

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Debe proporcionar un ID de contacto",
      });
    }

    for (const item of id as string[]) {
      await prisma.contact.update({
        where: {
          id: item,
        },
        data: {
          unread: false,
        },
      });
    }

    return {
      success: true,
      message: "Contactos marcados como leídos correctamente",
    };
  } catch (error) {
    console.error("Error mark as read contact:", error);
    throw error;
  }
});
