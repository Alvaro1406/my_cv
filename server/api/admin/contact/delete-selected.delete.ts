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
      await prisma.contact.delete({
        where: {
          id: item,
        },
      });
    }

    return {
      success: true,
      message: "Contactos eliminados correctamente",
    };
  } catch (error) {
    console.error("Error eliminando contactos:", error);
    throw error;
  }
});
