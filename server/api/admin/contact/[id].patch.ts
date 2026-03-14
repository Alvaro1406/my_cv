import { prisma } from "~~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);

    const { unread, archived, favorite, important } = body;

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "El ID del contacto es obligatorio",
      });
    }

    const contact = await prisma.contact.update({
      where: {
        id: id,
      },
      data: {
        unread: unread,
        archived: archived,
        favorite: favorite,
        important: important,
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
