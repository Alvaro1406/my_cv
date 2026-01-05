// Import necessary modules
import { randomUUID } from "crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadImage(event: any, folderName: string) {
  try {
    // Get AWS configuration from environment variables
    const supaBaseRegion = process.env.SUPA_BASE_REGION;
    const supaBaseBucketName = process.env.SUPA_BASE_BUCKET_NAME;
    const supaBaseAccessKey = process.env.SUPA_BASE_KEY;
    const supaBaseEndpoint = process.env.SUPA_BASE_API;
    const supaBasePublicUrl = process.env.SUPA_BASE_PUBLIC_URL;
    const supaBaseSecretAccessKey = process.env.SUPA_BASE_SECRET_KEY;

    // Validate configuration
    if (
      !supaBaseRegion ||
      !supaBaseBucketName ||
      !supaBaseAccessKey ||
      !supaBaseSecretAccessKey ||
      !supaBaseEndpoint
    ) {
      throw createError({
        statusCode: 500,
        statusMessage: "AWS configuration missing",
      });
    }

    // Initialize S3 client
    const s3Client = new S3Client({
      forcePathStyle: true,
      region: supaBaseRegion,
      endpoint: supaBaseEndpoint,
      credentials: {
        accessKeyId: supaBaseAccessKey,
        secretAccessKey: supaBaseSecretAccessKey,
      },
    });

    // Parse form data
    const formData = await readMultipartFormData(event);

    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "No files provided",
      });
    }

    const uploadedImages: string[] = [];

    // Process each file - handle both 'images' and 'file' field names
    for (const field of formData) {
      if (
        (field.name === "images" ||
          field.name === "file" ||
          field.name === "image") &&
        field.type?.startsWith("image/")
      ) {
        const file = field.data;
        const filename = field.filename || `image-${randomUUID()}`;

        // Ensure filename has proper extension (keep original or default to webp)
        const fileExtension =
          filename.split(".").pop()?.toLowerCase() || "webp";
        const uniqueFilename = `${folderName}/${randomUUID()}.${fileExtension}`;

        // Upload to S3
        const command = new PutObjectCommand({
          Bucket: supaBaseBucketName,
          Key: uniqueFilename,
          Body: file,
          ContentType: field.type,
        });

        await s3Client.send(command);

        // Generate public URL
        const publicUrl = `${supaBasePublicUrl}/${supaBaseBucketName}/${uniqueFilename}`;
        uploadedImages.push(publicUrl);
      }
    }

    // Check if any images were uploaded
    if (uploadedImages.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "No valid images found in upload",
      });
    }

    return {
      success: true,
      images: uploadedImages,
      message: {
        es: "Imágenes subidas correctamente",
        en: "Images uploaded successfully",
      },
    };
  } catch (error: any) {
    console.error("Upload error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "Upload failed",
    });
  }
}
