import { Schema, models, model } from "mongoose";

export interface ICertification {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  imagePublicId?: string;
  topics: string[];
  technologies: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CertificationSchema = new Schema<ICertification>(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, required: true, trim: true, maxlength: 300 },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String },
    topics: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default models.Certification ||
  model<ICertification>("Certification", CertificationSchema);
