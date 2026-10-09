import { notFound } from "next/navigation";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Certification from "@/models/Certification";
import CertificationForm from "@/components/dashboard/CertificationForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditCertificationPage({ params }: Props) {
  const { id } = await params;
  if (!isValidObjectId(id)) notFound();

  await connectDB();
  const certification = await Certification.findById(id).lean();
  if (!certification) notFound();

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-semibold">
        Edit certification
      </h1>
      <CertificationForm
        certification={JSON.parse(JSON.stringify(certification))}
      />
    </div>
  );
}
