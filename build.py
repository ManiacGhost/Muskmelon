"""Copy only the files the website needs into ./dist for Cloudflare Pages.

Leaves out the original full-size photos and video (Cloudflare Pages
rejects any file over 25 MiB) and local tooling folders.

Cloudflare Pages (connected to GitHub) build settings:
    Framework preset:        None
    Build command:           python build.py
    Build output directory:  dist
"""
import shutil
from pathlib import Path

ROOT = Path(__file__).parent
DIST = ROOT / "dist"
MAX_FILE = 25 * 1024 * 1024  # Cloudflare Pages per-file limit

FILES = ["index.html", "style.css", "script.js", "config.js", "_headers"]
FOLDERS = {
    "photos/web": {".jpg", ".jpeg", ".png", ".webp"},  # web-sized copies only
    "music": {".mp3", ".m4a", ".ogg"},
}
VIDEOS = ["videos/surprise.mp4"]  # the compressed one, not surprise-original.mp4

if DIST.exists():
    shutil.rmtree(DIST)

copied = []
for name in FILES + VIDEOS:
    src = ROOT / name
    if src.exists():
        copied.append((src, DIST / name))
for folder, exts in FOLDERS.items():
    for src in sorted((ROOT / folder).glob("*")):
        if src.suffix.lower() in exts:
            copied.append((src, DIST / folder / src.name))

total = 0
for src, dst in copied:
    size = src.stat().st_size
    if size > MAX_FILE:
        raise SystemExit(f"{src.relative_to(ROOT)} is {size / 1e6:.0f} MB — over Cloudflare's 25 MiB limit")
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)
    total += size
    print(f"  {dst.relative_to(DIST)}  ({size / 1024:,.0f} KB)")

print(f"\n{len(copied)} files, {total / 1e6:.1f} MB total -> {DIST}")
