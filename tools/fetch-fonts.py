# -*- coding: utf-8 -*-
"""Fetch the three families from Google Fonts and self-host them.
Keeps the latin, latin-ext and vietnamese subsets: the Vietnamese one
is not optional here, the menu sets category names like 'Mon Nuoc Dac
Biet' in the display face."""
import re, os, subprocess, io

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0 Safari/537.36")
URL = ("https://fonts.googleapis.com/css2"
       "?family=Archivo:wght@400;500;600"
       "&family=IBM+Plex+Mono:wght@400;500"
       "&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400"
       "&display=swap")
KEEP = {"latin", "latin-ext", "vietnamese"}
OUT = "assets/fonts"

css = subprocess.run(["curl", "-sS", "-A", UA, URL],
                     capture_output=True, text=True, check=True).stdout

blocks, sub = [], None
for chunk in re.split(r"(?=/\* [a-z-]+ \*/)", css):
    m = re.match(r"/\* ([a-z-]+) \*/", chunk.strip())
    if not m:
        continue
    sub = m.group(1)
    if sub not in KEEP:
        continue
    fam = re.search(r"font-family: '([^']+)'", chunk).group(1)
    style = re.search(r"font-style: (\w+)", chunk).group(1)
    weight = re.search(r"font-weight: ([\d ]+)", chunk).group(1).strip()
    url = re.search(r"url\((https://[^)]+\.woff2)\)", chunk).group(1)
    rng = re.search(r"unicode-range: ([^;]+);", chunk).group(1)
    slug = "%s-%s-%s-%s.woff2" % (
        fam.lower().replace(" ", ""), weight.replace(" ", ""), style, sub)
    subprocess.run(["curl", "-sS", "-o", os.path.join(OUT, slug), url], check=True)
    blocks.append((fam, style, weight, slug, rng, sub))

lines = ["/* Self-hosted so the Vietnamese diacritics are guaranteed and the",
         "   page needs no third-party request. Regenerate with",
         "   tools/fetch-fonts.py. */", ""]
for fam, style, weight, slug, rng, sub in blocks:
    lines += ["@font-face {",
              "  font-family: '%s';" % fam,
              "  font-style: %s;" % style,
              "  font-weight: %s;" % weight,
              "  font-display: swap;",
              "  src: url('%s') format('woff2');" % slug,
              "  unicode-range: %s;" % rng,
              "}"]
io.open(os.path.join(OUT, "fonts.css"), "w", encoding="utf-8").write("\n".join(lines) + "\n")

total = sum(os.path.getsize(os.path.join(OUT, b[3])) for b in blocks)
print("%d faces, %.0f KB total" % (len(blocks), total / 1024.0))
for fam in sorted({b[0] for b in blocks}):
    subs = sorted({b[5] for b in blocks if b[0] == fam})
    print("  %-16s %s" % (fam, ", ".join(subs)))
