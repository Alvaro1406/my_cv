import { getUserFromSession } from "~~/server/utils/auth";

export default defineEventHandler(async (event) => {
  const user = await getUserFromSession(event);

  try {
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "No autorizado",
      });
    }

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error("Error getting profile:", error);
    throw error;
  }
});
