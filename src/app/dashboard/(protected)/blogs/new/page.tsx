import BlogForm from "@/components/dashboard/BlogForm";

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold mb-8">
        New blog post
      </h1>
      <BlogForm />
    </div>
  );
}
