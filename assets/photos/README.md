# Photos

The site ships with hand-drawn illustrations, so it never renders blank or
broken. Real photography will make it considerably better — here is how to
swap it in.

## How to add a photo

1. Save the file into this folder (`assets/photos/`) using the filename below.
2. Open `assets/js/data.js`, find the `PHOTOS` block near the bottom, and
   uncomment that photo's line.
3. Reload. That's it — no build step, no other file to touch.

Anything you leave commented out keeps using the illustration, so you can add
photos one at a time.

## The slots

| Key            | Filename           | Size (min)  | Where it appears                          |
|----------------|--------------------|-------------|-------------------------------------------|
| `hero`         | `hero.jpg`         | 1200 × 1200 | Homepage hero, inside the circle. Square. |
| `dining-room`  | `dining-room.jpg`  | 1000 × 1250 | "Our story" section. Portrait.            |
| `pho-bowl`     | `pho-bowl.jpg`     | 1600 × 1000 | Gallery (wide) + Pho menu section         |
| `bun-bo-hue`   | `bun-bo-hue.jpg`   | 1600 × 1000 | Gallery (wide) + Specialty Soups section  |
| `banh-mi`      | `banh-mi.jpg`      | 1000 × 800  | Gallery + Banh Mi menu section            |
| `spring-rolls` | `spring-rolls.jpg` | 1000 × 800  | Gallery + Appetizers menu section         |
| `rice-plate`   | `rice-plate.jpg`   | 1000 × 800  | Gallery + Rice Plates menu section        |
| `vermicelli`   | `vermicelli.jpg`   | 1000 × 800  | Gallery + Vermicelli menu section         |
| `drinks`       | `drinks.jpg`       | 1000 × 800  | Gallery + Drinks menu section             |

Two more slots exist as illustrations only and will pick up photos if you add
the keys `fried-rice` and `dessert` to `PHOTOS` the same way.

## Shooting notes

- **Overhead, natural light.** Shoot bowls from directly above near a window.
  No flash — it flattens the broth and turns the fat cap grey.
- **Steam reads as fresh.** Photograph the bowl the moment it leaves the pass.
- **Fill the frame.** These crop to fixed aspect ratios; leave a little
  breathing room at the edges so nothing important gets cut.
- **Keep them under ~300 KB each.** Export JPEG at quality 75–80 and resize to
  the dimensions above. Large files are the single biggest thing that will slow
  this site down.

## Rights

Only use photographs the restaurant owns or has licence to use. Do not copy
images from Google, Yelp or the delivery apps — those belong to the people who
uploaded them.
