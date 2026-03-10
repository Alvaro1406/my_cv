/**
 * This file contains utility functions for the contact API routes in the admin section.
 * These functions are used to perform common operations related to contact management,
 * such as marking contacts as read, deleting contacts, and handling contact-related data.
 *
 * The functions in this file are designed to be reusable across different API routes,
 * ensuring consistency and reducing code duplication. They interact with the database
 * using Prisma to perform the necessary operations on the contact data.
 *
 * Each function is documented with comments explaining its purpose, parameters, and return values,
 * making it easier for developers to understand and use them effectively in the API routes.
 */

/**
 * Type definition for the parameters used in contact-related operations.
 */
export type ContactParams = {
  id?: string[];
  search?: string;
  unread?: string | boolean;
  archived?: string | boolean;
  favorite?: string | boolean;
  important?: string | boolean;
};

/**
 * Function to filter contact parameters and construct a Prisma where clause for querying the database.
 * @param params
 * @returns
 */
export async function paramsFilter(params: ContactParams) {
  const where: any = {};

  if (params.search !== undefined && params.search !== "") {
    where.OR = [
      { name: { contains: params.search, mode: "insensitive" } },
      { email: { contains: params.search, mode: "insensitive" } },
      { message: { contains: params.search, mode: "insensitive" } },
    ];
  }

  if (params.id && params.id.length > 0) {
    where.id = { in: params.id };
  }

  if (params.unread !== undefined) {
    where.unread = params.unread === "true";
  }

  if (params.archived !== undefined) {
    where.archived = params.archived === "true";
  }

  if (params.favorite !== undefined) {
    where.favorite = params.favorite === "true";
  }

  if (params.important !== undefined) {
    where.important = params.important === "true";
  }

  return where;
}

/**
 * Function to delete notifications associated with contacts based on the provided where clause.
 * @param where
 */
export async function deleteNotifications(where: any = {}) {
  const contactsDel = await prisma.contact.findMany({
    where,
    include: {
      notification: true,
    },
  });

  for (const contact of contactsDel) {
    await prisma.notifications.delete({
      where: {
        id: contact.notification?.id,
      },
    });
  }
}
