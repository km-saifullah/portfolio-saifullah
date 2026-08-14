import Link from "next/link";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Newspaper,
  ExternalLink,
} from "lucide-react";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/dashboard/SignOutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const isAdmin = (session?.user as { role?: string })?.role === "admin";

  if (!isAdmin) {
    redirect("/dashboard/login");
  }

  return (
    <div className="min-h-screen flex bg-bg">
      <aside className="w-60 shrink-0 border-r border-border p-6 hidden md:flex flex-col justify-between">
        <div>
          <p className="font-display font-semibold text-lg mb-8">
            <span className="text-green-bright">/</span>admin
          </p>
          <nav className="space-y-1 font-mono text-sm">
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-text-muted hover:text-green-bright hover:bg-surface transition-colors"
            >
              <LayoutDashboard size={16} /> Overview
            </Link>
            <Link
              href="/dashboard/projects"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-text-muted hover:text-green-bright hover:bg-surface transition-colors"
            >
              <FolderKanban size={16} /> Projects
            </Link>
            <Link
              href="/dashboard/blogs"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-text-muted hover:text-green-bright hover:bg-surface transition-colors"
            >
              <Newspaper size={16} /> Blogs
            </Link>
          </nav>
        </div>

        <div className="space-y-1 font-mono text-sm">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-text-muted hover:text-green-bright hover:bg-surface transition-colors"
          >
            <ExternalLink size={16} /> View site
          </Link>
          <SignOutButton />
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
