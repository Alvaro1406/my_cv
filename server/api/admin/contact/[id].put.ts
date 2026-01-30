import { prisma } from "~~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);

    const { unread } = body;

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "El ID del contacto es obligatorio",
      });
    }

    if (unread === undefined || unread === null) {
      throw createError({
        statusCode: 400,
        statusMessage: "El campo unread es obligatorio",
      });
    }

    const contact = await prisma.contact.update({
      where: {
        id: id,
      },
      data: {
        unread: unread,
      },
    });

    return {
      success: true,
      data: contact,
    };
  } catch (error) {
    console.error("Error update contact:", error);
    throw error;
  }
});
