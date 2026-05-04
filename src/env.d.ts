// src/env.d.ts
/// <reference types="astro/client" />
import type { User, Session } from 'better-auth'

declare global {
  interface Env {
    DB: D1Database;
    USER_LIMITS: KVNamespace;
    EVENTS_QUEUE: Queue<any>;

    BETTER_AUTH_SECRET: string;
    BETTER_AUTH_URL: string;

    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
  }

  namespace App {
    interface Locals {
      user: User | null;
      session: Session | null;
      runtime: {
        env: Env;
      };
    }
  }
}

export { };