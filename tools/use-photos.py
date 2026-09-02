# -*- coding: utf-8 -*-
"""Point the site at whatever real photographs are actually present.

Scans assets/photos/ and rewrites the PHOTOS block in data.js so every
file that exists is switched on and everything else stays commented.
No hand-editing, and the site never requests a file that is not there.

    python3 tools/use-photos.py
"""
import io, os, re

os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

SLOTS = [
    ("hero",         "hero.jpg",         "1200x1200 square, homepage hero"),
    ("pho-bowl",     "pho-bowl.jpg",     "1600x1000, gallery + Pho section"),
    ("dining-room",  "dining-room.jpg",  "1000x1250 portrait, Our story"),
    ("vermicelli",   "vermicelli.jpg",   "1000x800, Vermicelli section"),
    ("storefront",   "storefront.jpg",   "1600x1000, shows in Visit"),
    ("banh-mi",      "banh-mi.jpg",      "1000x800"),
    ("spring-rolls", "spring-rolls.jpg", "1000x800"),
    ("rice-plate",   "rice-plate.jpg",   "1000x800"),
    ("drinks",       "drinks.jpg",       "1000x800"),
    ("bun-bo-hue",   "bun-bo-hue.jpg",   "1600x1000"),
]
EXTS = (".jpg", ".jpeg", ".png", ".webp")

def find(base):
    stem = os.path.splitext(base)[0]
    for e in EXTS:
        if os.path.exists(os.path.join("assets/photos", stem + e)):
            return stem + e
    return None

lines, live = [], []
for key, base, note in SLOTS:
    got = find(base)
    if got:
        lines.append('  "%s":%s"%s",%s// %s' % (
            key, " " * max(1, 15 - len(key)), got, " " * 4, note))
        live.append(key)
    else:
        lines.append('  // "%s":%s"%s",%s// %s' % (
            key, " " * max(1, 15 - len(key)), base, " " * 4, note))

block = ("const PHOTOS = {\n"
         "  /* Written by tools/use-photos.py. Drop files into assets/photos/\n"
         "     using the names below and run it again. */\n"
         + "\n".join(lines) + "\n};")

p = "assets/js/data.js"
s = io.open(p, encoding="utf-8").read()
start = s.index("const PHOTOS = {")
end = s.index("};", start) + 2
io.open(p, "w", encoding="utf-8").write(s[:start] + block + s[end:])

if live:
    print("Using %d real photo(s): %s" % (len(live), ", ".join(live)))
else:
    print("No photos found in assets/photos/. Every slot stays on its illustration.")
