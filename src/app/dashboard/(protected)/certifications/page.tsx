import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Star } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import Certification from "@/models/Certification";
import DeleteButton from "@/components/dashboard/DeleteButton";

export const dynamic = "force-dynamic";

export default async function CertificationsListPage() {
  await connectDB();
  const certifications = await Certification.find({})
    .sort({ featured: -1, createdAt: -1 })
    .lean();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold">Certifications</h1>
        <Link
          href="/dashboard/certifications/new"
          className="inline-flex items-center gap-2 rounded-full bg-green px-4 py-2.5 text-sm font-medium text-[#04140b] transition-colors hover:bg-green-bright"
        >
          <Plus size={16} /> New certification
        </Link>
      </div>

      {certifications.length === 0 ? (
        <p className="mt-10 text-text-muted">No certifications yet.</p>
      ) : (
        <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-surface">
          {certifications.map((cert) => (
            <div
              key={String(cert._id)}
              className="flex items-center justify-between gap-4 px-6 py-4"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md border border-border bg-bg-alt">
                  <Image
                    src={cert.imageUrl}
                    alt={cert.title}
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {cert.featured && (
                      <Star
                        size={13}
                        className="shrink-0 text-green-bright"
                        fill="currentColor"
                      />
                    )}
                    <p className="truncate font-medium">{cert.title}</p>
                  </div>
                  <p className="mt-1 font-mono text-xs text-text-muted">
                    {cert.topics.length} topics · {cert.technologies.length}{" "}
                    technologies
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-4">
                <Link
                  href={`/dashboard/certifications/${cert._id}/edit`}
                  aria-label={`Edit ${cert.title}`}
                  className="text-text-muted transition-colors hover:text-green-bright"
                >
                  <Pencil size={16} />
                </Link>
                <DeleteButton
                  endpoint={`/api/certifications/${cert._id}`}
                  itemName={cert.title}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
