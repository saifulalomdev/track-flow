// src/providers/session-provider.tsx
"use client";

import { createContext, useContext, ReactNode } from "react";
import { auth } from "@/lib/auth"; // Import your auth config

// Use Better Auth's inference to get the User type
type User = typeof auth.$Infer.Session.user;

interface SessionContextType {
  user: User | undefined;
  isSignedIn: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ 
  children, 
  user 
}: { 
  children: ReactNode; 
  user: User | undefined; // Use the inferred type here
}) {
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