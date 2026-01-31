import { prisma } from "~~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  try {
    await prisma.contact.deleteMany({});

    return {
      success: true,
      message: "Contactos eliminados correctamente",
    };
  } catch (error) {
    console.error("Error eliminando contactos:", error);
    throw error;
  }
});
