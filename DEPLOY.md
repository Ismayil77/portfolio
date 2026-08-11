# Deploying

Static Astro site. Build output is `dist/`. No server, no environment variables,
no database — any static host works.

**Live URL:** https://ismayil.pages.dev

---

## One-time setup

### 1. Push to GitHub

Create an **empty public** repo at https://github.com/new — name it `portfolio`.
Do **not** tick "Add a README" (the repo already has one).

Then, from `D:\Test_jb_fl`:

```bash
git remote add origin https://github.com/Ismayil77/portfolio.git
git branch -M main
git push -u origin main
```

Git will prompt for credentials. Use a **Personal Access Token**, not your
password — GitHub stopped accepting passwords in 2021.
Create one at https://github.com/settings/tokens (classic, scope: `repo`).

### 2. Connect Cloudflare Pages

1. Sign up free at https://dash.cloudflare.com (no card required)
2. **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Authorise GitHub, pick the `portfolio` repo
4. Build settings:

   | Field | Value |
   |---|---|
   | Framework preset | **Astro** |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Node version | `22` (add env var `NODE_VERSION` = `22`) |

5. **Save and Deploy** — first build takes about a minute

Every `git push` to `main` redeploys automatically. Pull requests get their own
preview URL.

### 3. Set the project name

The project name becomes the subdomain. Naming it `ismayil` gives
`https://ismayil.pages.dev`. If you pick something else, update `site` in
`astro.config.mjs` to match, or canonical and OG tags will point at the wrong
host.

---

## Adding the resume

Export the resume as PDF from Word, then:

```
public/resume.pdf
```

`src/site.ts` already points `resume` at `/resume.pdf`. Drop the file in and the
Resume link in the top bar works.

PDF rather than DOCX: it opens in-browser on every device, and the layout cannot
reflow.

---

## Attaching a custom domain later

1. Buy the domain (~$10–15/yr; `.dev` forces HTTPS, which is a nice touch)
2. Cloudflare Pages → your project → **Custom domains** → **Set up a domain**
3. Follow the DNS instructions — certificate is issued automatically
4. Change `site` in `astro.config.mjs` to the new URL and push

That last step matters: canonical tags and OG previews are generated from it.

---

## Alternative: GitHub Pages

Fewer accounts, slightly more friction. To avoid a `/repo-name` subpath the repo
must be named exactly **`Ismayil77.github.io`**, otherwise Astro needs a
`base: '/portfolio'` config and every internal link changes.

If you go this route, tell me and I will add the GitHub Actions workflow — Pages
does not build Astro on its own.

---

## Local commands

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview  # serve the built output
```
