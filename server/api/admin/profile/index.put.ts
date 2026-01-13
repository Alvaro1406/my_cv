import jwt from "jsonwebtoken";
import { prisma } from "~~/server/utils/prisma";
import { validationEmail } from "~~/server/utils/validations";
import { uploadImage } from "~~/server/utils/upImage";
import { deleteImage } from "~~/server/utils/delImage";

export default defineEventHandler(async (event) => {
  try {
    /**
     * Token verification
     */
    const token = getCookie(event, "auth-token");
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: "No autorizado",
      });
    }

    /**
     * Decoding the token
     */
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "your-secret-key"
    ) as any;

    // Get data from the form data
    const formData = await readMultipartFormData(event);
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "No se han proporcionado datos",
      });
    }

    const firstName = formData
      .find((field) => field.name === "firstName")
      ?.data.toString();
    const lastName = formData
      .find((field) => field.name === "lastName")
      ?.data.toString();
    const phoneNumber = formData
      .find((field) => field.name === "phoneNumber")
      ?.data.toString();
    const email = formData
      .find((field) => field.name === "email")
      ?.data.toString();
    const username = formData
      .find((field) => field.name === "username")
      ?.data.toString();
    const image = formData.find((field) => field.name === "image")?.data;

    // Upload the image if it exists
    let upImage = null;
    if (image) {
      upImage = await uploadImage(event, "profile");
      const userImage = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { image: true },
      });
      if (userImage?.image) {
        deleteImage(userImage?.image);
      }
    }

    /**
     * Validations
     */
    // Required fields
    if (!firstName || !lastName || !phoneNumber || !email || !username) {
      throw createError({
        statusCode: 400,
        statusMessage:
          "Los campos username, firstName, lastName, email y phoneNumber son obligatorios",
      });
    }

    // Username validation
    const userWithSameName = await prisma.user.findFirst({
      where: {
        username: username,
        NOT: { id: decoded.userId },
      },
    });

    if (userWithSameName) {
      throw createError({
        statusCode: 409,
        statusMessage: "El nombre de usuario ya está en uso por otra cuenta",
      });
    }

    // Email validation
    const userWithSameEmail = await prisma.user.findFirst({
      where: {
        email: email,
        NOT: { id: decoded.userId },
      },
    });

    if (userWithSameEmail) {
      throw createError({
        statusCode: 409,
        statusMessage: "El correo electrónico ya está en uso",
      });
    }

    // Email format validation
    if (!validationEmail(email)) {
      throw createError({
        statusCode: 400,
        statusMessage: "El correo electrónico no es válido",
      });
    }

    /**
     * Updating user profile
     */
    const updateUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        username,
        firstName,
        lastName,
        email,
        phoneNumber,
        image: upImage ? upImage?.images[0] : undefined,
      },
      select: {
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        image: true,
      },
    });

    return {
      success: true,
      data: updateUser,
      message: "Usuario actualizado exitosamente",
    };
  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }

    console.error("Error updating profile:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error del servidor al actualizar el perfil",
    });
  }
});
