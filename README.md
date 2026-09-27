# Portfolio – Muhammad Samsuddin

Single-page portfolio in German & English. React + Vite + Tailwind CSS v4 + shadcn/ui. There's no backend: all content lives in JSON files.

## Run

```bash
yarn install
yarn dev        # http://localhost:3000
yarn build      # static output in dist/ (upload anywhere: GitHub Pages, Netlify, Vercel …)
yarn preview    # serves dist/ on port 3000
```

## Edit content: `src/data/`

| File | Content |
|---|---|
| `profile.json` | name, title, contact, social links, summary, stat tiles |
| `skills.json` | skill groups (cards) |
| `experience.json` | jobs |
| `publications.json` | papers (`status`: `published` / `submitted` / `ongoing`) |
| `projects.json` | projects |
| `education.json` | degrees (with optional `thesis`) |
| `awards.json` | certificates & awards |
| `ui.json` | navigation, headings, button labels |

Rules:
- Translated text uses `{ "de": "…", "en": "…" }`. Text that's the same in both languages (names, tags) can be a plain string.
- Dates are written `"YYYY-MM"`. Set `"end": null` for something ongoing ("seit …" / "since …").
- To add an entry, copy an existing one in the same file and change it. Colours are assigned automatically.
- Icons: links take `github`, `linkedin`, `scholar`, `orcid`; skills and awards take `brain`, `eye`, `workflow`, `code`, `database`, `sigma`, `award`, `trophy` (see `src/components/icons.tsx`).
- The CV download is `public/lebenslauf.pdf`. Replace the file, or point `profile.json → cv` somewhere else.
