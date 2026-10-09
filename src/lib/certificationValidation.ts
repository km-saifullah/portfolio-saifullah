import { z } from "zod";

const stringList = (maxItems: number, maxLength: number) =>
  z.array(z.string().trim().min(1).max(maxLength)).max(maxItems).default([]);

export const certificationSchema = z.object({
  title: z.string().trim().min(2, "Certificate name is too short").max(150),
  description: z
    .string()
    .trim()
    .min(10, "Description is too short")
    .max(300, "Description must be 300 characters or fewer"),

  imageUrl: z
    .string()
    .url("Please upload the certificate image")
    .refine(
      (url) => url.startsWith("https://res.cloudinary.com/"),
      "Image must be uploaded through the dashboard",
    ),
  imagePublicId: z.string().optional().default(""),
  topics: stringList(30, 120),
  technologies: stringList(25, 40),
  featured: z.boolean().default(false),
});

export type CertificationInput = z.infer<typeof certificationSchema>;
