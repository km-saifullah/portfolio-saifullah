import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import BlogForm from "@/components/dashboard/BlogForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params;

  await connectDB();

  const blog = await Blog.findById(id).lean();

  if (!blog) notFound();

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-semibold">Edit post</h1>

      <BlogForm blog={JSON.parse(JSON.stringify(blog))} />
    </div>
  );
}
