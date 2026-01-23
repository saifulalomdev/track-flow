# 📊 trackFlow: High-Performance Analytics Engine

**trackFlow** is a modern, lightweight web analytics platform designed to turn raw visitor data into actionable insights without the bloat of traditional tracking scripts. Built with a focus on speed, responsive design, and type-safe data management.

## 🚀 Technical Stack

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Fully Responsive)
* **Database:** [PostgreSQL](https://www.postgresql.org/)
* **ORM:** [Drizzle ORM](https://orm.drizzle.team/) (TypeScript-first)
* **Authentication:** [Clerk](https://clerk.com/) / [NextAuth.js](https://next-auth.js.org/)
* **Payments:** [Stripe API](https://stripe.com/)
* **UI Components:** [shadcn/ui](https://ui.shadcn.com/)

## ✨ Key Features

* **Real-time Dashboard:** Monitor unique visitors, conversion rates, and trending traffic.
* **UTM Campaign Builder:** Generate and track custom marketing URLs effortlessly.
* **Responsive UI:** Optimized experience for mobile, tablet, and small-screen desktops.
* **Type-Safe Database:** Leveraging Drizzle ORM for lightning-fast, type-safe PostgreSQL queries.
* **Subscription Management:** Integrated Stripe checkout for Pro and Team plan scaling.

## 🛠️ Database Architecture

We use **Drizzle ORM** to ensure the highest level of type safety between our PostgreSQL schema and the Next.js frontend.

### Core Schema Logic:

* **Users/Profiles:** Manages subscription tiers and account limits.
* **Campaigns:** Tracks UTM parameters and performance metrics per link.
* **Visitor Logs:** Stores high-frequency clickstream data optimized for analytical queries.

## ⚙️ Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/saifulalomdev/track-flow.git
cd trackflow

```


2. **Install dependencies:**
```bash
npm install

```


3. **Environment Variables:**
Create a `.env` file and add your credentials:
```env
DATABASE_URL=postgres://user:password@host:port/db
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

```


4. **Database Migration:**
Push your schema to PostgreSQL using Drizzle Kit:
```bash
npx drizzle-kit push

```


5. **Run Development Server:**
```bash
npm run dev

```



## Case Study

During the development of **trackFlow**, I focused on solving the "Empty State" problem by creating an intuitive onboarding flow for new users. I also tackled the challenge of **fluid typography** and **absolute-positioned background optimizations**, ensuring the platform remains performant and visually stunning on any device size.

---

**Developed with ❤️ by Saiful Alom**

Would you like me to help you write the specific **Drizzle Schema code** for your `campaigns` and `visitors` tables now?