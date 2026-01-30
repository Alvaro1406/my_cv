import { prisma } from "~~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    const { search, unread } = query;

    const where: any = {};
    if (unread !== undefined && unread !== "") {
      where.unread = unread === "true";
    }

    if (search !== undefined && search !== "") {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } },
      ];
    }

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        orderBy: { createdAt: "desc" },
      }),
      prisma.contact.count({ where }),
    ]);

    return {
      success: true,
      data: {
        contacts,
        total,
      },
    };
  } catch (error) {
    console.error("Error getting contacts:", error);
    throw error;
  }
});
