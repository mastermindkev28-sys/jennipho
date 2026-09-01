/* ============================================================================
   Sushi Love — single source of truth.
   Prices, dishes, hours, links and review quotes all live in this file.
   Edit here and the whole site updates: pages, search, and the structured
   data Google reads.

   PRICES: `price: null` means "not yet confirmed with the restaurant".
   While SITE.draft is true those items show a dotted "Add price" slot.
   When you set SITE.draft = false, any item still missing a price is
   hidden from the public menu automatically — so you can publish today
   and reveal dishes as you fill them in.
   ========================================================================= */

const SITE = {
  /* Flip to false when every price below is confirmed and you're ready to go live. */
  draft: true,
  domain: "https://sushilovelv.com/"
};

const BUSINESS = {
  name: "Sushi Love",
  cuisine: "Japanese · Sushi Bar · Ramen",
  priceRange: "$$",
  since: null,

  /* Both rooms keep the same kitchen and the same hours. */
  hoursLabel: "Sun–Thu 11:00 AM – 9:00 PM · Fri–Sat 11:00 AM – 10:00 PM",
  timezone: "America/Los_Angeles",
  /* Minutes from midnight. 0 = Sunday. */
  hours: {
    0: [660, 1260],
    1: [660, 1260],
    2: [660, 1260],
    3: [660, 1260],
    4: [660, 1260],
    5: [660, 1320],
    6: [660, 1320]
  },

  locations: [
    {
      id: "blvd",
      label: "Las Vegas Boulevard",
      flagship: true,
      street: "7430 S Las Vegas Blvd",
      city: "Las Vegas",
      region: "NV",
      postal: "89123",
      phone: "(702) 954-4926",
      tel: "+17029544926",
      landmark: "At Las Vegas South Premium Outlets, near Warm Springs — free lot parking.",
      maps: "https://maps.google.com/?q=Sushi+Love+7430+S+Las+Vegas+Blvd+Las+Vegas+NV+89123",
      geo: { lat: 36.0227, lng: -115.1731 }
    },
    {
      id: "rainbow",
      label: "South Rainbow",
      flagship: false,
      street: "9250 S Rainbow Blvd, Ste 110",
      city: "Las Vegas",
      region: "NV",
      postal: "89139",
      phone: "(702) 462-2765",
      tel: "+17024622765",
      landmark: "Southwest valley, at Rainbow and Ford — easy street-level parking.",
      maps: "https://maps.google.com/?q=Sushi+Love+9250+S+Rainbow+Blvd+Las+Vegas+NV+89139",
      geo: { lat: 36.0159, lng: -115.2429 }
    }
  ]
};

/* Reservations and online ordering. All links verified live. */
const BOOKING = [
  { name: "OpenTable", url: "https://www.opentable.com/r/sushi-love-las-vegas", note: "Book a table, instantly confirmed" },
  { name: "Yelp Reservations", url: "https://www.yelp.com/reservations/sushi-love-las-vegas", note: "Same tables, second option" }
];

const ORDERING = [
  { name: "DoorDash",  url: "https://www.doordash.com/store/sushi-love-las-vegas-29658480/", note: "Pickup or delivery", loc: "blvd" },
  { name: "Uber Eats", url: "https://www.ubereats.com/store/sushi-love-las-vegas/wUUwxjM6WReMiYybFVw9BA", note: "Live order tracking", loc: "blvd" },
  { name: "Grubhub",   url: "https://www.grubhub.com/restaurant/sushi-love-las-vegas-7430-s-las-vegas-blvd-las-vegas/7332000", note: "Boulevard kitchen", loc: "blvd" },
  { name: "Grubhub",   url: "https://www.grubhub.com/restaurant/sushi-love-9250-south-rainbow-boulevard-las-vegas/14732152", note: "Rainbow kitchen", loc: "rainbow" }
];

/* ---------------------------------------------------------------------------
   REVIEWS — real, published guest reviews, quoted verbatim.
   Never write one yourself. See README.md before editing this block.
   `name: null` means the quote was published without an attributable name;
   the card then credits the platform only.
   ------------------------------------------------------------------------ */
const RATINGS = [
  { source: "Yelp",        score: 4.5, count: 275, url: "https://www.yelp.com/biz/sushi-love-las-vegas" },
  { source: "OpenTable",   score: 4.4, count: null, url: "https://www.opentable.com/r/sushi-love-las-vegas" },
  { source: "Tripadvisor", score: null, count: null, url: "https://www.tripadvisor.com/Restaurant_Review-g45963-d32874714-Reviews-Sushi_Love-Las_Vegas_Nevada.html" }
];

