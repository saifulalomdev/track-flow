// src/providers/session-provider.tsx
"use client";

import { createContext, useContext, ReactNode } from "react";
import { JWTPayload } from "@/db/schema/users";

const SessionContext = createContext<{
  user: JWTPayload | null;
  isSignedIn: boolean;
} | null>(null);

export function SessionProvider({ children, user }: { children: ReactNode; user: JWTPayload | null; }) {
  return (
    <SessionContext.Provider value={{ user, isSignedIn: !!user }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSession must be used within SessionProvider");
  return context;
};
