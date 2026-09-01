# Sushi Love — website

A fast, static marketing site for **Sushi Love**, the sushi bar and Japanese
kitchen with two rooms in the south Las Vegas valley.

No framework, no build step, no dependencies. Two HTML files, one stylesheet,
one script, one data file. Open `index.html` in a browser and it works.

```
index.html            Home — hero, about, signatures, reviews, gallery, ordering, visit, CTA
menu.html             Full menu, searchable and filterable, with prices
COPY.md               Every section's copy, ready to paste into a website builder
assets/css/site.css   All styles
assets/js/data.js     ← everything you will ever want to edit lives here
assets/js/site.js     Behaviour (open/closed status, menu rendering, search, filters)
assets/img/*.svg      Built-in food illustrations
assets/photos/        Drop real photography here (see its README)
```

## Read this first: the site is in draft mode

`SITE.draft` at the top of `assets/js/data.js` is `true`. That does two things:

- A gold ribbon appears at the top of every page saying how many prices are
  still missing.
- Dishes with no price show **"Ask us"** instead of a number.

**Prices were compiled from Sushi Love's published listings** on the delivery
apps, Yelp and Tripadvisor. 15 of them came back with real figures. The other 34
dishes are on the menu but no published source gave a price, so they were left
blank rather than guessed — a wrong price on a live website is worse than no
price at all.

### To finish the menu (about 15 minutes)

1. Open `assets/js/data.js` and sit down with your in-house menu.
2. Every `price: null` is a blank. Replace it with the number: `price: 9.50`.
3. While you're there, **check the 15 prices that are filled in** — they came
   from third-party listings, and delivery apps inflate menu prices.
4. Fill in the empty `desc: ""` fields on your signature rolls. The Sunset,
   Cherry Blossom, Tiger, Las Vegas and Dynamite Lobster rolls have no
   description because no published source listed their ingredients, and
   inventing them would put the wrong thing in front of a guest.
5. Set `SITE.draft = false`.

The draft ribbon disappears, and any dish still without a price is hidden from
the public menu automatically — so you can publish before you've finished.

## Editing the site

**`assets/js/data.js` is the single source of truth.** Prices, dish names,
hours, phone numbers, ordering links and review quotes all live there. Change a
price in that file and it updates on the page, in the search index and in the
structured data Google reads. You do not need to touch any HTML.

| To change…              | Edit                                                    |
|-------------------------|---------------------------------------------------------|
| A price or dish name    | `MENU` in `data.js`                                     |
| Which four dishes are featured on the home page | `SIGNATURES` in `data.js`       |
| Hours                   | `BUSINESS.hours` (minutes from midnight) + `hoursLabel` |
| An address or phone     | `BUSINESS.locations` in `data.js`                       |
| Delivery app links      | `ORDERING` in `data.js`                                 |
| Reservation links       | `BOOKING` in `data.js`                                  |
| Review quotes           | `REVIEWS` in `data.js` — read the note below first       |
| Add a photo             | `assets/photos/README.md`                               |

Adding a dish is one line in the right category's `items` array. Adding a whole
category is one object in `MENU` — the nav rail, the search, the filters and the
print stylesheet all pick it up automatically.

### Dish tags

`veg`, `spicy`, `gf` (shown as "no wheat"), `raw`, `cooked`, `baked`, and `top`.
Anything tagged `top` is eligible for the signature cards on the home page;
which four appear is set by `SIGNATURES` in `data.js`.

## Reviews — please read

The five review cards are **real, published guest reviews**, quoted verbatim
from Tripadvisor and Yelp, and each card links back to its source. Nothing on
the page was written by us.

Two of them are published without an attributable reviewer name, so those cards
credit the platform only rather than inventing a name.

**No Google rating is shown anywhere on this site.** The Google Maps listing
could not be read when this was built, so the star figure on the reviews panel
is the **Yelp** rating (4.5 from 275+ reviews) and it says so on the page.

### To use your Google reviews instead — recommended, they're your best social proof

1. Open your Google Business Profile → Reviews.
2. For each review you want, copy the reviewer's name, star rating and text.
3. Add an entry to `REVIEWS` in `data.js` with `source: "Google"` and, if you
   have it, the review's permalink as `url`.
4. Add a `{ source: "Google", score: …, count: …, url: … }` row to `RATINGS`.
5. Update the big `4.5` figure and the label beside it in `index.html`
   (search for `score__num`) and the hero fact block, to your Google numbers.

Two rules worth keeping: quote reviews verbatim, and never write one yourself.
Fabricated reviews violate the platforms' terms and, in the US, the FTC's rule
on fake consumer reviews.

## Facts to confirm before you go live

- [ ] **Every price**, including the 17 that are filled in (see above).
- [ ] **Hours.** Set to Sun–Thu 11:00 AM – 9:00 PM, Fri–Sat 11:00 AM – 10:00 PM
      at both locations, from the current published listings. Confirm, and
      update `BUSINESS.hours` in `data.js` *and* the `openingHoursSpecification`
      blocks in `index.html`.
- [ ] **The South Rainbow suite number** (currently Ste 110) and its phone.
- [ ] **Map coordinates** in `data.js` and `index.html` are approximate — drop a
      pin on your actual door and paste the real latitude and longitude in.
- [ ] **The domain.** Every canonical URL, `og:` tag, JSON-LD `@id` and the
      sitemap uses `https://sushilovelv.com/`. Change all of them if you publish
      somewhere else, and update `sitemap.xml` and `robots.txt` to match.
- [ ] **Add real photos** (`assets/photos/README.md`).
- [ ] **Claim or refresh the Google Business Profile** and set the website field
      to this site's domain. That single step drives most of a local
      restaurant's search traffic.

## Deploying

It is a static site, so anything that serves files will do.

**Netlify** — drag this folder onto app.netlify.com, or connect the repo and set
the publish directory to `sushi-love`.

**Vercel** — connect the repo, set the root directory to `sushi-love`.

**GitHub Pages** — Settings → Pages → deploy from this branch. Because the site
lives in a subfolder, either move these files to the repo root first or point
Pages at `/sushi-love`.

**Any host** — upload the files. There is nothing to compile.

### Local preview

```sh
cd sushi-love
python3 -m http.server 8000
# then open http://localhost:8000
```

## What is built in

- Live open/closed status computed in the restaurant's own timezone, so it is
  correct no matter where the visitor is
- Full menu with search, dietary filters and a scroll-synced category rail
- Two `Restaurant` structured-data records (JSON-LD), one per location, so
  Google can show hours, price range and reservations directly in results
- Open Graph and Twitter card tags for link previews
- Responsive from 320px up, tested at 390px and 1440px, no horizontal scroll
- Keyboard accessible: skip link, focus rings, semantic landmarks, real labels
- Respects `prefers-reduced-motion`
- A print stylesheet — the menu page prints as a clean paper menu
- A sticky call/book bar on mobile
- No cookies, no trackers, no third-party scripts

## Performance

Roughly 95 KB on first load, most of which is the Google Fonts request. To make
it faster still, self-host Instrument Serif and Inter and drop the
`fonts.googleapis.com` link from both pages.

## Where the information came from

The restaurant has no first-party data feed, so addresses, hours, dish names and
the 15 confirmed prices were compiled from Sushi Love's published listings on
Yelp, Tripadvisor, OpenTable, DoorDash, Uber Eats and Grubhub in September 2026.
Third-party listings go stale. Treat the checklist above as required reading
rather than optional.
