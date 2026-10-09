import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import Blog from "@/models/Blog";
import Certification from "@/models/Certification";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Blogs from "@/components/Blogs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import type { IProject } from "@/models/Project";
import type { IBlog } from "@/models/Blog";
import type { ICertification } from "@/models/Certification";

export const dynamic = "force-dynamic";

async function getData() {
  await connectDB();

  const [projects, blogs, certifications] = await Promise.all([
    Project.find({}).sort({ order: 1, createdAt: -1 }).lean(),
    Blog.find({ published: true }).sort({ createdAt: -1 }).limit(6).lean(),
    Certification.find({}).sort({ featured: -1, createdAt: -1 }).lean(),
  ]);

  return {
    projects: JSON.parse(JSON.stringify(projects)) as IProject[],
    blogs: JSON.parse(JSON.stringify(blogs)) as IBlog[],
    certifications: JSON.parse(
      JSON.stringify(certifications),
    ) as ICertification[],
  };
}

export default async function Home() {
  const { projects, blogs, certifications } = await getData();

  return (
    <>
      <Navbar />

      <main className="flex-1">
        <Hero />

        <Skills />

        <Experience />

        <Projects projects={projects} />

        <Certifications certifications={certifications} />

        <Blogs blogs={blogs} />

        <Contact />
      </main>

      <Footer />
    </>
  );
}
