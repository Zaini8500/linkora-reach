# Linkora Reach — Agency Website

Premium, responsive website for **Linkora Reach** — guest posting, link building and digital outreach agency.
Tagline: *Building Connections. Growing Authority.*

Built with **Vite + React + Tailwind CSS** and Lucide icons. Scroll animations use IntersectionObserver
(fade / slide / zoom with stagger, a gold progress line in How It Works, a scroll-progress bar under the
header, hero parallax and a back-to-top button). `prefers-reduced-motion` is respected throughout.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview  # preview the production build
```

## Deploy to Vercel

1. Push this folder to a GitHub repo (e.g. `Zaini8500/linkora-reach`).
2. In Vercel: **Add New → Project → Import** that repo. Framework preset: **Vite**.
   Build command `npm run build`, output directory `dist` (defaults are fine).
3. Deploy. `vercel.json` already handles the SPA fallback and `/api/*` routes.

## Contact form backend — read this before going live

The form posts to `api/contact.js`, a Vercel Serverless Function. It validates all required fields
server-side. **It does not fake a save.**

- **If `RESEND_API_KEY` and `NOTIFY_EMAIL` are set**, the lead is emailed via Resend and the
  visitor sees a success message with a reference number (e.g. `LR-…`).
- **If they are NOT set**, the API returns **HTTP 503** with the error
  `Proposal form is not connected yet — email delivery is not configured`, and the form shows
  that error — never a fake success.

### Set up email delivery (Resend)

1. Create a free account at [resend.com](https://resend.com) and create an API key.
2. In Vercel: Project → **Settings → Environment Variables**, add:
   - `RESEND_API_KEY` — your Resend API key
   - `NOTIFY_EMAIL` — the inbox that should receive leads (e.g. your business email)
   - `FROM_EMAIL` — optional, defaults to `Linkora Reach <onboarding@resend.com>`.
     For production, verify your own sending domain in Resend and use an address on it.
3. Redeploy (or trigger a redeploy after adding variables).

To test locally, create a `.env.local` (never commit it) with the same variables and run
`npm run dev` — note the API route only runs on Vercel (or `vercel dev`), not plain `vite dev`.

## Placeholders — replace before presenting as final

- **Testimonials** (`src/components/Testimonials.jsx`): all three slides are clearly badged
  **“Sample Placeholder”** with generic placeholder text. They are NOT real clients, quotes or
  ratings. Replace them with genuine client testimonials before launch.
- **Contact email `hello@linkorareach.com`**: a placeholder, labelled as such on the site.
  Replace it with a real inbox once confirmed. No phone number or postal address is published.
- **Social links**: LinkedIn, Facebook and Instagram point to the platforms’ homepages.
  Replace with real profile URLs once available.
- **Domain / SEO**: `index.html` (canonical + Open Graph URL), `public/robots.txt` and
  `public/sitemap.xml` use `https://www.linkorareach.com` as a placeholder base URL.
  Replace with the real domain once confirmed.
- **Privacy Policy / Terms**: the in-page dialogs contain starter text — have them reviewed
  by a legal adviser before relying on them.

## Compliance notes

- No client logos, statistics, awards, case studies or guarantees are claimed anywhere on the site.
- No guaranteed Google rankings or traffic are promised.
- Paid editorial links: the Publisher Network section notes Google’s sponsored-link
  qualification practices (`rel="sponsored"` / `rel="nofollow"`).

## Structure

```
index.html                  SEO title, meta + Open Graph, fonts (Manrope / Inter)
public/robots.txt           public/sitemap.xml
api/contact.js              Vercel Serverless Function for the proposal form
src/App.jsx                 Page composition + back-to-top + Learn More pre-select
src/index.css               Tailwind + reveal / marquee / float animations
src/components/
  Header.jsx  Hero.jsx  NetworkVisual.jsx  Reveal.jsx
  Sections.jsx              About, Services, How It Works, Why Choose, White-label, Publisher Network
  Testimonials.jsx  Faq.jsx  Contact.jsx  Footer.jsx
```