const REVIEWS = [
  {
    quote: "My wife and I stopped in here for lunch and we both loved our meal. For appetizers, we had the Shrimp Tempura and Gyoza. Both were cooked perfectly and the dipping sauces were also good.",
    name: null, source: "Tripadvisor", stars: 5,
    url: "https://www.tripadvisor.com/Restaurant_Review-g45963-d32874714-Reviews-Sushi_Love-Las_Vegas_Nevada.html"
  },
  {
    quote: "Amazing fresh sushi at a reasonable price!",
    name: null, source: "Tripadvisor", stars: 5,
    url: "https://www.tripadvisor.com/Restaurant_Review-g45963-d32874714-Reviews-Sushi_Love-Las_Vegas_Nevada.html"
  },
  {
    quote: "Fabulous food and friendly, caring service. Easy location to get to and lots of free parking.",
    name: null, source: "Tripadvisor", stars: 5,
    url: "https://www.tripadvisor.com/Restaurant_Review-g45963-d32874714-Reviews-Sushi_Love-Las_Vegas_Nevada.html"
  },
  {
    quote: "Staff was awesome and sushi was fresh, and had some really creative takes on rolls as well.",
    name: null, source: "Yelp", stars: 5,
    url: "https://www.yelp.com/biz/sushi-love-las-vegas"
  },
  {
    quote: "Very fresh sushi and rolls. Recommended for sushi lovers.",
    name: null, source: "Yelp", stars: 5,
    url: "https://www.yelp.com/biz/sushi-love-las-vegas-3"
  }
];

/* ---------------------------------------------------------------------------
   MENU
   tags: veg · spicy · gf · raw · cooked · baked · top
   `top` makes a dish eligible for the signature cards on the home page.
   `price: null` = confirm with the restaurant (see note at top of file).
   ------------------------------------------------------------------------ */
