import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Enter a valid email").max(200),
  subject: z.string().trim().max(150).optional().default(""),
  message: z.string().trim().min(10, "Message is too short").max(5000),
  company: z.string().max(0, "Bot detected").optional().default(""),
});

export const projectSchema = z.object({
  title: z.string().trim().min(2).max(120),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase, numbers, hyphens only",
    ),
  description: z.string().trim().min(10).max(500),
  content: z.string().trim().max(20000).optional().default(""),
  category: z.enum(["backend", "full-stack", "devops", "other"]),
  techStack: z.array(z.string().trim().min(1).max(40)).max(20).default([]),
  imageUrl: z.string().url().optional().or(z.literal("")).default(""),
  imagePublicId: z.string().optional().default(""),
  githubUrl: z.string().url().optional().or(z.literal("")).default(""),
  liveUrl: z.string().url().optional().or(z.literal("")).default(""),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
});

export const blogSchema = z.object({
  title: z.string().trim().min(2).max(160),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(160)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase, numbers, hyphens only",
    ),
  excerpt: z.string().trim().min(10).max(300),
  content: z.string().trim().min(20).max(50000),
  coverImageUrl: z.string().url().optional().or(z.literal("")).default(""),
  coverImagePublicId: z.string().optional().default(""),
  tags: z.array(z.string().trim().min(1).max(30)).max(15).default([]),
  published: z.boolean().default(true),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type BlogInput = z.infer<typeof blogSchema>;
