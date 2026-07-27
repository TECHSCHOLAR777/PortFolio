"""Build the latent map data for the Selected work section.

Why PCA and not t-SNE or UMAP: there are six projects. t-SNE needs a perplexity
well below n, so at n=6 its output is noise wearing a scientific label, and any
reviewer who works with embeddings spots that immediately. PCA is a linear
projection and stays honest at this size, so that is what ships. The explained
variance it reports is printed on the page.

Run:  python scripts/embed_projects.py
Out:  content/latent-map.json
"""

from __future__ import annotations

import json
import re
from pathlib import Path

import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.decomposition import PCA

ROOT = Path(__file__).resolve().parents[1]
PROJECTS_TS = ROOT / "content" / "projects.ts"
OUT = ROOT / "content" / "latent-map.json"

MODEL = "sentence-transformers/all-MiniLM-L6-v2"
# Below this cosine, an edge says more about noise than about kinship.
EDGE_THRESHOLD = 0.30


def parse_projects() -> list[dict]:
    """Read slug, title, domain and summary straight out of the content module.

    Parsing the TypeScript keeps one source of truth. If the summaries change,
    rerunning this script is the only step needed.
    """
    source = PROJECTS_TS.read_text(encoding="utf-8")
    blocks = re.findall(
        r"slug:\s*'([^']+)'.*?title:\s*'([^']+)'.*?domain:\s*'([^']+)'.*?summary:\s*\n?\s*'((?:[^'\\]|\\.)*)'",
        source,
        re.S,
    )
    if not blocks:
        raise SystemExit("No projects parsed. Did the shape of content/projects.ts change?")

    return [
        {
            "slug": slug,
            "title": title,
            "domain": domain,
            "summary": summary.replace("\\'", "'"),
        }
        for slug, title, domain, summary in blocks
    ]


def main() -> None:
    projects = parse_projects()
    print(f"Embedding {len(projects)} project summaries with {MODEL}")

    model = SentenceTransformer(MODEL)
    vectors = model.encode(
        [p["summary"] for p in projects],
        normalize_embeddings=True,
        show_progress_bar=False,
    )

    pca = PCA(n_components=2, random_state=0)
    coords = pca.fit_transform(vectors)

    # Scale into [-1, 1] so the component can map straight to a viewBox
    # without knowing anything about the embedding magnitudes.
    span = np.abs(coords).max(axis=0)
    span[span == 0] = 1.0
    normed = coords / span

    similarity = np.clip(vectors @ vectors.T, -1.0, 1.0)

    edges = []
    for i in range(len(projects)):
        for j in range(i + 1, len(projects)):
            value = float(similarity[i][j])
            if value >= EDGE_THRESHOLD:
                edges.append({"source": projects[i]["slug"], "target": projects[j]["slug"], "cosine": round(value, 3)})

    payload = {
        "model": MODEL,
        "reducer": "PCA",
        "note": "Six project summaries embedded, then linearly projected to two dimensions.",
        "explainedVariance": [round(float(v), 4) for v in pca.explained_variance_ratio_],
        "edgeThreshold": EDGE_THRESHOLD,
        "nodes": [
            {
                "slug": p["slug"],
                "title": p["title"],
                "domain": p["domain"],
                "x": round(float(normed[i][0]), 4),
                "y": round(float(normed[i][1]), 4),
            }
            for i, p in enumerate(projects)
        ],
        "edges": sorted(edges, key=lambda e: -e["cosine"]),
    }

    OUT.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")

    pc1, pc2 = payload["explainedVariance"][0], payload["explainedVariance"][1]
    print(f"PC1 {pc1:.1%}  PC2 {pc2:.1%}  (total {pc1 + pc2:.1%})")
    print(f"{len(edges)} edges above cosine {EDGE_THRESHOLD}")
    print(f"Wrote {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
