/* ============================================================
   Jenni Pho - site data
   Single source of truth for business info, menu, and reviews.
   Edit this file to update the site. No build step required.
   ============================================================ */

const BUSINESS = {
  name: "Jenni Pho",
  tagline: "Vietnamese kitchen · Las Vegas",
  founded: 2008,
  owner: "Jennifer Huynh",
  phone: "(702) 269-0348",
  phoneHref: "tel:+17022690348",
  street: "7855 S Rainbow Blvd",
  city: "Las Vegas",
  state: "NV",
  zip: "89139",
  get address() {
    return `${this.street}, ${this.city}, ${this.state} ${this.zip}`;
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Jenni+Pho+7855+S+Rainbow+Blvd+Las+Vegas+NV+89139",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Jenni+Pho+7855+S+Rainbow+Blvd+Las+Vegas+NV+89139",
  priceRange: "$$",
  cuisine: "Vietnamese",
  // Open 10:00-21:30 every day. [open, close] in 24h minutes-from-midnight.
  hours: {
    mon: [600, 1290], tue: [600, 1290], wed: [600, 1290], thu: [600, 1290],
    fri: [600, 1290], sat: [600, 1290], sun: [600, 1290],
  },
  hoursLabel: "10:00 AM – 9:30 PM, every day",
};

/* Online ordering partners. Verified store links. */
const ORDERING = [
  {
    id: "ubereats",
    name: "Uber Eats",
    note: "Delivery & pickup",
    url: "https://www.ubereats.com/store/jenni-pho/cLVe99YFQyiZ_S1NcGjbRg",
    accent: "#0B9C4A",
  },
  {
    id: "doordash",
    name: "DoorDash",
    note: "Delivery & pickup",
    url: "https://www.doordash.com/store/jenni-pho-las-vegas-71439/",
    accent: "#E24536",
  },
  {
    id: "grubhub",
    name: "Grubhub",
    note: "Delivery & pickup",
    url: "https://www.grubhub.com/restaurant/jenni-pho-7855-s-rainbow-blvd-las-vegas/1659601",
    accent: "#D8452B",
  },
  {
    id: "postmates",
    name: "Postmates",
    note: "Delivery",
    url: "https://postmates.com/store/jenni-pho/cLVe99YFQyiZ_S1NcGjbRg",
    accent: "#111111",
  },
  {
    id: "caviar",
    name: "Caviar",
    note: "Delivery",
    url: "https://www.trycaviar.com/store/jenni-pho-las-vegas-71439",
    accent: "#B3312A",
  },
  {
    id: "fantuan",
    name: "Fantuan",
    note: "Delivery",
    url: "https://www.fantuanorder.com/en-US/store/jenni-pho/us-1364040959",
    accent: "#E8622C",
  },
];

/* ------------------------------------------------------------------
   MENU
   tags: 'veg'  = vegetarian / no meat protein
         'spicy'
         'gf'   = naturally gluten-free as served (rice noodle bowls)
         'top'  = house signature, surfaces on the home page
   Prices are dine-in / pickup menu prices. Delivery apps price higher.
   ------------------------------------------------------------------ */
const MENU = [
  {
    id: "appetizers",
    name: "Appetizers",
    vi: "Khai Vị",
    blurb: "Rolled, fried and folded to order. Built to share, gone in minutes.",
    art: "spring-rolls",
    items: [
      { code: "A1", name: "Fresh Spring Rolls", desc: "Two rolls. Shrimp, pork, rice noodle and herbs in rice paper, with house peanut sauce.", price: 10.0, tags: ["top", "gf"] },
      { code: "A2", name: "Deep Fried Shrimp Rolls", desc: "Four crisp shrimp rolls with lettuce, herbs and nuoc cham.", price: 10.0 },
      { code: "A3", name: "Crab Rangoon", desc: "Six pieces. Crab and cream cheese, fried golden.", price: 8.5 },
      { code: "A4", name: "Potstickers", desc: "Eight pan-fried dumplings with dipping sauce.", price: 9.5 },
      { code: "A5", name: "Chicken Wings", desc: "Six wings, fried crisp.", price: 14.0 },
      { code: "A6", name: "Fried Egg Rolls", desc: "Four rolls. Pork and vegetable, served with lettuce, herbs and nuoc cham.", price: 10.0, tags: ["top"] },
      { code: "A7", name: "Sampler Platter", desc: "Shrimp rolls, crab rangoon, potstickers, wings and egg rolls. Two of each.", price: 18.0, tags: ["top"] },
      { code: "A8", name: "Veggie Fried Egg Rolls", desc: "Crisp vegetable egg rolls with lettuce and herbs.", price: 9.25, tags: ["veg"] },
      { code: "A9", name: "Veggie Tofu Spring Rolls", desc: "Fresh rolls with tofu and vegetables.", price: 10.0, tags: ["veg", "gf"] },
    ],
  },
  {
    id: "pho",
    name: "Pho",
    vi: "Phở",
    blurb:
      "The broth Jennifer went to Vietnam to learn. Bones and spice, simmered overnight, skimmed clean. Every bowl comes with basil, bean sprouts, lime and jalapeño.",
    art: "pho-bowl",
    items: [
      { code: "P1", name: "Jenni Pho Special", desc: "The house bowl. Rare steak, flank, brisket, tendon, tripe and beef balls.", price: 17.0, tags: ["top", "gf"] },
      { code: "P2", name: "Steak & Flank Pho", desc: "Rare steak and well-done flank.", price: 16.0, tags: ["gf"] },
      { code: "P3", name: "Beef Balls Pho", desc: "House beef meatballs.", price: 16.0, tags: ["gf"] },
      { code: "P4", name: "Rare Steak Pho", desc: "Thin-sliced rare steak, cooked by the broth at the table.", price: 16.0, tags: ["gf"] },
      { code: "P5", name: "Steak & Tripe Pho", desc: "Rare steak with tender tripe.", price: 16.0, tags: ["gf"] },
      { code: "P6", name: "Shrimp Pho", desc: "Poached shrimp in clear broth.", price: 16.0, tags: ["gf"] },
      { code: "P7", name: "Seafood Pho", desc: "Shrimp, squid, imitation crab and fish cake.", price: 18.0, tags: ["gf"] },
      { code: "P8", name: "Veggie & Tofu Pho", desc: "Tofu and seasonal vegetables in vegetable broth.", price: 16.0, tags: ["veg", "gf"] },
      { code: "P9", name: "Kid's Pho", desc: "Small bowl for little appetites.", price: 10.5, tags: ["gf"] },
      { code: "P10", name: "Chicken Pho", desc: "Sliced chicken breast in chicken broth.", price: 16.0, tags: ["gf"] },
      { code: "P11", name: "Create Your Own Bowl", desc: "Pick your own meats. Build the bowl you actually want.", price: 17.0, tags: ["gf"] },
      { code: "P12", name: "Rib Eye Pho", desc: "Sliced rib eye, marbled and rich.", price: 19.0, tags: ["gf"] },
      { code: "P13", name: "Oxtail Pho", desc: "Fall-apart oxtail in a deep, gelatinous beef broth. The one people drive across town for.", price: 26.0, tags: ["top", "gf"] },
      { code: "P14", name: "Beef Short Rib Pho", desc: "Braised short rib, slipping off the bone.", price: 20.0, tags: ["top", "gf"] },
      { code: "P15", name: "Intestine Pho", desc: "For the traditionalists.", price: 18.5, tags: ["gf"] },
    ],
  },
  {
    id: "soups",
    name: "Specialty Soups",
    vi: "Món Nước Đặc Biệt",
    blurb: "The bowls beyond pho. Regional, punchy, and worth the detour.",
    art: "bun-bo-hue",
    items: [
      { code: "S1", name: "Bun Bo Hue", desc: "Spicy lemongrass beef soup with pork hock and pork blood. Hue-style, unapologetic.", price: 19.0, tags: ["top", "spicy"] },
      { code: "S2", name: "Bun Rieu (Crab & Escargot)", desc: "Crabmeat, tofu and escargot in tomato broth with vermicelli.", price: 18.5 },
      { code: "S3", name: "Bun Rieu (Crab & Shrimp)", desc: "Crabmeat, tofu and shrimp in tomato broth with vermicelli.", price: 18.5 },
      { code: "S4", name: "Bo Kho", desc: "Vietnamese beef stew, star anise and lemongrass, with rice noodle.", price: 18.0, tags: ["top"] },
      { code: "S5", name: "Seafood Egg Noodle Soup", desc: "Mixed seafood over egg noodle.", price: 20.0 },
      { code: "S6", name: "Wonton Soup", desc: "Pork and shrimp wontons in clear broth.", price: 17.0 },
      { code: "S7", name: "Wonton Egg Noodle Soup with Shrimp", desc: "Wontons and shrimp over egg noodle.", price: 20.0 },
    ],
  },
  {
    id: "vermicelli",
    name: "Vermicelli Bowls",
    vi: "Bún",
    blurb: "Cold rice vermicelli, hot grilled protein, herbs, pickles and nuoc cham poured over the top.",
    art: "vermicelli",
    items: [
      { code: "B1", name: "Grilled Shrimp & Skewer Pork", desc: "Charred shrimp and lemongrass pork skewer.", price: 17.5 },
      { code: "B2", name: "Grilled Shrimp & Pork Sausage", desc: "Shrimp with grilled Vietnamese pork sausage.", price: 16.5 },
      { code: "B3", name: "Skewer Pork, Shrimp & Egg Roll", desc: "The full combination bowl.", price: 18.0, tags: ["top"] },
      { code: "B4", name: "Grilled Skewer Pork", desc: "Lemongrass pork skewer over vermicelli.", price: 16.0 },
      { code: "B5", name: "Grilled Pork Sausage", desc: "Grilled Vietnamese pork sausage over vermicelli.", price: 17.0 },
    ],
  },
  {
    id: "rice",
    name: "Rice Plates",
    vi: "Cơm Tấm",
    blurb: "Broken rice plates. Charbroiled over open flame, served with pickles and nuoc cham.",
    art: "rice-plate",
    items: [
      { code: "R1", name: "Charbroiled Pork Chop", desc: "Marinated pork chop over broken rice.", price: 18.0, tags: ["top"] },
      { code: "R2", name: "Pork Chop, Shredded Pork & Fried Egg", desc: "The classic com tam plate.", price: 18.0 },
      { code: "R3", name: "Pork Chop, Shrimp, Sunny Side Up Egg & Egg Roll", desc: "The big one. Everything on the plate.", price: 19.0, tags: ["top"] },
      { code: "R4", name: "Grilled Shrimp & Skewer Pork", desc: "Shrimp and lemongrass pork over rice.", price: 17.5 },
      { code: "R5", name: "Grilled Honey Chicken", desc: "Honey-glazed grilled chicken over rice.", price: 17.0 },
      { code: "R6", name: "Skewer Pork & Egg Roll", desc: "Lemongrass pork with a crisp egg roll.", price: 17.0 },
      { code: "R7", name: "Skewer Pork, Fried Egg & Egg Roll", desc: "Pork skewer, fried egg and egg roll.", price: 18.0 },
      { code: "R8", name: "Skewer Pork, Shrimp & Egg Roll", desc: "Pork skewer, grilled shrimp and egg roll.", price: 19.0 },
      { code: "R9", name: "Chicken Wings, Shredded Pork & Fried Egg", desc: "Fried wings with shredded pork and egg.", price: 20.0 },
    ],
  },
  {
    id: "friedrice",
    name: "Fried Rice",
    vi: "Cơm Chiên",
    blurb: "Wok-fired, egg and scallion, high heat.",
    art: "fried-rice",
    items: [
      { code: "F1", name: "Veggie Fried Rice", desc: "Seasonal vegetables and egg.", price: 16.0, tags: ["veg"] },
      { code: "F2", name: "Chicken Fried Rice", desc: "Diced chicken, egg and scallion.", price: 16.0 },
      { code: "F3", name: "Shrimp Fried Rice", desc: "Shrimp, egg and scallion.", price: 18.0 },
      { code: "F4", name: "Combination Fried Rice", desc: "Chicken, shrimp and pork together.", price: 19.0, tags: ["top"] },
    ],
  },
  {
    id: "banhmi",
    name: "Banh Mi",
    vi: "Bánh Mì",
    blurb:
      "Crackly baguette, pâté and mayo, pickled daikon and carrot, cucumber, cilantro, jalapeño. Under ten dollars, every one of them.",
    art: "banh-mi",
    items: [
      { code: "BM1", name: "Grilled Pork Banh Mi", desc: "Lemongrass grilled pork.", price: 9.5, tags: ["top"] },
      { code: "BM2", name: "Grilled Pork Sausage Banh Mi", desc: "Grilled Vietnamese pork sausage.", price: 9.5 },
      { code: "BM3", name: "Lemongrass Beef Banh Mi", desc: "Lemongrass-marinated beef.", price: 9.5 },
      { code: "BM4", name: "Grilled Honey Chicken Banh Mi", desc: "Honey-glazed grilled chicken.", price: 9.5, tags: ["top"] },
    ],
  },
  {
    id: "drinks",
    name: "Drinks",
    vi: "Nước Uống",
    blurb: "Fruit blended to order, tea brewed in house, and coffee that drips at its own pace.",
    art: "drinks",
    items: [
      { code: "D1", name: "Fresh Watermelon Smoothie", desc: "Blended fresh, nothing from a carton.", price: 6.5, tags: ["top", "veg"] },
      { code: "D2", name: "Fresh Coconut Smoothie", desc: "Young coconut, blended.", price: 10.0, tags: ["veg"] },
      { code: "D3", name: "Vietnamese Coffee", desc: "Phin-dripped robusta over condensed milk. Hot or iced.", price: 5.5, tags: ["top"] },
      { code: "D4", name: "Young Coconut Juice", desc: "Served cold.", price: 5.5, tags: ["veg"] },
      { code: "D5", name: "Yogurt Slush", desc: "Blended yogurt, tart and cold.", price: 6.5, tags: ["veg"] },
      { code: "D6", name: "Thai Tea", desc: "Sweet and creamy.", price: 6.0, tags: ["veg"] },
      { code: "D7", name: "Milk Tea", desc: "Add boba on request.", price: 6.0, tags: ["veg"] },
      { code: "D8", name: "Grapefruit Tea", desc: "Bright and lightly bitter.", price: 6.0, tags: ["veg"] },
      { code: "D9", name: "Peach Rose Tea", desc: "Floral and lightly sweet.", price: 5.0, tags: ["veg"] },
      { code: "D10", name: "Jasmine Tea", desc: "Hot or iced.", price: 4.0, tags: ["veg"] },
      { code: "D11", name: "Original Green Tea", desc: "Unsweetened.", price: 3.0, tags: ["veg"] },
      { code: "D12", name: "Lemonade", desc: "Fresh-squeezed.", price: 4.0, tags: ["veg"] },
      { code: "D13", name: "Soda", desc: "Canned soft drinks.", price: 2.5, tags: ["veg"] },
    ],
  },
  {
    id: "dessert",
    name: "Dessert",
    vi: "Tráng Miệng",
    blurb: "One thing, done softly.",
    art: "dessert",
    items: [
      {
        code: "DS1",
        name: "Soft Serve Ice Cream",
        desc: "The house dessert. Ask your server for today's flavors.",
        price: null,
        priceNote: "Ask your server",
        tags: ["veg"],
      },
    ],
  },
];

/* ------------------------------------------------------------------
   REVIEWS
   Real, published Google reviews. Each card shows the reviewer's name,
   their Google Local Guide credential and when they came, because
   that is verifiable and more persuasive than an anonymous star row.

   `headline` is always a verbatim fragment of that same review - never
   a phrase written for the site. Quotes are trimmed to the sentences
   Google showed before "... More", with obvious typos and casing
   corrected and nothing else changed.

   No numeric rating is stored: Google's per-review star counts were not
   available when this was built. Add `rating: 5` to a review and its
   stars render automatically. See README.md ("Reviews") before editing.
   ------------------------------------------------------------------ */
const REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Jenni+Pho+7855+S+Rainbow+Blvd+Las+Vegas+NV+89139";

const REVIEWS = [
  {
    author: "BJ the Space Hunter",
    credential: "Local Guide, 97 reviews",
    visit: "Dined in, 8 months ago",
    source: "Google",
    headline: "Best Pho in the Southwest area!",
    quote:
      "Always fresh and delicious! Service is awesome with smiles and quality!",
    url: REVIEWS_URL,
  },
  {
    author: "Christina Marie",
    credential: "Local Guide, 267 reviews",
    visit: "Dined in for lunch, a year ago",
    source: "Google",
    headline: "One of the best Pho restaurants in town",
    quote:
      "I've been coming to this restaurant for years and it truly honestly is one of the best Pho restaurants in town. Their bowls are huge and come blazing hot and fresh. I personally love the veggie pho at this restaurant.",
    url: REVIEWS_URL,
  },
  {
    author: "Eddie Lluisma",
    credential: "Local Guide, 449 reviews",
    visit: "Dined in for dinner, 4 months ago",
    source: "Google",
    headline: "A very nostalgic taste",
    quote:
      "Been going here since they started business. Their pho has a very nostalgic taste. The pho was great and was served very quickly. The staff were very nice and friendly. Parking is no problem and plentiful.",
    url: REVIEWS_URL,
  },
  {
    author: "Michelle G",
    credential: "Local Guide, 392 reviews",
    visit: "Dined in for lunch, 4 months ago",
    source: "Google",
    headline: "The pho was flavorful",
    quote:
      "It's a cute good size restaurant, not too small not too big. The pho was flavorful. I created my own. Price was on point in comparison to most places, a good amount. The staff was welcoming and checked up often, even with small thoughtful questions.",
    url: REVIEWS_URL,
  },
  {
    author: "Anissa Bounaouar",
    credential: "4 reviews",
    visit: "Dined in, a month ago",
    source: "Google",
    headline: "The food is always incredible",
    quote:
      "I come here often. The food is always incredible and the service is even better. They are always so kind and accommodating. Definitely recommend!",
    url: REVIEWS_URL,
  },
  {
    author: "Mama Mia",
    credential: "Local Guide, 25 reviews",
    visit: "Came for lunch, 9 months ago",
    source: "Google",
    headline: "Worth the extra drive",
    quote:
      "Food was very good, and came quickly. Cucumber salad in peanut sauce was amazing and worth the extra drive to the south west side.",
    url: REVIEWS_URL,
  },
];

/* ------------------------------------------------------------------
   PHOTOS
   The site ships with hand-drawn illustrations so nothing is ever
   blank or broken. To use real photography instead:

     1. drop the file into  assets/photos/
     2. uncomment its line below (or add a new one)

   Anything left commented keeps using the illustration. Nothing else
   needs to change. See assets/photos/README.md for sizes.
   ------------------------------------------------------------------ */
const PHOTOS = {
  /* Written by tools/use-photos.py. Drop files into assets/photos/
     using the names below and run it again. */
  // "hero":           "hero.jpg",    // 1200x1200 square, homepage hero
  // "pho-bowl":       "pho-bowl.jpg",    // 1600x1000, gallery + Pho section
  // "dining-room":    "dining-room.jpg",    // 1000x1250 portrait, Our story
  // "vermicelli":     "vermicelli.jpg",    // 1000x800, Vermicelli section
  // "storefront":     "storefront.jpg",    // 1600x1000, shows in Visit
  // "banh-mi":        "banh-mi.jpg",    // 1000x800
  // "spring-rolls":   "spring-rolls.jpg",    // 1000x800
  // "rice-plate":     "rice-plate.jpg",    // 1000x800
  // "drinks":         "drinks.jpg",    // 1000x800
  // "bun-bo-hue":     "bun-bo-hue.jpg",    // 1600x1000
};

/* Gallery tiles. Each looks for a real photo first and falls back to
   the built-in illustration. Drop JPGs into assets/photos/ to upgrade.
   See assets/photos/README.md. */
const GALLERY = [
  { art: "pho-bowl", slot: "pho-bowl", caption: "Oxtail pho, broth simmered overnight", span: "wide" },
  { art: "banh-mi", slot: "banh-mi", caption: "Banh mi, baguette still warm" },
  { art: "spring-rolls", slot: "spring-rolls", caption: "Fresh spring rolls, rolled to order" },
  { art: "dining-room", slot: "dining-room", caption: "The room on South Rainbow", span: "tall" },
  { art: "rice-plate", slot: "rice-plate", caption: "Charbroiled pork chop over broken rice" },
  { art: "drinks", slot: "drinks", caption: "Watermelon, blended to order" },
  { art: "bun-bo-hue", slot: "bun-bo-hue", caption: "Bun bo hue, Hue-style and spicy", span: "wide" },
  { art: "vermicelli", slot: "vermicelli", caption: "Vermicelli bowls, herbs by the handful" },
];
