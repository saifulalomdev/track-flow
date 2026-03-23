/// <reference types="astro/client" />

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}

interface Env {
  DB: D1Database;
  USER_LIMITS: KVNamespace;
  EVENTS_QUEUE: Queue<any>;
}