import { prisma } from "~~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  try {
    const [techMastery] = await Promise.all([
      prisma.technicalMastery.findMany(),
    ]);

    return {
      success: true,
      data: {
        techMastery,
      },
    };
  } catch (error) {
    console.error("Error getting contacts:", error);
    throw error;
  }
});
