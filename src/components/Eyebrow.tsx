export default function Eyebrow({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-bright opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-bright" />
      </span>
      <span className="font-mono text-xs tracking-[0.2em] uppercase text-green-bright/90">
        {children}
      </span>
    </div>
  );
}
