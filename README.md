# Portfolio — Muhammad Ismayil

Astro + TypeScript. Static output, no framework runtime shipped to the browser.

```bash
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview  # serve dist/
npm run check    # typecheck
```

## Before deploying — 4 placeholders

All in **`src/site.ts`**:

| Field | Current |
|---|---|
| `email` | `hello@example.com` |
| `github` | `https://github.com/your-handle` |
| `linkedin` | `https://linkedin.com/in/your-handle` |
| `resume` | `/resume.pdf` — drop the actual file in `public/` |

Also set the real domain in `astro.config.mjs` (`site:`) so canonical/OG URLs are correct.

## Structure

```
src/
  site.ts                 identity + nav (single source of truth)
  content.config.ts       project schema
  content/projects/*.md   one file per project — frontmatter drives the diff
  layouts/Base.astro      head, fonts, theme script, shell
  components/
    Rail.astro            left sidebar nav
    Topbar.astro          breadcrumb + resume link
    Diff.astro            before/after renderer
    Stats.astro           number strip
  pages/
    index.astro           home
    work/index.astro      work index
    work/[id].astro       case page (diff + stats + prose)
    engineering.astro     principles
    about.astro           bio, history, skills
  styles/
    tokens.css            colours, type scale, spacing (light + dark)
    global.css            reset + primitives
    print.css             Cmd+P → clean document
```

## Adding a project

Create `src/content/projects/my-thing.md`:

```yaml
---
order: 7
title: My Thing
blurb: One sentence.
status: shipped        # or: research
role: Engineer
period: 2026
stack: ["C#", ".NET"]
featured: true         # true = appears on the home page
before: ["what it was"]
after:  ["what it became"]
stats:
  - value: "12x"
    label: "Faster"
    note: "measured"    # optional
---

Body copy in markdown.
```

No code changes needed — the route, index entry and diff render from this file.

## Notes on the numbers

Every figure on the site comes from the resume source document. The mockup's
`989 reports`, `50→12 min` and `92% accuracy` are **not** in that document and
were deliberately left out. If those are real and measured, add them to the
relevant project's `stats` and `after` arrays.

`~50 min` is marked `measured`; `4` workers is marked `configurable` rather than
presented as an achieved speedup, because the source describes parallel
execution as investigated rather than benchmarked.

## Deploy

Static output — any host works. Cloudflare Pages / Vercel / Netlify:

- Build command: `npm run build`
- Output directory: `dist`

## Weight

First load ≈ **113 KB** (28 KB HTML with inlined CSS + 4 latin-subset woff2).
Zero JavaScript framework runtime; the only script is the theme toggle.
