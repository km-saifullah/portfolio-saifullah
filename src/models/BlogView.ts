import { Schema, models, model, Types } from "mongoose";

export interface IBlogView {
  _id: string;
  blog: Types.ObjectId;
  visitorId: string;
  createdAt: Date;
}

const BlogViewSchema = new Schema<IBlogView>(
  {
    blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
    visitorId: { type: String, required: true, maxlength: 100 },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

BlogViewSchema.index({ blog: 1, visitorId: 1 }, { unique: true });

export default models.BlogView || model<IBlogView>("BlogView", BlogViewSchema);
