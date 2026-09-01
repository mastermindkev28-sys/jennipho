# Drop real photography here

The site ships with original vector illustrations so it looks finished on day
one. Real photographs will beat them every time — here's how to swap them in.

## 1. Prepare the files

Square crops, 1200 × 1200 px, saved as `.webp` (or `.jpg` at quality 80).
Keep each file under about 250 KB. Name them after the dish:

```
fire-roll.webp   baja-roll.webp   sashimi.webp   chirashi.webp
nigiri.webp      ramen.webp       lobster.webp   edamame.webp
teriyaki.webp    tempura.webp     vegas-roll.webp
room.webp        (landscape, 1600 × 1067 — the About section)
```

## 2. Point the site at them

**Signature dish cards and the hero** read the filename from `assets/js/data.js`.
Change the `img` value on a dish and add the extension handling in one place —
open `assets/js/site.js`, find:

```js
'<img src="assets/img/' + esc(it.img || "nigiri") + '.svg"'
```

and change `assets/img/` to `assets/photos/` and `.svg` to `.webp`.

**The gallery and the About image** are plain `<img>` tags in `index.html`.
Search for `assets/img/` and repoint each one.

**The hero image** is the first `<img>` in `index.html` — keep
`fetchpriority="high"` on it so it loads first.

## 3. Shot list

See `../COPY.md`, "Photography shot list" — ten shots, one afternoon, covers
every image slot on the site.

## 4. Do not

Do not pull photographs from Google, Yelp, Tripadvisor or the delivery apps.
Those images belong to the guests and photographers who took them, and using
them without permission is a copyright problem — not a hypothetical one, since
review platforms actively enforce it. Photos taken *by* the restaurant, or by a
photographer you paid, are yours to use.
