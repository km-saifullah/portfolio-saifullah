import { Schema, models, model } from "mongoose";

export interface IBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string;
  coverImagePublicId?: string;
  tags: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    excerpt: { type: String, required: true, maxlength: 300 },
    content: { type: String, required: true, maxlength: 50000 },
    coverImageUrl: { type: String },
    coverImagePublicId: { type: String },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default models.Blog || model<IBlog>("Blog", BlogSchema);
