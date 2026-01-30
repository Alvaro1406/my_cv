import { prisma } from "~~/server/utils/prisma";
import { validationEmail } from "~~/server/utils/validations";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      throw createError({
        statusCode: 400,
        statusMessage: "Todos los campos son obligatorios",
      });
    }

    if (!validationEmail(email)) {
      throw createError({
        statusCode: 400,
        statusMessage: "El correo electrónico no es válido",
      });
    }

    const contact = await prisma.contact.create({
      data: {
        name: name,
        email: email,
        subject: subject,
        message: message,
        unread: true,
      },
      select: {
        name: true,
        email: true,
        subject: true,
        message: true,
      },
    });

    return {
      success: true,
      data: contact,
    };
  } catch (error) {
    console.error("Error creating contact:", error);
    throw error;
  }
});
