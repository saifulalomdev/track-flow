# Waitlist Flow

A high-performance, backend-first waitlist engine built for the modern web. This project isn't just a landing page; it's a demonstration of **production-grade engineering** using a cloud-agnostic, edge-native stack.

## Why I Built This

Most waitlist scripts are bloated third-party embeds that slow down page performance and sacrifice data privacy. I built **Waitlist Flow** to reclaim control over the data pipeline, ensuring sub-100ms response times and total architectural transparency.

## Why It Matters

In the era of "AI-hype" and rapid product launches, your first point of contact with a user—the waitlist—should be the fastest part of your app.

* **Zero Latency:** Built on Cloudflare’s Edge network.
* **Architecture First:** Follows a clean, modular structure that is easy to scale into a full product.
* **Ownership:** Your data stays in your D1 instance, not a third-party CRM.

## Tech Stack

* **Framework:** [Astro 5.0](https://astro.build/) (SSR Mode)
* **Frontend:** [React](https://react.dev/) + [Shadcn UI](https://ui.shadcn.com/)
* **Database:** [Cloudflare D1](https://developers.cloudflare.com/d1/) (Edge SQLite)
* **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
* **Validation:** [Zod](https://zod.dev/)
* **Deployment:** GitHub Actions + Cloudflare Pages

---

## Architectural Decisions

### Why not Next.js?

While Next.js is powerful, it often comes with significant "framework overhead." For a performance-critical entry point like a waitlist:

* **Astro** delivers zero (or minimal) JavaScript by default.
* Astro’s new **Actions API** provides a more type-safe and lightweight way to handle server-side logic compared to Next.js Server Actions in a distributed edge environment.
* **Ship less, run faster.**

### Why not Express?

Express is a classic, but it wasn't built for the **Edge**.

* **Cold Starts:** Express requires a traditional Node.js runtime, which has slower cold starts compared to V8 isolates.
* **Hono/Astro standard:** By using Astro with the Cloudflare adapter, we leverage the **Web Standard APIs** (Request/Response) used by Workers, making the app significantly faster and cheaper to scale.

## Getting Started

1. **Clone & Install**
```bash
git clone https://github.com/saifulalomdev/waitlist.git
pnpm install

```


2. **Database Setup**
```bash
pnpm wrangler d1 migrations apply DB --local

```


3. **Development**
```bash
pnpm run dev

```