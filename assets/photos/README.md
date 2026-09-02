# Photos

The site ships with hand-drawn illustrations, so it never renders blank or
broken. Real photography will make it considerably better. Here is how to
swap it in.

## Fastest way to get your photos in

Open this link, drag the files in, commit:

  https://github.com/mastermindkev28-sys/jennipho/upload/claude/jenni-pho-website-gm03i5/assets/photos

Then run one command from the repo root:

```sh
python3 tools/use-photos.py
```

That scans this folder and switches on every slot whose file is present,
leaving the rest on their illustrations. It handles `.jpg`, `.jpeg`, `.png`
and `.webp`, so the extension does not matter. Nothing else needs editing.

## The five photos you already have

Save each one into this folder under the name on the right, then delete the
`//` in front of that line in the `PHOTOS` block of `assets/js/data.js`.

| Your photo | Save it as | Where it appears |
|---|---|---|
| The wide shot of the bowl with the herb plate beside it on the wood table | `hero.jpg` | Homepage hero. Crop it square. |
| That same shot, uncropped | `pho-bowl.jpg` | Gallery and the top of the Pho menu |
| The close-up of the bowl | `pho-bowl.jpg` | Use whichever of the two reads better small |
| The dining room with the rattan pendant lights | `dining-room.jpg` | Our story. Crop to portrait. |
| The grilled pork over vermicelli | `vermicelli.jpg` | Gallery and the Vermicelli menu section |
| The storefront with the sign | `storefront.jpg` | Visit, directly above the map |

The wide bowl shot is the strongest of the five and should be the hero. It
shows the herb plate served on the side, which is the detail the copy already
talks about, and the light on the broth is doing the work a hero photo needs
to do.

## How to add a photo

1. Save the file into this folder (`assets/photos/`) using the filename below.
2. Open `assets/js/data.js`, find the `PHOTOS` block near the bottom, and
   uncomment that photo's line.
3. Reload. That is it: no build step, no other file to touch.

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
  No flash, because it flattens the broth and turns the fat cap grey.
- **Steam reads as fresh.** Photograph the bowl the moment it leaves the pass.
- **Fill the frame.** These crop to fixed aspect ratios; leave a little
  breathing room at the edges so nothing important gets cut.
- **Keep them under ~300 KB each.** Export JPEG at quality 75–80 and resize to
  the dimensions above. Large files are the single biggest thing that will slow
  this site down.

## Rights

Only use photographs the restaurant owns or has licence to use. Do not copy
images from Google, Yelp or the delivery apps. Those belong to the people who
uploaded them.
