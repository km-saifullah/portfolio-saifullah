export const SITE_NAME = "Khaled Md Saifullah";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://kmsaifullah.com";
export const SITE_DESCRIPTION =
  "Portfolio of Khaled Md Saifullah, a software engineer building backend, full-stack, and DevOps projects.";

/** Person + WebSite structured data — rendered once, on the homepage. */
export function personAndWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: SITE_NAME,
        url: SITE_URL,
        jobTitle: "Software Engineer",
        description: SITE_DESCRIPTION,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };
}

interface BlogForJsonLd {
  title: string;
  excerpt: string;
  slug: string;
  coverImageUrl?: string;
  tags: string[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

/** BlogPosting structured data — rendered on each individual blog post. */
export function blogPostingJsonLd(blog: BlogForJsonLd) {
  const url = `${SITE_URL}/blogs/${blog.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    url,
    headline: blog.title,
    description: blog.excerpt,
    ...(blog.coverImageUrl ? { image: [blog.coverImageUrl] } : {}),
    ...(blog.tags?.length ? { keywords: blog.tags.join(", ") } : {}),
    datePublished: new Date(blog.createdAt).toISOString(),
    dateModified: new Date(blog.updatedAt).toISOString(),
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
  };
}

interface ProjectForJsonLd {
  title: string;
  description: string;
  slug: string;
  imageUrl?: string;
  techStack: string[];
  liveUrl?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

/** CreativeWork structured data — rendered on each individual project page. */
export function projectJsonLd(project: ProjectForJsonLd) {
  const url = `${SITE_URL}/projects/${project.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#project`,
    url,
    name: project.title,
    description: project.description,
    ...(project.imageUrl ? { image: [project.imageUrl] } : {}),
    ...(project.techStack?.length
      ? { keywords: project.techStack.join(", ") }
      : {}),
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
    dateCreated: new Date(project.createdAt).toISOString(),
    dateModified: new Date(project.updatedAt).toISOString(),
    creator: { "@id": `${SITE_URL}/#person` },
  };
}
