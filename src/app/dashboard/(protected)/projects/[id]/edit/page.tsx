import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import ProjectForm from "@/components/dashboard/ProjectForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  await connectDB();
  const project = await Project.findById(id).lean();
  if (!project) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold mb-8">Edit project</h1>
      <ProjectForm project={JSON.parse(JSON.stringify(project))} />
    </div>
  );
}
