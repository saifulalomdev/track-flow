# 📊 TrackFlow

An edge-native, privacy-first web analytics platform engineered for zero-latency event ingestion and real-time dashboard tracking. Built entirely on top of the Cloudflare network layer.

---

## 🗺️ Table of Contents

* [🧐 What is TrackFlow?](#-what-is-trackflow)
* [🎯 Why It Matters](#-why-it-matters)
  * [For Business](#for-business)
  * [For Architecture](#for-architecture)


* [🛠️ Architectural Choices: The "Why"](#️-architectural-choices-the-why)
* [🚫 Architectural Choices: The "Why Not"](#-architectural-choices-the-why-not-levant)
* [📂 Project Structure](#-project-structure)
* [🚀 Getting Started](#-getting-started)
* [Prerequisites](#prerequisites)
* [Local Development Setup](#local-development-setup)



---

## 🧐 What is TrackFlow?

TrackFlow is a lightweight, self-hosted web analytics infrastructure that replaces heavy, cookie-based tracking setups with a high-performance, privacy-focused tracking script (`pixel.js`). It securely captures, streams, and visualizes web interaction events directly from the network edge to a localized relational datastore.

---

## 🎯 Why It Matters

### For Business

* **Unbeatable Performance Costs:** Running workloads entirely on a serverless edge environment reduces infrastructure bills down to near-zero margins at low to medium scales.
* **Flawless Core Web Vitals:** The lightweight tracking script executes asynchronously without blocking the main browser execution thread, ensuring your analytics script never degrades your site's SEO or Google Lighthouse scores.
* **Privacy Compliance by Design:** TrackFlow operates completely without persistent third-party tracking cookies, ensuring effortless alignment with modern global data privacy standards (GDPR, CCPA).

### For Architecture

* **Zero Cold Starts:** Applications deploy globally across Cloudflare's edge network, ensuring instant, sub-millisecond responses worldwide.
* **Predictable Design:** Built on top of strict, type-safe data validation contracts that catch schema anomalies before compilation, ensuring extreme system resilience.
* **Minimal Boundary Overhead:** Server actions, edge database interactions, and user interface island layouts coexist inside a single integrated repository configuration.

---

## 🛠️ Architectural Choices: The "Why"

Our technical stack is selected for maximum throughput efficiency, strict type-safety, and minimal cold-start overhead.

```
                  ┌──────────────────────────────────────────┐
                  │          Edge Network (Astro)            │
                  │   - Fast Server-Side Rendering           │
                  │   - Lightweight Client Hydration         │
                  └────────────────────┬─────────────────────┘
                                       │
                        ┌──────────────┴──────────────┐
                        ▼                             ▼
          ┌───────────────────────────┐ ┌───────────────────────────┐
          │  Ingestion Pipeline       │ │  Management Dashboard     │
          │  - `/api/events` Endpoints│ │  - Real-time Analytics    │
          │  - Low Latency Edge Workers│ │  - Site Administration    │
          └─────────────┬─────────────┘ └─────────────┬─────────────┘
                        │                             │
                        └──────────────┬──────────────┘
                                       │  (Type-Safe Queries via Drizzle)
                                       ▼
                  ┌──────────────────────────────────────────┐
                  │       Cloudflare D1 (SQLite DB)          │
                  │   - Localized Data Access at the Edge    │
                  │   - Zero Connection Pool Management      │
                  └──────────────────────────────────────────┘

```

### Why Astro?

Astro provides server-side rendering (SSR) speeds that rival static sites. Its **Islands Architecture** ensures that dashboard shell pages remain pure, lightweight HTML, while highly interactive visual panels hydrate independently. This eliminates bloated client-side framework runtime overhead.

### Why Cloudflare D1?

D1 brings native, serverless SQLite compliance directly to edge worker threads. This places your storage architecture right beside your code execution compute, completely avoiding the network round-trip delays common in centralized cloud datacenters.

### Why Drizzle ORM?

Drizzle functions as a lightweight, type-safe SQL query generator rather than a heavy, magical abstraction layer. It matches database table schemas exactly to TypeScript compiler types, allowing you to run raw SQL performance speeds without the runtime penalty.

---

## 🚫 Architectural Choices: The "Why Not Levant"

Every architectural paradigm involves explicit trade-offs. Here is why alternative industry-standard technologies were excluded from our production pipeline:

### ❌ Why Not Next.js?

Next.js features a massive framework runtime that adds unnecessary complexity and weight. It relies heavily on traditional Node.js layer APIs that frequently clash with modern V8 edge runtimes. Astro offers a leaner container footprint and native compatibility with serverless environments.

### ❌ Why Not a Separate Backend API Server?

Splitting frontend views and backend intake logic into separate microservices introduces unnecessary API communication overhead, duplicate type definitions, and complex orchestration tracking. By leveraging **Astro Actions**, frontend UI views directly trigger backend edge handlers with full type safety across network boundaries.

### ❌ Why Not PostgreSQL?

Traditional PostgreSQL databases require persistent connection pools, complex VPC network security configurations, and expensive compute sizing models. D1 scales dynamically on a serverless pricing index, eliminating connection allocation overhead at the network edge.

### ❌ Why Not Prisma?

Prisma relies on a heavy, pre-compiled Rust binary engine tool wrapper that must be initiated on start. This architecture creates significant bundle bloat and deployment limitations in V8 engine environments like Cloudflare Workers. Drizzle compiles down to pure JavaScript queries, making it much faster at the edge.

---

## 📂 Project Structure

```text
├── src/
│   ├── actions/          # Type-safe form mutations & transaction pipelines
│   ├── components/       # Composable UI primitives, layouts, & page forms
│   ├── db/               # Drizzle database schemas & edge query services
│   ├── hooks/            # Client state & fetch synchronization logic
│   └── pages/            # App view routing & analytics API ingestion endpoints
├── public/               # Static assets & asynchronous client tracking scripts (`pixel.js`)
├── wrangler.jsonc        # Cloudflare architecture distribution manifest
└── astro.config.mjs      # Astro compiler configuration lifecycle

```

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** (v18 or higher)
* **pnpm** (Preferred fast package manager)
* **Wrangler CLI** (Installed globally: `npm i -g wrangler`)

### Local Development Setup

1. **Clone and Install Dependencies:**
```bash
git clone https://github.com/saifulalomdev/track-flow.git
cd track-flow
pnpm install

```


2. **Generate Local Database Migrations:**
```bash
pnpm run db:generate
```

3. **Migrate Local Database Migrations:**
```bash
pnpm run db:migrate
```


3. **Run the Edge Development Environment:**
```bash
pnpm dev
```

Your local edge environment is now running dynamically at `http://localhost:3000`.