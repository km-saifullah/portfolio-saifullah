"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg grid-overlay px-6">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8">
        <div className="flex items-center gap-2 mb-6">
          <Lock size={18} className="text-green-bright" />
          <h1 className="font-display text-xl font-semibold">
            Dashboard login
          </h1>
        </div>

        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="email"
              className="font-mono text-xs text-text-muted"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm outline-none focus:border-green-bright transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="font-mono text-xs text-text-muted"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm outline-none focus:border-green-bright transition-colors"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-green px-4 py-3 font-medium text-[#04140b] hover:bg-green-bright transition-colors disabled:opacity-60"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
