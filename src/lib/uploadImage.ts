export interface UploadResult {
  url: string;
  publicId: string;
}

export async function uploadImage(file: File): Promise<UploadResult> {
  const sigRes = await fetch("/api/upload");
  if (!sigRes.ok) {
    throw new Error("Not authorized to upload images");
  }
  const { timestamp, signature, folder, apiKey, cloudName } =
    await sigRes.json();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signature);
  formData.append("api_key", apiKey);
  formData.append("folder", folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData },
  );

  if (!uploadRes.ok) {
    throw new Error("Image upload failed");
  }

  const data = await uploadRes.json();
  return { url: data.secure_url, publicId: data.public_id };
}
