import { Schema, models, model } from "mongoose";

export type ProjectCategory = "backend" | "full-stack" | "devops" | "other";

export interface IProject {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  category: ProjectCategory;
  techStack: string[];
  imageUrl?: string;
  imagePublicId?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: { type: String, required: true, maxlength: 500 },
    content: { type: String, maxlength: 20000 },
    category: {
      type: String,
      required: true,
      enum: ["backend", "full-stack", "devops", "other"],
      default: "other",
    },
    techStack: { type: [String], default: [] },
    imageUrl: { type: String },
    imagePublicId: { type: String },
    githubUrl: { type: String },
    liveUrl: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default models.Project || model<IProject>("Project", ProjectSchema);
