import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v6 } from "uuid";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY ?? "",
  },
});

export const uploadFile = async ({
  fileName = v6(),
  fileExt,
  file,
  folderPath,
}: {
  fileName?: string;
  fileExt?: string;
  file: File;
  folderPath?: string;
}) => {
  try {
    const key = folderPath
      ? `${folderPath.replace(/^\/+|\/+$/g, "")}/${fileName}.${fileExt}`
      : fileName + "." + fileExt;

    const sendRes = await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET,
        Key: key,
        Body: file,
      })
    );
    const meta = sendRes.$metadata;

    if (meta.httpStatusCode !== 200)
      throw new Error(
        `Error uploading file, with status: ${meta.httpStatusCode}`
      );

    return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/${key}`;
  } catch (err) {
    console.error(err);
  }
};
