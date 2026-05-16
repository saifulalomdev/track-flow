# TrackFlow

TrackFlow is a privacy-first web analytics platform hosted at [trackflow.saifulalom.com](https://trackflow.saifulalom.com). It helps website owners track visits, unique users, traffic sources, and conversions with a lightweight edge-based setup.

## What it does

TrackFlow collects website event data and turns it into a simple dashboard that shows:
- total visits
- unique visitors
- active sites
- conversion value
- traffic trends by day, week, month, and year
- traffic source breakdown
- country and platform breakdown

## Why I built it

I built TrackFlow to create a faster and simpler analytics tool for small businesses, startups, and freelance clients who need useful insights without heavy tracking scripts or expensive tooling.

## Key features

- Lightweight tracking script.
- Event ingestion from websites.
- Dashboard with site filters.
- Time range filters for week, month, and year.
- Unique visitor and session tracking.
- Traffic source, country, and platform analytics.
- Conversion tracking.
- Admin access for managing data.

## Who it is for

TrackFlow is useful for:
- freelancers building analytics or reporting tools for clients
- small businesses that want simple website insights
- startups that need lightweight dashboards
- developers who want a privacy-focused analytics solution

## How it works

1. A website loads the tracking script.
2. The script sends event data to TrackFlow.
3. The backend validates and stores the data.
4. Dashboard data is read from the database and cached for fast access.
5. The admin dashboard shows analytics for each selected site.

## Tech stack

- Astro
- React
- TypeScript
- Hono
- Cloudflare Workers
- Cloudflare D1
- Cloudflare KV
- Drizzle ORM
- GitHub Actions

## Architecture

TrackFlow is built for the Cloudflare edge environment, so it stays lightweight and fast.

- **Astro** is used for the frontend and dashboard.
- **Cloudflare D1** stores structured analytics data.
- **Cloudflare KV** is used for fast dashboard reads and cached values.
- **Drizzle ORM** provides type-safe database access.
- **Cloudflare Queues** will be used later for faster ingestion and background processing.

## Security

TrackFlow is designed with simple and practical security in mind:
- admin login protected by runtime secrets
- validation before saving event data
- separate dashboard access
- planned rate limiting for ingestion
- anonymous tracking by default unless identity is available

## Project structure

```text
src/
├── actions/       # app actions and mutations
├── components/    # UI components
├── db/            # database schema and queries
├── hooks/         # client-side logic
└── pages/         # routes and API endpoints

public/
└── pixel.js       # tracking script
```

## Local development

### Requirements
- Node.js 18+
- pnpm
- Wrangler CLI

### Setup

```bash
git clone https://github.com/saifulalomdev/track-flow.git
cd track-flow
pnpm install
pnpm run db:generate
pnpm run db:migrate
pnpm dev
```

## Deployment

TrackFlow is deployed on Cloudflare and available at:
[trackflow.saifulalom.com](https://trackflow.saifulalom.com)

## Freelance value

This project shows that I can build:
- analytics dashboards
- admin panels
- event tracking systems
- client reporting tools
- edge-deployed web apps
- database-backed business tools

## What I learned

This project helped me improve my skills in:
- backend development
- database design
- edge deployment
- analytics workflows
- product thinking
- building real-world software for businesses

## Contact

Built by Saiful Alom.

- GitHub: [saifulalomdev](https://github.com/saifulalomdev)
- Portfolio: [saifulalom.com](https://saifulalom.com)
- TrackFlow: [trackflow.saifulalom.com](https://trackflow.saifulalom.com)