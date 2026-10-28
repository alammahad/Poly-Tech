# Poly Tech website

The marketing site for Poly Tech, built with React, TypeScript and Vite. It is
separate from the Hooply app and shares no code with it.

## Running it locally

```powershell
npm install
npm run dev       # http://localhost:5173
```

`npm run build` writes the finished site to `dist/`.

## Deploying to Vercel

Set the Vercel project's Root Directory to the repository root and use the
Vite framework preset, `npm run build` as the build command, and `dist` as the
output directory. Push the site files to the connected GitHub repository to
trigger a deployment.

The project showcase is at `/work`; `vercel.json` rewrites that route to the
Vite app so it works on direct visits and page refreshes. The old `/team` URL
redirects to the homepage.

## Editing

| What | Where |
|---|---|
| Contact email, address, booking link | `src/siteConfig.ts` |
| Text for every section (services, steps, FAQ…) | `src/content.ts` |
| Customer quotes (section stays hidden until you add one) | `testimonials` in `src/content.ts` |
| Colors, fonts and layout | `src/index.css` (colors are at the top) |
| Logo and favicon | `public/logo.png`, `public/mark.png`, `public/favicon.png` |

## Contact form email delivery

- The form sends submissions to the configured Formspree endpoint in
  `src/siteConfig.ts`; no app backend or Vercel environment variable is needed.
- In the Formspree dashboard, make sure the form delivers to
  `ai.deptpolytech@gmail.com` and that the recipient inbox is verified.
- Formspree's endpoint is public by design. Keep spam protection and recipient
  settings managed through the Formspree dashboard.
