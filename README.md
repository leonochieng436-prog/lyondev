# LYONDEV – Next.js 15 agency website + admin CMS

## 1. First-time setup (local)
1. `cp .env.example .env` and fill in:
   | Variable | Purpose |
   |---|---|
   | `DATABASE_URL` | Neon/Supabase Postgres URL (add `?sslmode=require`) |
   | `AUTH_SECRET` | `openssl rand -base64 32` |
   | `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` | first ADMIN account (use a strong password, change it after login) |
   | `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` locally, your real domain in production |
   | `RESEND_API_KEY`, `EMAIL_FROM`, `ADMIN_NOTIFY_EMAIL` | inquiry and password-reset emails (optional; without them reset links print in the server console) |
   | `CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET` | image uploads in Admin → Media (optional) |
2. `npm install`
3. `npx prisma generate` then `npx prisma migrate dev --name init`
4. `npm run seed` (safe to re-run; it never overwrites existing content)
5. `npm run dev` → site `http://localhost:3000`, admin `http://localhost:3000/admin/login`

## 2. If something does not work (read this first)
This code was written without a live database or `prisma generate` available, so expect to run through these checks once:
- **`Module '@prisma/client' has no exported member …` or many "implicitly has an 'any' type" errors** → run `npx prisma generate`. These errors disappear once the client exists.
- **`prisma validate` / migrate errors** → run `npx prisma validate` and fix the line it names in `prisma/schema.prisma`. If you changed a model, run `npx prisma migrate dev --name <change>`.
- **Type errors after upgrading** → run `npx tsc --noEmit`. Next 15 / React 19 notes: `cookies()`, `params` and `searchParams` are Promises (already handled); forms use `useActionState` from `react`.
- **`npm install` peer-dependency conflicts** → `npm install --legacy-peer-deps`.
- **Cannot log in** → confirm `npm run seed` ran with `SEED_ADMIN_EMAIL`/`SEED_ADMIN_PASSWORD` set; the login cookie is `secure` only in production, so plain `http://localhost` works. Five wrong passwords lock the account for 15 minutes (clear `lockedUntil`/`failedAttempts` in `npx prisma studio`).
- **Blank homepage sections** → they read from the database. Run the seed, then publish content in Admin.
- **Build fails on Vercel** → make sure all env vars are set for Production and the build command is `npm run build` (it runs `prisma generate`). Run `npx prisma migrate deploy` against the production database once.
- **ESLint `no-img-element` warnings** → images use plain `<img loading="lazy">`; switch to `next/image` with `sizes` later if you want.

## 3. Using the admin (`/admin/login`)
Roles (enforced on the server with `requirePerm()` in every page and action): **ADMIN** everything · **EDITOR** content (services, pricing, add-ons, portfolio, solutions, testimonials, insights, media) · **SALES** inquiries, quotes, consultations.
- **Settings** (ADMIN): company name, tagline, about/vision/mission/values, phone, socials, Google Analytics ID, FAQ JSON, and address. A physical address is hidden from the public site unless `addressPubliclyVerified` is explicitly set to `true` after verification.
- **Privacy requests** (ADMIN only): review and update the status of requests submitted through `/privacy-request`. Keep request details confidential and follow the approved verification and response process.
- **Pricing / Add-ons**: edit packages and calculator add-ons; features are one per line. The calculator at `/request-quote` and `/pricing` read these.
- **Portfolio**: tick "Demonstration project" for placeholders (labelled on the site); only add real results you can verify.
- **Testimonials**: set Status to PUBLISHED only for real, approved statements.
- **Insights**: blank line = new paragraph; publish date is set automatically on first publish.
- **Hours** (ADMIN): consultation availability per weekday (minutes from midnight). With no rows, Mon–Fri 09:00–17:00 is used. Times are Africa/Nairobi.
- **Consultations**: confirming a slot that overlaps another confirmed one is rejected.
- **Quotes**: enter the inquiry reference (e.g. `LD-A1B2C3`), a quote number, a valid-until date (14 days) and items as `description | qty | unit price`.
- **Media**: needs the Cloudinary variables; copy the uploaded URL into any "image URL" field.
- **Password reset**: `/admin/forgot` (link valid 1 hour).

