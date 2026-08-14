import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg grid-overlay px-6 text-center">
      <p className="font-mono text-sm text-green-bright mb-4">404</p>
      <h1 className="font-display text-3xl md:text-4xl font-semibold">
        Page not found
      </h1>
      <p className="mt-3 text-text-muted max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-green px-6 py-3 font-medium text-[#04140b] hover:bg-green-bright transition-colors"
      >
        Back home
      </Link>
    </div>
  );
}
