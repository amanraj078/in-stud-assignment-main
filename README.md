# MandlacX

A full-stack incident dashboard built with Next.js 14 and Prisma. This application allows viewing and resolving security incidents recorded by cameras in various locations.

---

## Deployment Instructions

To run the project locally:

1. **Clone the repo:**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up your database:**

    - Create a `.env` file based on `.env.example`
    - Example (for NeonDB):
        ```
        DATABASE_URL="postgresql://username:password@host/dbname"
        ```

4. **Push schema and seed data:**

    ```bash
    npx prisma db push
    npx prisma db seed
    ```

5. **Generate Prisma client:**

    ```bash
    npx prisma generate
    ```

6. **Run the development server:**

    ```bash
    npm run dev
    ```

7. **Deploy to Vercel:**
    - Connect your GitHub repo to [Vercel](https://vercel.com/)
    - In the **Vercel dashboard**, add your environment variables (`DATABASE_URL`)
    - In **Build Settings**, add this command:
        ```
        prisma generate && next build
        ```

---

## Tech Decisions

-   **Framework**: Next.js 14 App Router for full-stack capabilities and simplified routing.
-   **Database**: PostgreSQL (Supabase/Neon) with Prisma ORM for type-safe queries.
-   **UI**: Tailwind CSS.
-   **Backend**: API routes using Next.js Server Functions for resolving incidents.
-   **Hosting**: Deployed on Vercel with environment variable.

---

## If I Had More Time…

-   Add authentication to restrict access to the incident dashboard.
-   Integrate real-time updates using WebSockets or polling.
-   Add dashboard analytics (resolved vs unresolved, per camera, etc).

---