## 4. Adjusting and extending
- **Add or change a field in an admin form**: edit `src/lib/resources.ts` (the form is generated from it) and the matching model in `prisma/schema.prisma`, then `npx prisma migrate dev`.
- **Add a new admin section**: add a model, add an entry to `RES` in `resources.ts`, and a link in the `NAV` array in `src/app/admin/layout.tsx`.
- **Change brand colours/fonts**: `src/app/globals.css` design tokens and `tailwind.config.ts` (colors `navy, ink, brand, cyan`); fonts are in `src/app/layout.tsx` (Manrope/Inter).
- **Change navigation/footer**: `src/app/(public)/layout.tsx`.
- **Static homepage copy** (hero, "How we work", "Why choose us") lives in `src/app/(public)/page.tsx`; everything else comes from the database.
- **Clearing an optional text field**: leaving an optional text box empty keeps the old value. Replace it with a space-free new value, or clear it in `npx prisma studio`.
- **Email**: inquiry and reset emails use the Resend REST API in `src/app/(public)/contact/actions.ts` and `src/app/admin/forgot/actions.ts`. Verify your sending domain in Resend and set `EMAIL_FROM` to an address on it. Consultation emails are not wired up yet.

## 5. Deploy to Vercel
1. Push to GitHub and import the repo in Vercel.
2. Add all env vars (Production), with `NEXT_PUBLIC_SITE_URL` set to your domain.
3. Deploy, then run `npx prisma migrate deploy` and `npm run seed` against the production `DATABASE_URL` from your machine.
4. Submit `https://YOUR-DOMAIN/sitemap.xml` in Google Search Console and enable Neon/Supabase automated backups.

## 6. Known gaps and security notes
- Rate limiting is per-email for inquiries and lockout-based for login; add an edge rate limiter (e.g. Upstash) before heavy traffic. Add Turnstile/reCAPTCHA if spam appears.
- `sitemap.xml` includes published services, non-demo portfolio projects, published insights and industry pages. Demo projects are excluded from indexing and the sitemap.
- No inquiry notes UI, no email on consultation status changes, no bulk actions or table sorting, no line-by-line quote PDF export.
- File uploads are limited to JPG/PNG/WebP up to 5 MB with signature checks; the Server Action request limit is 6 MB to accommodate them. Documents/attachments on the quote form are not implemented.
- Test every flow once on staging before launch: login and each role, inquiry, quote wizard, consultation booking, password reset, media upload, mobile menu.

## 7. SEO and local search
- Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin (including `https://`, without a path) before deploying. It is used for canonical metadata, structured data and sitemap URLs.
- Page titles and descriptions are defined in the App Router pages. Service landing-page titles, descriptions, FAQs and supporting copy are keyed by existing service slugs in `src/lib/seo.ts`; preserve those slugs when editing published services.
- SEO copy does not create CMS service records. If eCommerce or API Development is missing from the live service list, run the safe seed and publish those service entries before expecting their landing pages to appear.
- A generated LYONDEV-branded Open Graph image is served at `/opengraph-image`. No unverified address, business phone, logo asset or third-party verification token is emitted as structured data.
- After launch, manually verify the domain in Google Search Console and submit `https://YOUR-DOMAIN/sitemap.xml`. Monitor indexing and technical reports; submission does not guarantee indexing or rankings.
- Google Business Profile setup and verification are manual. Create or update a profile only if the business meets Google's eligibility rules, and use accurate business details and genuine service areas. Do not invent a storefront or street address.
- To make GA4 available, enter the real `G-...` measurement ID in Admin → Settings. The GA script and analytics events remain disabled until a visitor opts into Analytics; form values are not sent as analytics event data. Search performance and ranking are not guaranteed.

## 8. Legal drafts, cookies, and privacy requests
- The pages under `/legal` and the `/privacy-request` workflow are drafts for LYONDEV and Kenyan advocate review. Do not describe them as approved policies or claim legal compliance until the internal [review checklist](./docs/legal-review-checklist.md) is completed and recorded.
- Apply `prisma/migrations/20261126100000_legal_privacy_consent` with `npx prisma migrate deploy` before deploying the privacy-request queue and newsletter consent changes. Regenerate Prisma Client as part of the build/deploy process. On Windows, stop/restart the local development server before regenerating if it locks the Prisma engine DLL.
- Cookie preferences default to necessary-only. Google Analytics loads only after Analytics consent; the optional map embed loads only after Functional consent. Use the footer's Cookie settings control to review or withdraw optional choices.
- Newsletter opt-in records its consent timestamp and privacy-notice version. Existing subscriber rows without those fields have no recorded affirmative consent and must not be treated as opted in. The current site has no newsletter sending integration; subscription removal requests should be handled through the official contact email until an unsubscribe workflow is approved.
- Confirm production providers, data regions, legal entity details, retention rules, ODPC registration applicability, and all policy language before public launch. No legal entity, physical address, registration number, or compliance status should be published without verification.
