import type { Product } from "./types";

// Generate mock spin frames for a product slug (36 frames)
function generateSpinFrames(slug: string, count = 36): string[] {
  return Array.from({ length: count }, (_, i) => {
    const frame = String(i + 1).padStart(3, "0");
    return `/images/products/${slug}/spin/${frame}.jpg`;
  });
}

// Mock product data — heritage formal menswear
export const mockProducts: Product[] = [
  {
    id: "prod_001",
    name: "The Kensington — Two-Piece Suit",
    slug: "kensington-two-piece-suit",
    description:
      "Full-canvas construction in Super 150s Loro Piana wool. Natural shoulder, soft drape chest, and a gently suppressed waist that follows the body without constricting it. Half-lined with Bemberg cupro for breathability across seasons. Pick-stitched lapels and functional surgeon's cuffs — details that distinguish hand from machine. Available in midnight navy and charcoal.",
    priceCents: 195000,
    compareAtCents: null,
    images: [
      "/images/products/kensington-1.jpg",
      "/images/products/kensington-2.jpg",
    ],
    spinFrames: generateSpinFrames("kensington-two-piece-suit"),
    sizes: ["36R", "38R", "40R", "42R", "44R", "46R"],
    outOfStockSizes: ["46R"],
    fabricOptions: [
      { label: "Midnight Navy", value: "midnight-navy" },
      { label: "Charcoal", value: "charcoal" },
      { label: "Slate Grey", value: "slate-grey" },
    ],
    fabric: "Super 150s Wool",
    sku: "AG-KN-2P-001",
    inStock: true,
    category: "suits",
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod_002",
    name: "The Belgravia — Three-Piece Suit",
    slug: "belgravia-three-piece-suit",
    description:
      "Our signature three-piece in a Scabal Super 130s worsted. Full-canvas jacket with peak lapels, five-button waistcoat, and flat-front trousers with extended tab closure. The waistcoat is cut slim with a slight point at the hem — traditional without being costumey. Finished with hand-stitched buttonholes and genuine horn buttons throughout.",
    priceCents: 275000,
    compareAtCents: 325000,
    images: [
      "/images/products/belgravia-1.jpg",
      "/images/products/belgravia-2.jpg",
    ],
    spinFrames: generateSpinFrames("belgravia-three-piece-suit"),
    sizes: ["36R", "38R", "40R", "42R", "44R"],
    outOfStockSizes: [],
    fabricOptions: [
      { label: "Oxford Navy", value: "oxford-navy" },
      { label: "Charcoal Pinstripe", value: "charcoal-pinstripe" },
    ],
    fabric: "Super 130s Worsted",
    sku: "AG-BG-3P-001",
    inStock: true,
    category: "suits",
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod_003",
    name: "The Mayfair — Sport Coat",
    slug: "mayfair-sport-coat",
    description:
      "Unstructured half-canvas blazer in a textured Loro Piana linen-silk blend. Patch pockets, soft shoulder, and a rolled three-button front that naturally sits at two. Fully unlined for a relaxed summer weight. The kind of jacket that crosses from Saturday lunch to Monday morning without trying. Pairs with everything from denim to worsted trousers.",
    priceCents: 145000,
    compareAtCents: null,
    images: [
      "/images/products/mayfair-1.jpg",
      "/images/products/mayfair-2.jpg",
    ],
    spinFrames: generateSpinFrames("mayfair-sport-coat"),
    sizes: ["36R", "38R", "40R", "42R", "44R", "46R"],
    outOfStockSizes: ["36R"],
    fabricOptions: [
      { label: "Tobacco", value: "tobacco" },
      { label: "Oatmeal", value: "oatmeal" },
      { label: "Sage", value: "sage" },
    ],
    fabric: "Linen-Silk Blend",
    sku: "AG-MF-SC-001",
    inStock: true,
    category: "blazers",
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod_004",
    name: "The Savile — Dress Shirt",
    slug: "savile-dress-shirt",
    description:
      "Thomas Mason 140/2 Egyptian cotton poplin. Mother-of-pearl buttons, single-needle tailoring throughout. Split back yoke for a clean drape across the shoulders. Removable collar stays in brass. Cut with a moderate spread collar that sits perfectly under a suit lapel. Available in classic white and pale blue — the only two shirt colours a man truly needs.",
    priceCents: 32500,
    compareAtCents: null,
    images: [
      "/images/products/savile-1.jpg",
      "/images/products/savile-2.jpg",
    ],
    spinFrames: generateSpinFrames("savile-dress-shirt"),
    sizes: ["14.5", "15", "15.5", "16", "16.5", "17"],
    outOfStockSizes: [],
    fabricOptions: [
      { label: "Classic White", value: "classic-white" },
      { label: "Pale Blue", value: "pale-blue" },
    ],
    fabric: "140/2 Egyptian Cotton",
    sku: "AG-SV-DS-001",
    inStock: true,
    category: "shirts",
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod_005",
    name: "The Carlton — Dress Shirt",
    slug: "carlton-dress-shirt",
    description:
      "Albini end-on-end cotton in a subtle Bengal stripe. French cuffs, removable brass collar stays, and a cutaway collar that demands a proper knot. Single-needle construction with hand-attached buttons. The stripe is fine enough to read as texture from across the room, not pattern — which is exactly the point.",
    priceCents: 28500,
    compareAtCents: 35000,
    images: [
      "/images/products/carlton-1.jpg",
      "/images/products/carlton-2.jpg",
    ],
    spinFrames: generateSpinFrames("carlton-dress-shirt"),
    sizes: ["14.5", "15", "15.5", "16", "16.5", "17"],
    outOfStockSizes: ["17"],
    fabricOptions: [
      { label: "Blue Bengal", value: "blue-bengal" },
      { label: "Lilac Stripe", value: "lilac-stripe" },
    ],
    fabric: "Albini End-on-End Cotton",
    sku: "AG-CL-DS-001",
    inStock: true,
    category: "shirts",
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod_006",
    name: "The Regent — Flat-Front Trouser",
    slug: "regent-flat-front-trouser",
    description:
      "High-rise flat-front trouser in a VBC Super 120s flannel. Extended tab waistband with side adjusters — no belt needed, no belt wanted. Deep forward pleats create volume through the thigh before tapering to a clean 17.5cm opening. Curtain-lined waistband for comfort against the body. French bearer for a flat front that stays flat.",
    priceCents: 48500,
    compareAtCents: null,
    images: [
      "/images/products/regent-1.jpg",
      "/images/products/regent-2.jpg",
    ],
    spinFrames: generateSpinFrames("regent-flat-front-trouser"),
    sizes: ["30", "32", "34", "36", "38", "40"],
    outOfStockSizes: [],
    fabricOptions: [
      { label: "Mid Grey Flannel", value: "mid-grey-flannel" },
      { label: "Charcoal Flannel", value: "charcoal-flannel" },
      { label: "Navy", value: "navy" },
    ],
    fabric: "Super 120s Flannel",
    sku: "AG-RG-FT-001",
    inStock: true,
    category: "trousers",
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod_007",
    name: "The Windsor — Silk Tie & Pocket Square",
    slug: "windsor-silk-tie-set",
    description:
      "Seven-fold construction from a single piece of printed silk — no interlining, the tie's body comes from the silk itself. Hand-rolled edges and a self-tipping finish. The accompanying pocket square is cut from the same bolt, giving a cohesive pairing without being matchy. Grenadine weave with a subtle lustre that catches light.",
    priceCents: 17500,
    compareAtCents: null,
    images: [
      "/images/products/windsor-1.jpg",
      "/images/products/windsor-2.jpg",
    ],
    spinFrames: generateSpinFrames("windsor-silk-tie-set"),
    sizes: ["ONE SIZE"],
    outOfStockSizes: [],
    fabricOptions: [
      { label: "Burgundy", value: "burgundy" },
      { label: "Navy", value: "navy" },
      { label: "Forest Green", value: "forest-green" },
    ],
    fabric: "Italian Silk Grenadine",
    sku: "AG-WN-TS-001",
    inStock: true,
    category: "accessories",
    createdAt: new Date().toISOString(),
  },
  {
    id: "prod_008",
    name: "The Oxford — Leather Derby",
    slug: "oxford-leather-derby",
    description:
      "Goodyear-welted derby in full-grain French calf leather. Blake-rapid construction for flexibility without sacrificing structure. Closed lacing, five-eyelet, with a natural leather sole and rubber heel tip. Last carved for a slightly elongated silhouette — elegant without being aggressive. Hand-burnished toe for depth of colour that factory finishing cannot replicate.",
    priceCents: 62500,
    compareAtCents: 78000,
    images: [
      "/images/products/oxford-1.jpg",
      "/images/products/oxford-2.jpg",
    ],
    spinFrames: generateSpinFrames("oxford-leather-derby"),
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
    outOfStockSizes: ["UK 12"],
    fabricOptions: [
      { label: "Dark Brown", value: "dark-brown" },
      { label: "Oxblood", value: "oxblood" },
      { label: "Black", value: "black" },
    ],
    fabric: "Full-Grain French Calf",
    sku: "AG-OX-LD-001",
    inStock: true,
    category: "accessories",
    createdAt: new Date().toISOString(),
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return mockProducts.find((p) => p.slug === slug);
}

export function getProductsByCategory(category?: string): Product[] {
  if (!category || category === "all") return mockProducts;
  return mockProducts.filter((p) => p.category === category);
}
