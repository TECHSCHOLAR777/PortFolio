"""Create a soft alpha matte for the portfolio portrait.

The source is a monochrome studio headshot on a near-white background. Rather
than treating every bright pixel as background, this script removes only bright
pixels connected to the top and side edges. That protects the face, shirt, and
other light details enclosed by the subject silhouette.
"""

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "pp.jpeg"
OUTPUT = ROOT / "public" / "rishi-portrait-matte.png"


def create_matte(source: Path, output: Path) -> None:
    image = Image.open(source).convert("RGB")
    rgb = np.asarray(image, dtype=np.uint8)
    height, width, _ = rgb.shape

    luminance = (
        rgb[:, :, 0].astype(np.float32) * 0.2126
        + rgb[:, :, 1].astype(np.float32) * 0.7152
        + rgb[:, :, 2].astype(np.float32) * 0.0722
    )
    chroma = rgb.max(axis=2).astype(np.int16) - rgb.min(axis=2).astype(np.int16)
    can_be_background = (luminance >= 239) & (chroma <= 18)

    background = np.zeros((height, width), dtype=np.uint8)
    queue: deque[tuple[int, int]] = deque()

    def enqueue(x: int, y: int) -> None:
        if background[y, x] or not can_be_background[y, x]:
            return
        background[y, x] = 255
        queue.append((x, y))

    # The suit fills the lower image edge, so seeding the bottom would risk
    # erasing the bright shirt. Top and side connectivity is sufficient.
    for x in range(width):
        enqueue(x, 0)
    for y in range(height):
        enqueue(0, y)
        enqueue(width - 1, y)

    while queue:
        x, y = queue.popleft()
        if x > 0:
            enqueue(x - 1, y)
        if x + 1 < width:
            enqueue(x + 1, y)
        if y > 0:
            enqueue(x, y - 1)
        if y + 1 < height:
            enqueue(x, y + 1)

    background_image = Image.fromarray(background, mode="L")
    feathered_background = background_image.filter(ImageFilter.GaussianBlur(1.15))
    alpha = 255 - np.asarray(feathered_background, dtype=np.uint8)

    # Clean tiny compression islands in the white field without changing the
    # connected subject. The alpha floor also prevents invisible JPEG residue.
    alpha[(background == 255) & (alpha < 18)] = 0

    rgba = np.dstack((rgb, alpha))
    output.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(rgba, mode="RGBA").save(output, optimize=True)

    included = np.count_nonzero(alpha > 48) / alpha.size
    print(f"Saved {output} ({width}x{height}, subject coverage {included:.1%})")


if __name__ == "__main__":
    create_matte(SOURCE, OUTPUT)
