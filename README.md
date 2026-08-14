# Khaled Md Saifullah | Portfolio

A modern, minimal, animated portfolio built with Next.js (App Router), MongoDB,
Cloudinary, and a password-protected dashboard for managing projects and blog
posts.

## Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling / animation:** Tailwind CSS v4, Framer Motion
- **Database:** MongoDB Atlas via Mongoose
- **Auth:** NextAuth (Auth.js) v5
- **Image uploads:** Cloudinary
- **Email:** Nodemailer over Gmail SMTP
- **Validation:** Zod on both the client form and every API route

## 1. Prerequisites

### MongoDB Atlas

1. Atlas dashboard → **Database** → **Connect** → **Drivers** → copy the
   connection string.
2. Create a **dedicated database user** (Database Access) with a strong,
   generated password
3. Under **Network Access**, add the IP addresses of vm on deployment

### Cloudinary

From your Cloudinary console: **Cloud name**, **API Key**, **API Secret**

### Gmail SMTP

1. Enable **2-Step Verification** on the Gmail account that will send mail
2. Generate an **App Password**
3. Use that account as `GMAIL_USER` / `GMAIL_APP_PASSWORD`. Set
   `CONTACT_RECEIVER_EMAIL` to wherever you actually want messages to land

## 2. Local setup

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

| Variable                                                                 | Where it comes from                              |
| ------------------------------------------------------------------------ | ------------------------------------------------ |
| `MONGODB_URI`                                                            | MongoDB Atlas connection string                  |
| `AUTH_SECRET`                                                            | `openssl rand -base64 32`                        |
| `ADMIN_SETUP_SECRET`                                                     | Secret required by the first-admin bootstrap API |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Cloudinary console                               |
| `GMAIL_USER` / `GMAIL_APP_PASSWORD`                                      | Gmail App Password step above                    |
| `CONTACT_RECEIVER_EMAIL`                                                 | Inbox that should receive contact form messages  |
| `NEXT_PUBLIC_SITE_URL`                                                   | Your deployed domain (used for metadata/SEO)     |

Run the server

```bash
npm run dev
```

Visit `http://localhost:3000` for the public site and
`http://localhost:3000/dashboard/login` to sign in and start adding
projects/blog posts.

## 3. Project structure

```
src/
  app/
    page.tsx                 Home (Hero, Experience, Projects, Blogs, Contact)
    blogs/[slug]/page.tsx     Public blog post page
    dashboard/
      login/page.tsx          Admin login (outside the protected route group)
      (protected)/            Everything below requires an admin session
        layout.tsx             Sidebar shell
        page.tsx                Overview
        projects/               List / new / edit
        blogs/                  List / new / edit
    api/
      auth/[...nextauth]/      NextAuth handler
      contact/                 Sends email via Nodemailer
      projects/, blogs/        Public GET, admin-only POST/PUT/DELETE
      upload/                  Issues signed Cloudinary upload params
  components/                 Public site UI + dashboard/ subfolder for admin UI
  lib/                        mongodb, auth, cloudinary, mailer, validation, rateLimit
  models/                     Mongoose schemas (Project, Blog)
  data/experience.ts          Hardcoded experience timeline content
scripts/generate-admin-hash.mjs   CLI to hash your admin password
```