const MENU = [
  {
    id: "starters",
    name: "To Start",
    blurb: "The small plates the table fights over before the sushi lands.",
    items: [
      { name: "Spicy Garlic Edamame", desc: "Steamed soybeans tossed in a hot garlic sauce that gets on your fingers. Worth it.", price: 8.75, tags: ["veg", "spicy", "gf", "top"], img: "edamame" },
      { name: "Edamame", desc: "Steamed, salted, simple.", price: null, tags: ["veg", "gf"] },
      { name: "Gyoza", desc: "Pan-seared pork dumplings, crisp on one side, with dipping sauce.", price: null, tags: ["cooked"] },
      { name: "Shrimp Tempura", desc: "Light, shattering batter and a dipping sauce guests keep mentioning by name.", price: null, tags: ["cooked", "top"], img: "tempura" },
      { name: "Spring Rolls", desc: "Fried and served hot.", price: null, tags: ["veg", "cooked"] },
      { name: "Stuffed Jalapeño", desc: "A house favorite — heat, cream cheese, crunch.", price: null, tags: ["spicy", "cooked"] },
      { name: "Miso Soup", desc: "Tofu, scallion, seaweed.", price: null, tags: ["veg"] },
      { name: "Seaweed Salad", desc: "Sesame-dressed, cold and clean.", price: null, tags: ["veg", "gf"] }
    ]
  },

  {
    id: "signature",
    name: "Signature Rolls",
    blurb: "The reason people drive across the valley. Built to be looked at before they're eaten.",
    items: [
      {
        name: "Fire Roll",
        desc: "Shrimp tempura, crab, spicy tuna, cucumber and avocado, topped with ebi shrimp, eel sauce, spicy mayo, white aioli and scallion — then lit on fire at the table.",
        price: 22.50, tags: ["spicy", "cooked", "top"], img: "fire-roll"
      },
      {
        name: "Baja Roll",
        desc: "Crab, spicy tuna, cucumber and avocado under yellowtail, Japanese pesto, micro cilantro and sriracha.",
        price: 19.20, unit: "8 pc", tags: ["raw", "spicy", "top"], img: "baja-roll"
      },
      { name: "Dynamite Lobster Roll", desc: "", price: 21.25, tags: ["cooked", "baked", "top"], img: "lobster" },
      { name: "Baked Lobster Tail Roll", desc: "", price: 19.20, unit: "8 pc", tags: ["cooked", "baked"] },
      { name: "Sunset Roll", desc: "", price: 20.00, tags: ["raw"] },
      { name: "Cherry Blossom Roll", desc: "", price: 18.75, tags: ["raw"] },
      { name: "Jalapeño Popper Roll", desc: "Tempura jalapeño popper with cream cheese and spicy crab, crunch, eel sauce, spicy mayo and sriracha.", price: 18.00, tags: ["spicy", "cooked"] },
      { name: "Las Vegas Roll", desc: "", price: 12.50, tags: ["cooked", "top"], img: "vegas-roll" },
      { name: "Tiger Roll", desc: "", price: null, tags: [] },
      { name: "Albacore Tempura Roll", desc: "Shrimp tempura, cucumber and crab, topped with albacore and avocado, eel sauce, spicy mayo, Japanese dressing, scallion and sriracha.", price: null, tags: ["raw", "spicy"] }
    ]
  },

  {
    id: "classic",
    name: "Classic Rolls",
    blurb: "Done properly. Rice seasoned daily, cut clean, nothing hiding.",
    items: [
      { name: "Spicy Tuna Roll", desc: "Eight pieces.", price: 13.75, unit: "8 pc", tags: ["raw", "spicy"] },
      { name: "California Roll", desc: "Crab, avocado, cucumber.", price: null, tags: ["cooked"] },
      { name: "Spicy Crab Roll", desc: "", price: null, tags: ["spicy", "cooked"] },
      { name: "Salmon Avocado Roll", desc: "", price: null, tags: ["raw"] },
      { name: "Philadelphia Roll", desc: "Salmon, cream cheese, cucumber.", price: null, tags: ["raw"] },
      { name: "Shrimp Tempura Roll", desc: "", price: null, tags: ["cooked"] },
      { name: "Rainbow Roll", desc: "", price: null, tags: ["raw"] },
      { name: "Cucumber Roll", desc: "", price: null, tags: ["veg", "gf"] },
      { name: "Avocado Roll", desc: "", price: null, tags: ["veg", "gf"] },
      { name: "Vegetable Roll", desc: "", price: null, tags: ["veg"] }
    ]
  },

  {
    id: "raw",
    name: "Nigiri, Sashimi & Chirashi",
    blurb: "Cut to order at the bar. Ask what came in today — the answer changes.",
    items: [
      { name: "Nigiri Sushi Combo", desc: "With your choice of California or spicy crab roll.", price: 20.00, sizes: [{ label: "6 pc", price: 20.00 }, { label: "8 pc", price: 25.00 }], tags: ["raw", "top"], img: "nigiri" },
      { name: "Sashimi Deluxe", desc: "A wide cut of the case, plated to share.", price: 40.00, sizes: [{ label: "12 pc", price: 40.00 }, { label: "20 pc", price: 55.00 }], tags: ["raw", "gf", "top"], img: "sashimi" },
      { name: "Chirashi", desc: "Nine pieces of the day's fish over seasoned sushi rice.", price: 25.00, unit: "9 pc", tags: ["raw", "top"], img: "chirashi" },
      { name: "Nigiri, à la carte", desc: "Salmon, tuna, yellowtail, albacore, ebi, unagi and more — ask for the day's list.", price: null, tags: ["raw"] },
      { name: "Sashimi, à la carte", desc: "By the cut.", price: null, tags: ["raw", "gf"] }
    ]
  },

  {
    id: "kitchen",
    name: "From the Kitchen",
    blurb: "Not everyone at the table wants raw fish. Nobody has to compromise.",
    items: [
      { name: "Chicken Teriyaki Bowl", desc: "Grilled and glazed, over rice.", price: 16.80, tags: ["cooked", "top"], img: "teriyaki" },
      { name: "Katsu", desc: "Panko-crusted cutlet, fried crisp.", price: 25.00, tags: ["cooked"] },
      { name: "Homemade Ramen", desc: "Broth made in house, not from a box.", price: null, tags: ["cooked", "top"], img: "ramen" },
      { name: "Udon", desc: "Thick wheat noodles in hot broth.", price: null, tags: ["cooked"] },
      { name: "Korean Bulgogi", desc: "Marinated beef, grilled.", price: null, tags: ["cooked"] },
      { name: "Fried Rice", desc: "", price: null, tags: ["cooked"] },
      { name: "Beef Teriyaki", desc: "", price: null, tags: ["cooked"] },
      { name: "Salmon Teriyaki", desc: "", price: null, tags: ["cooked"] }
    ]
  },

  {
    id: "kids",
    name: "For the Kids",
    blurb: "Booster seats, patient servers, and food that arrives before anyone melts down.",
    items: [
      { name: "Kids Chicken Teriyaki", desc: "Small portion, rice on the side.", price: null, tags: ["cooked"] },
      { name: "Kids California Roll", desc: "", price: null, tags: ["cooked"] },
      { name: "Kids Udon", desc: "", price: null, tags: ["cooked"] }
    ]
  },

  {
    id: "drinks",
    name: "Drinks & Dessert",
    blurb: "Cold Japanese beer, sake, and something sweet to finish.",
    items: [
      { name: "Japanese Beer", desc: "A good, cold selection — guests single it out.", price: null, tags: [] },
      { name: "Sake", desc: "Hot or chilled.", price: null, tags: [] },
      { name: "Green Tea", desc: "", price: null, tags: [] },
      { name: "Soft Drinks", desc: "", price: null, tags: [] },
      { name: "Mochi Ice Cream", desc: "", price: null, tags: [] }
    ]
  }
];

/* Dishes featured on the home page, in order. Must be tagged `top`. */
const SIGNATURES = ["Fire Roll", "Baja Roll", "Sashimi Deluxe", "Chirashi"];
