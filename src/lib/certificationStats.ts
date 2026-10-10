import { connectDB } from "@/lib/mongodb";
import Certification from "@/models/Certification";

export interface CertificationSummaryItem {
  _id: string;
  title: string;
  imageUrl: string;
  featured: boolean;
  topicsCount: number;
  technologiesCount: number;
}

export interface CertificationStats {
  total: number;

  featured: number;

  totalTopics: number;

  technologies: { name: string; count: number }[];

  recent: CertificationSummaryItem[];
}

interface CertificationDoc {
  _id: unknown;
  title: string;
  imageUrl: string;
  featured?: boolean;
  topics?: string[];
  technologies?: string[];
}

const MAX_TECHNOLOGIES = 12;

export function summarizeCertifications(
  docs: CertificationDoc[],
  recentLimit = 5,
): CertificationStats {
  const technologyCounts = new Map<string, { name: string; count: number }>();
  let featured = 0;
  let totalTopics = 0;

  for (const doc of docs) {
    if (doc.featured) featured += 1;
    totalTopics += doc.topics?.length ?? 0;

    const seen = new Set<string>();
    for (const tech of doc.technologies ?? []) {
      const key = tech.trim().toLowerCase();
      if (!key || seen.has(key)) continue;
      seen.add(key);

      const existing = technologyCounts.get(key);
      if (existing) existing.count += 1;
      else technologyCounts.set(key, { name: tech.trim(), count: 1 });
    }
  }

  const technologies = [...technologyCounts.values()]
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, MAX_TECHNOLOGIES);

  const recent = docs.slice(0, recentLimit).map((doc) => ({
    _id: String(doc._id),
    title: doc.title,
    imageUrl: doc.imageUrl,
    featured: Boolean(doc.featured),
    topicsCount: doc.topics?.length ?? 0,
    technologiesCount: doc.technologies?.length ?? 0,
  }));

  return { total: docs.length, featured, totalTopics, technologies, recent };
}

export async function getCertificationStats(
  recentLimit = 5,
): Promise<CertificationStats> {
  await connectDB();

  const docs = (await Certification.find({})
    .sort({ featured: -1, createdAt: -1 })
    .select("title imageUrl featured topics technologies")
    .lean()) as CertificationDoc[];

  return summarizeCertifications(docs, recentLimit);
}
