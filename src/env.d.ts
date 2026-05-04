/// <reference types="astro/client" />

export {};

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
}