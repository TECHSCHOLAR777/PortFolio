# rishi-garg-portfolio

Portfolio for Rishi Garg, laid out as a model card.

Live at [rishigarg.vercel.app](https://rishigarg.vercel.app)

## What this is

The page is structured the way a model card is: architecture, training data,
pretraining, fine tuning, eval results, and limitations. That framing is not a
decoration, it maps onto the sections a portfolio needs anyway, and it makes the
limitations section a natural part of the document rather than an omission.

## The rule that governs the content

Every number on this site traces to one of three sources:

1. the resume PDFs in `public/`
2. `RESULTS_AND_CONCLUSIONS.md` from the PT-JEPA training run
3. a live API, read at request time

Where a quantity was never measured, the eval table prints how it was stated
instead of inventing a method. PT-JEPA is the only project whose training logs
were retained, so it is the only project with a chart. Five other projects show
eval tables with `not measured` rows rather than a plausible looking curve.

## Stack

- Next.js 15, React 19, TypeScript
- Tailwind v4 with shadcn/ui, one component library, no bespoke component CSS
- `@paper-design/shaders-react` for the hero shader
- Recharts for the single training chart
- Web3Forms for the contact form, so there is no backend to keep awake

## Notable pieces

| Path | What it does |
| --- | --- |
| `components/training/progress-provider.tsx` | One scroll listener for the page. Derives epoch, loss and accuracy from scroll position, with seeded jitter so the curve is not a clean exponential. |
| `components/training/epoch-bar.tsx` | Reading position drawn as a training run. Scrubs both directions, never unmounts, and its tooltip states plainly that the loss is a function of scroll rather than a measurement. |
| `components/work/latent-map.tsx` | Projects positioned by real MiniLM embeddings reduced with PCA. PCA and not t-SNE because at six points t-SNE output is noise. |
| `components/work/training-chart.tsx` | All 50 epochs from `data/ptjepa/epoch_history.csv`, unmodified. |
| `scripts/check-dashes.mjs` | Fails the build on em and en dashes anywhere in rendered content. |
| `scripts/embed_projects.py` | Regenerates `content/latent-map.json`. |

## Running it

```bash
npm install
npm run dev
```

Do not run `npm run build` while `next dev` is running. Both write to `.next`
and the dev server will start throwing `MODULE_NOT_FOUND` for vendor chunks.
If that happens, stop both, delete `.next`, and restart.

## Regenerating the latent map

```bash
python scripts/embed_projects.py
```

Requires `sentence-transformers` and `scikit-learn`. Rerun it after editing any
project `summary` field, since positions are derived from that prose.

## Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | yes, for the contact form | Web3Forms access key. Public by design, it only authorises posting to this form. |
| `GITHUB_TOKEN` | no | Raises the GitHub API rate limit. The unauthenticated limit of 60 an hour is already well above what the hourly cache needs. |

## Checks

```bash
npm run check:dashes
npm run lint
npm run build
```
