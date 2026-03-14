import { prisma } from "~~/server/utils/prisma";
import { paramsFilter } from "./utils";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    const { search, unread, archived, favorite, important } = query;

    const where = await paramsFilter({
      search: search as string,
      unread: unread as string,
      archived: archived as string,
      favorite: favorite as string,
      important: important as string,
    });

    const [contacts, total, totalUnread, totalArchived] = await Promise.all([
      prisma.contact.findMany({
        where,
        orderBy: { createdAt: "desc" },
      }),
      prisma.contact.count({ where: { archived: false } }),
      prisma.contact.count({ where: { unread: true, archived: false } }),
      prisma.contact.count({ where: { archived: true } }),
    ]);

    return {
      success: true,
      data: {
        contacts,
        total,
        totalUnread,
        totalArchived,
      },
    };
  } catch (error) {
    console.error("Error getting contacts:", error);
    throw error;
  }
});
