# Jenni Pho — website

A fast, static marketing site for **Jenni Pho**, the Vietnamese restaurant at
7855 S Rainbow Blvd, Las Vegas NV 89139.

No framework, no build step, no dependencies. Two HTML files, one stylesheet,
one script, one data file. Open `index.html` in a browser and it works.

```
index.html            Home — hero, story, signatures, reviews, gallery, ordering, hours
menu.html             Full menu, searchable and filterable, with prices
assets/css/site.css   All styles
assets/js/data.js     ← everything you will ever want to edit lives here
assets/js/site.js     Behaviour (open/closed status, menu rendering, search, filters)
assets/img/*.svg      Built-in food illustrations
assets/photos/        Drop real photography here (see its README)
```

## Editing the site

**`assets/js/data.js` is the single source of truth.** Prices, dish names,
hours, the phone number, ordering links and review quotes all live there.
Change a price in that file and it updates on the page, in the search index and
in the structured data Google reads. You do not need to touch any HTML.

### Common edits

| To change…              | Edit                                                  |
|-------------------------|-------------------------------------------------------|
| A price or dish name    | `MENU` in `data.js`                                   |
| Hours                   | `BUSINESS.hours` (minutes from midnight) + `hoursLabel` |
| Phone / address         | `BUSINESS` in `data.js`                               |
| Delivery app links      | `ORDERING` in `data.js`                               |
| Review quotes           | `REVIEWS` in `data.js` — read the note below first     |
| Add a photo             | `assets/photos/README.md`                             |

Adding a dish is one line in the right category's `items` array. Adding a whole
category is one object in `MENU` — the nav rail, the search, the filters and
the structured data all pick it up automatically.

### Dish tags

`veg` (vegetarian), `spicy`, `gf` (made with rice noodles), and `top`. Anything
tagged `top` is eligible for the "Four bowls worth the drive" cards on the home
page; which four appear is set by the `wanted` list in `site.js`.

## Reviews — please read

The four review cards are **real, published guest reviews**, quoted from
Tripadvisor, and each card links back to its source. Nothing on the page is
invented.

The aggregate figure on the reviews panel reads **"From the published guest
reviews quoted below"** rather than claiming a platform-wide star average,
because no verified Google rating was available when this was built.

**To use your Google reviews instead** (recommended — they are your best
social proof):

1. Open your Google Business Profile → Reviews.
2. For each review you want, copy the reviewer's name, star rating and text.
3. Add an entry to `REVIEWS` in `data.js` with `source: "Google"` and, if you
   have it, the review's permalink as `url`.
4. Update the `score__num` figure and the label beside it in `index.html` to
   your actual Google rating and review count.

Two rules worth keeping: quote reviews verbatim, and never write a review
yourself. Fabricated reviews violate the platforms' terms and, in the US, the
FTC's rule on fake consumer reviews.

## Hours

Set to **10:00 AM – 9:30 PM daily**. Sources disagreed slightly — Yelp and
Google list 10:00–21:30, while one local directory lists 10:00–22:00. Please
confirm the correct closing time and update `BUSINESS.hours` and
`BUSINESS.hoursLabel` in `data.js`, plus the `openingHoursSpecification` block
in `index.html`.

The "Open now" pill computes against **America/Los_Angeles**, so it is correct
for the restaurant no matter where the visitor is.

## Before you go live

- [ ] Confirm closing time (see above).
- [ ] Confirm every price against the current in-house menu. Prices here were
      compiled from published menu listings, not from your POS — the delivery
      apps charge more than these, which is why the site says so.
- [ ] Confirm the soft-serve dessert price (currently "Ask your server").
- [ ] Replace `https://jennipho.com/` in the `<link rel="canonical">`, the
      `og:` tags and the JSON-LD of both pages with your real domain.
- [ ] Update `sitemap.xml` and `robots.txt` with the same domain.
- [ ] Add real photos (`assets/photos/README.md`).
- [ ] Swap in Google reviews (see above).
- [ ] Claim/refresh the Google Business Profile and set the website field to
      the new domain. That single step drives most of a local restaurant's
      search traffic.

## Deploying

It is a static site, so anything that serves files will do.

**Netlify** — drag the folder onto app.netlify.com, or connect the repo.
`netlify.toml` is already here.

**Vercel** — `vercel` from this directory, or connect the repo. `vercel.json`
is already here.

**GitHub Pages** — Settings → Pages → deploy from this branch, root folder.

**Any host** — upload the files. There is nothing to compile.

### Local preview

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## What is built in

- Live open/closed status in the restaurant's own timezone
- Full menu: 67 dishes across 9 categories, with search, dietary filters and a
  scroll-synced category rail
- `Restaurant` and `Menu` structured data (JSON-LD), so Google can show hours,
  price range and dishes directly in results
- Open Graph and Twitter card tags for link previews
- Responsive from 320px up, tested at 390px and 1440px
- Keyboard accessible, with skip link, focus rings and semantic landmarks
- Respects `prefers-reduced-motion`
- A print stylesheet — the menu page prints as a clean paper menu
- No cookies, no trackers, no third-party scripts

## Performance

Roughly 90 KB total on first load, most of which is the Google Fonts request.
If you want it faster still, self-host the two fonts and drop the
`fonts.googleapis.com` link from both pages.
