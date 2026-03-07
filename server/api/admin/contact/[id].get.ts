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

    /**
     * Mark the contact as read when fetching its details
     */
    await prisma.contact.update({
      where: {
        id: id,
      },
      data: {
        unread: false,
      },
    });

    /**
     * Fetch the contact details, including the createdAt field for display purposes
     */
    const contact = await prisma.contact.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        message: true,
        unread: true,
        archived: true,
        createdAt: true,
      },
    });

    if (!contact) {
      throw createError({
        statusCode: 404,
        statusMessage: "Contacto no encontrado",
      });
    }

    return {
      success: true,
      data: contact,
    };
  } catch (error) {
    console.error("Error fetching contact:", error);
    throw error;
  }
});
