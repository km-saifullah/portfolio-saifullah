import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import Blog from "@/models/Blog";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Blogs from "@/components/Blogs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import type { IProject } from "@/models/Project";
import type { IBlog } from "@/models/Blog";

export const dynamic = "force-dynamic";

async function getData() {
  await connectDB();

  const [projects, blogs] = await Promise.all([
    Project.find({}).sort({ order: 1, createdAt: -1 }).lean(),
    Blog.find({ published: true }).sort({ createdAt: -1 }).limit(6).lean(),
  ]);

  return {
    projects: JSON.parse(JSON.stringify(projects)) as IProject[],
    blogs: JSON.parse(JSON.stringify(blogs)) as IBlog[],
  };
}

export default async function Home() {
  const { projects, blogs } = await getData();

  return (
    <>
      <Navbar />

      <main className="flex-1">
        <Hero />

        <Skills />

        <Experience />

        <Projects projects={projects} />

        <Blogs blogs={blogs} />

        <Contact />
      </main>

      <Footer />
    </>
  );
}
