import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function deleteImage(imageUrl: string) {
  try {
    // Get AWS configuration from environment variables
    const supaBaseRegion = process.env.SUPA_BASE_REGION;
    const supaBaseBucketName = process.env.SUPA_BASE_BUCKET_NAME;
    const supaBaseAccessKey = process.env.SUPA_BASE_KEY;
    const supaBaseEndpoint = process.env.SUPA_BASE_API;
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

    // Extract the key from the URL to delete it.
    const urlParts = imageUrl.split(`${supaBaseBucketName}/`);
    if (urlParts.length < 2) {
      throw new Error("Invalid image URL format");
    }
    const fileKey = urlParts[1];

    // Send command to delete
    const command = new DeleteObjectCommand({
      Bucket: supaBaseBucketName,
      Key: fileKey,
    });

    await s3Client.send(command);

    return { success: true, message: "File deleted successfully" };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false, error };
  }
}
