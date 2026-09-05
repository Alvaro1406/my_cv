import { prisma } from "~~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  try {
    const [softSkills] = await Promise.all([prisma.softSkills.findMany()]);

    return {
      success: true,
      data: {
        softSkills,
      },
    };
  } catch (error) {
    console.error("Error getting soft skills:", error);
    throw error;
  }
});
