import { prisma } from "~~/server/utils/prisma";
import { paramsFilter, deleteNotifications } from "./utils";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const body = await readBody(event);

    const { contacts } = body;
    const { all, unread, archived, favorite, important } = query;

    const where = await paramsFilter({
      id: contacts as string[],
      unread: unread as string,
      archived: archived as string,
      favorite: favorite as string,
      important: important as string,
    });

    await deleteNotifications(where);

    if (!all) {
      await prisma.contact.deleteMany({
        where,
      });
    } else {
      await prisma.notifications.deleteMany({});
      await prisma.contact.deleteMany({});
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
