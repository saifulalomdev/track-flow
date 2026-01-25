// src/components/auth-control.tsx
"use client";

import { useSession } from "@/providers/session-provider";
import { ReactNode } from "react";

export function SignedIn({ children }: { children: ReactNode }) {
  const { isSignedIn } = useSession();
  return isSignedIn ? <>{children}</> : null;
}

export function SignedOut({ children }: { children: ReactNode }) {
  const { isSignedIn } = useSession();
  return !isSignedIn ? <>{children}</> : null;
}

export function UserButton() {
  const { user } = useSession();
  if (!user) return null;
  
  return (
    <div className="flex items-center gap-2 p-2 border rounded">
      <span className="text-sm font-medium">{user.name}</span>
      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
        {user.name[0]}
      </div>
    </div>
  );
}