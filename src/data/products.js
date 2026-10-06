// Product catalog — single source of truth for Home, Shop, Product and Search.
// Prices are in Naira (whole numbers). Replace copy, prices and reviews with real data
// before launch; review counts/ratings here are PLACEHOLDERS.

const img = (name) => `/images/${name}.webp`;

export const CATEGORIES = [
  { id: "gloss", name: "Lip Gloss", blurb: "Mirror shine, zero stickiness", image: img("glass-glaze") },
  { id: "oil", name: "Lip Oils", blurb: "Nourish while you glow", image: img("crystal-bloom") },
  { id: "liquid", name: "Tints & Matte", blurb: "Colour that lasts all day", image: img("rosewood-matte") },
  { id: "sets", name: "Sets & Gifts", blurb: "Curated duos and collections", image: img("pink-satin-set") },
];

export const FINISHES = ["Glossy", "Shimmer", "Satin", "Matte", "Sheer"];

export const PRODUCTS = [
  {
    id: "glass-glaze-gloss",
    slug: "glass-glaze-gloss",
    name: "Glass Glaze Gloss",
    tagline: "High-shine, non-sticky gloss",
    category: "gloss",
    finish: "Glossy",
    price: 9500,
    compareAt: null,
    rating: 4.9,
    reviews: 312,
    badges: ["Bestseller"],
    images: [img("glass-glaze"), img("hydra-plump")],
    shades: [
      { name: "Clear Glass", hex: "#efe3dc" },
      { name: "Honey", hex: "#c98e5f" },
      { name: "Rosé", hex: "#d79a9a" },
    ],
    description:
      "Our signature gloss. A cushiony, glass-like finish that reflects light without feeling tacky, with shea butter and vitamin E to keep lips soft all day.",
    benefits: ["Non-sticky formula", "Shea butter + vitamin E", "Flattering on every skin tone"],
  },
  {
    id: "hydra-plump-gloss",
    slug: "hydra-plump-gloss",
    name: "Hydra Plump Gloss",
    tagline: "Plumping gloss with a cooling tingle",
    category: "gloss",
    finish: "Glossy",
    price: 11500,
    compareAt: null,
    rating: 4.8,
    reviews: 146,
    badges: ["New"],
    images: [img("hydra-plump"), img("glass-glaze")],
    shades: [
      { name: "Crystal", hex: "#f1e6e2" },
      { name: "Petal", hex: "#e3a9b0" },
    ],
    description:
      "A gentle peppermint-and-ginger tingle that gives lips a fuller look, paired with hyaluronic acid for long-lasting moisture.",
    benefits: ["Instant fuller look", "Hyaluronic acid", "Cooling mint finish"],
  },
  {
    id: "cherry-sparkle-gloss",
    slug: "cherry-sparkle-gloss",
    name: "Cherry Sparkle Gloss",
    tagline: "Juicy red with fine shimmer",
    category: "gloss",
    finish: "Shimmer",
    price: 9500,
    compareAt: null,
    rating: 4.7,
    reviews: 98,
    badges: [],
    images: [img("cherry-sparkle"), img("red-reign")],
    shades: [
      { name: "Cherry Pop", hex: "#b01e2d" },
      { name: "Ruby Night", hex: "#7a1424" },
    ],
    description:
      "A sheer cherry wash packed with ultra-fine sparkle, made to catch the light at every angle. Wear it alone or over a liner.",
    benefits: ["Ultra-fine shimmer", "Buildable colour", "Sweet cherry scent"],
  },
  {
    id: "red-reign-gloss",
    slug: "red-reign-gloss",
    name: "Red Reign Gloss",
    tagline: "Full-colour red in one swipe",
    category: "gloss",
    finish: "Glossy",
    price: 9000,
    compareAt: null,
    rating: 4.6,
    reviews: 74,
    badges: [],
    images: [img("red-reign"), img("cherry-sparkle")],
    shades: [
      { name: "Reign", hex: "#a5162a" },
      { name: "Crimson", hex: "#8e1b2c" },
    ],
    description:
      "Lipstick-level colour with a gloss finish. A true blue-based red that brightens deep and light skin tones alike.",
    benefits: ["Opaque in one coat", "Blue-based red", "Comfortable wear"],
  },
  {
    id: "nude-mirror-gloss",
    slug: "nude-mirror-gloss",
    name: "Nude Mirror Gloss",
    tagline: "Your-lips-but-better shine",
    category: "gloss",
    finish: "Sheer",
    price: 9500,
    compareAt: null,
    rating: 4.8,
    reviews: 203,
    badges: [],
    images: [img("nude-mirror"), img("hero-duo")],
    shades: [
      { name: "Bare", hex: "#d9b7a6" },
      { name: "Mocha", hex: "#9c6b55" },
      { name: "Espresso", hex: "#6b4335" },
    ],
    description:
      "Sheer, comfortable nudes designed for melanin-rich skin. Three shades that enhance your natural lip colour instead of washing it out.",
    benefits: ["Shades tested on deep skin", "Lightweight feel", "Everyday shine"],
  },
  {
    id: "crystal-bloom-lip-oil",
    slug: "crystal-bloom-lip-oil",
    name: "Crystal Bloom Lip Oil",
    tagline: "Botanical oil with real flower petals",
    category: "oil",
    finish: "Sheer",
    price: 12000,
    compareAt: null,
    rating: 4.9,
    reviews: 121,
    badges: ["Bestseller"],
    images: [img("crystal-bloom"), img("hydra-plump")],
    shades: [{ name: "Clear Bloom", hex: "#f4ece6" }],
    description:
      "A lightweight blend of rosehip, jojoba and squalane, infused with real dried petals. Nourishes overnight and shines all day.",
    benefits: ["Rosehip + jojoba", "Real flower petals", "Overnight treatment"],
  },
  {
    id: "cocoa-velvet-tint",
    slug: "cocoa-velvet-tint",
    name: "Cocoa Velvet Tint",
    tagline: "Rich brown tint with a soft-blur finish",
    category: "liquid",
    finish: "Satin",
    price: 10500,
    compareAt: null,
    rating: 4.7,
    reviews: 88,
    badges: [],
    images: [img("cocoa-velvet"), img("nude-mirror")],
    shades: [
      { name: "Cocoa", hex: "#5a3324" },
      { name: "Chestnut", hex: "#7a4a35" },
    ],
    description:
      "A velvety, transfer-resistant tint in deep chocolate tones. It sets to a soft satin that doesn't crack or dry out.",
    benefits: ["Transfer-resistant", "Soft satin finish", "8-hour wear"],
  },
  {
    id: "rosewood-matte-liquid-lip",
    slug: "rosewood-matte-liquid-lip",
    name: "Rosewood Matte Liquid Lip",
    tagline: "Featherweight matte that stays put",
    category: "liquid",
    finish: "Matte",
    price: 11000,
    compareAt: null,
    rating: 4.6,
    reviews: 65,
    badges: ["New"],
    images: [img("rosewood-matte"), img("hero-duo")],
    shades: [
      { name: "Rosewood", hex: "#b06e6e" },
      { name: "Mauve", hex: "#8c5a63" },
      { name: "Fig", hex: "#6b3a45" },
    ],
    description:
      "A whipped matte liquid lipstick that feels like nothing on the lips. Rich colour payoff that lasts through meals.",
    benefits: ["Weightless matte", "Lasts through meals", "Doesn't dry out lips"],
  },
  {
    id: "berry-kiss-duo",
    slug: "berry-kiss-duo",
    name: "Berry Kiss Duo",
    tagline: "Gloss + tint, perfectly paired",
    category: "sets",
    finish: "Glossy",
    price: 18500,
    compareAt: 21000,
    rating: 5.0,
    reviews: 57,
    badges: ["Save ₦2,500"],
    images: [img("berry-kiss-duo"), img("cherry-sparkle")],
    shades: [],
    description:
      "Our Cocoa Velvet Tint and Cherry Sparkle Gloss in one set. Layer them for a deep berry stain with a shine on top.",
    benefits: ["Two full-size products", "Made to layer", "Gift-ready box"],
  },
  {
    id: "pink-satin-collection",
    slug: "pink-satin-collection",
    name: "Pink Satin Collection",
    tagline: "Six pinks, one gorgeous box",
    category: "sets",
    finish: "Satin",
    price: 42000,
    compareAt: 52000,
    rating: 4.9,
    reviews: 34,
    badges: ["Limited"],
    images: [img("pink-satin-set"), img("hero-duo")],
    shades: [],
    description:
      "Six mini glosses, from baby pink to hot fuchsia, in a keepsake satin-lined box. Made for gifting, or keeping.",
    benefits: ["6 mini glosses", "Keepsake box", "Limited edition"],
  },
];

export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug);

export const getCategory = (id) => CATEGORIES.find((c) => c.id === id);

export const getRelated = (product, n = 4) =>
  [
    ...PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category),
    ...PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category),
  ].slice(0, n);

export const BESTSELLERS = PRODUCTS.filter((p) => p.badges.includes("Bestseller") || p.rating >= 4.9).slice(0, 4);

export const SHIPPING = {
  freeThreshold: 50000,
  lagos: 2500,
  nationwide: 4500,
};
