"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/dashboard/login" })}
      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-text-muted hover:text-red-400 hover:bg-surface transition-colors"
    >
      <LogOut size={16} /> Sign out
    </button>
  );
}
