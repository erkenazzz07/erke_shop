export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
export type Size = (typeof SIZES)[number];

export const GENDERS = ["Men", "Women", "Unisex"] as const;
export type Gender = (typeof GENDERS)[number];

export const CATEGORIES = ["Tops", "Bottoms", "Outerwear"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Product = {
  readonly slug: string;
  readonly name: string;
  readonly colour: string;
  readonly swatch: string;
  readonly priceUsd: number;
  readonly category: Category;
  readonly gender: Gender;
  /** Products sharing a family are colourways of the same style. */
  readonly family: string;
  readonly isNew: boolean;
  readonly description: string;
  readonly details: readonly string[];
  /** Image paths resolved by lib/image-loader.ts. */
  readonly images: readonly string[];
};

// Placeholder photography hotlinked from adidas.com until erke's own shoot is ready.
export const PRODUCTS: readonly Product[] = [
  {
    slug: "loop-crew-ember",
    name: "Loop Crew",
    colour: "Ember",
    swatch: "#D2582B",
    priceUsd: 85,
    category: "Tops",
    gender: "Women",
    family: "loop-crew",
    isNew: true,
    description: "A bouclé crew with a soft, looped hand and a boxy, cropped body. Warm enough to wear on its own into November.",
    details: ["Relaxed, slightly cropped fit", "Looped bouclé knit", "Ribbed cuffs and hem", "Wash cold, dry flat"],
    images: [
      "55d6a8c43f26426381d7827a9c3920cb_9366/KNIT_ESSENTIALS_BOUCLE_CREW_Sweatshirt_Orange_LI0011_000_plp_model.jpg",
      "f535443681494e2591da39f94e6b8a95_9366/KNIT_ESSENTIALS_BOUCLE_CREW_Sweatshirt_Orange_LI0011_23_hover_model.jpg",
    ],
  },
  {
    slug: "loop-crew-cocoa",
    name: "Loop Crew",
    colour: "Cocoa",
    swatch: "#5A3B2A",
    priceUsd: 85,
    category: "Tops",
    gender: "Women",
    family: "loop-crew",
    isNew: false,
    description: "A bouclé crew with a soft, looped hand and a boxy, cropped body. Warm enough to wear on its own into November.",
    details: ["Relaxed, slightly cropped fit", "Looped bouclé knit", "Ribbed cuffs and hem", "Wash cold, dry flat"],
    images: [
      "3d7980c875994fd598fb0a8eda244eeb_9366/KNIT_ESSENTIALS_BOUCLE_CREW_Sweatshirt_Brown_LI0121_000_plp_model.jpg",
      "d8ebe15603eb442dbd8e8dd0705786e1_9366/KNIT_ESSENTIALS_BOUCLE_CREW_Sweatshirt_Brown_LI0121_23_hover_model.jpg",
    ],
  },
  {
    slug: "loop-pant-cocoa",
    name: "Loop Pant",
    colour: "Cocoa",
    swatch: "#5A3B2A",
    priceUsd: 85,
    category: "Bottoms",
    gender: "Women",
    family: "loop-pant",
    isNew: false,
    description: "The matching bouclé pant. High rise, wide straight leg, elastic waist with a flat drawcord.",
    details: ["High rise, wide leg", "Elastic waist, flat drawcord", "Side pockets", "Wash cold, dry flat"],
    images: [
      "c533908ef10f47e682cd8a0edbd640c0_9366/KNIT_ESSENTIALS_BOUCLE_PANTS_Brown_LI0008_000_plp_model.jpg",
      "e445cb5414e4453e93ea261fb7deee8d_9366/KNIT_ESSENTIALS_BOUCLE_PANTS_Brown_LI0008_23_hover_model.jpg",
    ],
  },
  {
    slug: "lane-track-pant-oxblood",
    name: "Lane Track Pant",
    colour: "Oxblood",
    swatch: "#6B1E24",
    priceUsd: 90,
    category: "Bottoms",
    gender: "Women",
    family: "lane-track-pant",
    isNew: true,
    description: "A vintage-cut track pant in a textured knit, with contrast side tape and a long, puddling leg.",
    details: ["Relaxed, long leg", "Textured knit", "Contrast side tape", "Machine wash cold"],
    images: [
      "5b1335f5eb7645f399811f9b62b8db7f_9366/BOUCLE_VINTAGE_TRACK_PANTS_Burgundy_LI0016_000_plp_model.jpg",
      "7917b915730c46e6b8c096182c5b1025_9366/BOUCLE_VINTAGE_TRACK_PANTS_Burgundy_LI0016_23_hover_model.jpg",
    ],
  },
  {
    slug: "block-cropped-hoodie-mocha",
    name: "Block Cropped Hoodie",
    colour: "Mocha",
    swatch: "#6E4B3A",
    priceUsd: 75,
    category: "Tops",
    gender: "Women",
    family: "block-cropped-hoodie",
    isNew: false,
    description: "Heavy brushed fleece cut short and wide, with sleeve stripes and a deep, structured hood.",
    details: ["Cropped, boxy fit", "Brushed-back fleece", "Kangaroo pocket", "Machine wash cold"],
    images: [
      "5b411c22a0954308a46f0025be7c0df5_9366/adiSignature_3-Stripes_Cropped_Pullover_Hoodie_Brown_LI4773_000_plp_model.jpg",
      "0015af8df35d4c09bad5a7c85d5e3d0d_9366/adiSignature_3-Stripes_Cropped_Pullover_Hoodie_Brown_LI4773_23_hover_model.jpg",
    ],
  },
  {
    slug: "block-open-hem-sweat-mocha",
    name: "Block Open-Hem Sweat",
    colour: "Mocha",
    swatch: "#6E4B3A",
    priceUsd: 75,
    category: "Bottoms",
    gender: "Women",
    family: "block-open-hem-sweat",
    isNew: false,
    description: "The hoodie's partner: a fleece sweatpant with an open hem that falls straight over your sneakers.",
    details: ["Regular rise, straight leg", "Brushed-back fleece", "Open hem", "Machine wash cold"],
    images: [
      "52019c4009fc45f792087cfcd4b2a818_9366/adiSignature_3_Stripes_Open_Hem_Sweatpants_Brown_LI3752_000_plp_model.jpg",
      "526f4687f45242d8ac74e072df63ed0c_9366/adiSignature_3_Stripes_Open_Hem_Sweatpants_Brown_LI3752_20_02_model.jpg",
    ],
  },
  {
    slug: "static-fade-track-top-ember",
    name: "Static Fade Track Top",
    colour: "Ember",
    swatch: "#D2582B",
    priceUsd: 120,
    category: "Tops",
    gender: "Unisex",
    family: "static-fade-track-top",
    isNew: true,
    description: "A brushed, hairy-knit track top dyed in a hand-faded gradient. No two fade out quite the same.",
    details: ["Relaxed fit", "Brushed hairy knit", "Full zip, stand collar", "Hand wash cold"],
    images: [
      "02348f89a318416fa96069a93b8f1323_9366/KNIT_COLOR_FADING_HAIRY_TRACK_TOP_Orange_LI0045_000_plp_model.jpg",
      "6bf6d812776e4940b5ae7c852b72c993_9366/KNIT_COLOR_FADING_HAIRY_TRACK_TOP_Orange_LI0045_23_hover_model.jpg",
    ],
  },
  {
    slug: "static-fade-track-top-moss",
    name: "Static Fade Track Top",
    colour: "Moss",
    swatch: "#8DB8A0",
    priceUsd: 120,
    category: "Tops",
    gender: "Unisex",
    family: "static-fade-track-top",
    isNew: true,
    description: "A brushed, hairy-knit track top dyed in a hand-faded gradient. No two fade out quite the same.",
    details: ["Relaxed fit", "Brushed hairy knit", "Full zip, stand collar", "Hand wash cold"],
    images: ["f231cf4472954bc1b529a2cbcf1a49a7_9366/KNIT_COLOR_FADING_HAIRY_TRACK_TOP_Green_LI0041_000_plp_model.jpg"],
  },
  {
    slug: "boxy-polo-crew-umber",
    name: "Boxy Polo Crew",
    colour: "Umber",
    swatch: "#5B4636",
    priceUsd: 90,
    category: "Tops",
    gender: "Men",
    family: "boxy-polo-crew",
    isNew: false,
    description: "An oversized bouclé knit with a polo collar and contrast trims. Sits wide through the shoulder.",
    details: ["Oversized fit", "Bouclé knit", "Polo collar with contrast tipping", "Wash cold, dry flat"],
    images: [
      "98d5bc1dd6e74226a603602ee8d86573_9366/ADIDAS_ORIGINALS_BOUCLE_OVERSIZED_POLO_CREW_Brown_LH9989_000_plp_model.jpg",
      "89e68a14fd3d4ea8acca1aacb72b53f0_9366/ADIDAS_ORIGINALS_BOUCLE_OVERSIZED_POLO_CREW_Brown_LH9989_23_hover_model.jpg",
    ],
  },
  {
    slug: "night-club-jacket-umber",
    name: "Night Club Jacket",
    colour: "Umber",
    swatch: "#5B4636",
    priceUsd: 120,
    category: "Outerwear",
    gender: "Men",
    family: "night-club-jacket",
    isNew: true,
    description: "A checked, lightly padded track jacket with four patch pockets. Wear it with the matching pant.",
    details: ["Regular fit", "Lightly padded", "Four patch pockets", "Machine wash cold"],
    images: [
      "75212a14dd0e4ea3b5a09845c1e8d1b3_9366/WINTER_CLUB_JACKET_Brown_LI2693_000_plp_model.jpg",
      "24307a0df908475597f41668e0442ce3_9366/WINTER_CLUB_JACKET_Brown_LI2693_23_hover_model.jpg",
    ],
  },
  {
    slug: "night-club-pant-umber",
    name: "Night Club Pant",
    colour: "Umber",
    swatch: "#5B4636",
    priceUsd: 100,
    category: "Bottoms",
    gender: "Men",
    family: "night-club-pant",
    isNew: true,
    description: "The checked pant to match the jacket. Relaxed leg, elastic waist, zip ankles.",
    details: ["Relaxed fit", "Elastic waist with drawcord", "Zip ankles", "Machine wash cold"],
    images: [
      "2fe55db44946413cb091f71325b50501_9366/WINTER_CLUB_FB_PANTS_Brown_LI2807_000_plp_model.jpg",
      "de34abb30ac04d5495c81d1bbf706a78_9366/WINTER_CLUB_FB_PANTS_Brown_LI2807_23_hover_model.jpg",
    ],
  },
  {
    slug: "curb-track-pant-black",
    name: "Curb Track Pant",
    colour: "Black",
    swatch: "#1A1A1A",
    priceUsd: 80,
    category: "Bottoms",
    gender: "Men",
    family: "curb-track-pant",
    isNew: false,
    description: "A wide, swishy track pant in recycled tricot. The one you'll reach for every day.",
    details: ["Wide, relaxed leg", "Recycled tricot", "Side stripes", "Machine wash cold"],
    images: [
      "e0a6ce385cea4366ac1dc7c3a620d2a0_9366/FIREBIRD_ADILENIUM_TRACK_PANT_Black_KD2914_000_plp_model.jpg",
      "2ea2593853924fdc90544c576d5d0f93_9366/FIREBIRD_ADILENIUM_TRACK_PANT_Black_KD2914_23_hover_model.jpg",
    ],
  },
  {
    slug: "curb-track-jacket-black",
    name: "Curb Track Jacket",
    colour: "Black",
    swatch: "#1A1A1A",
    priceUsd: 80,
    category: "Outerwear",
    gender: "Men",
    family: "curb-track-jacket",
    isNew: false,
    description: "The classic tricot track jacket with a high collar and side stripes. Pairs with the Curb pant.",
    details: ["Regular fit", "Recycled tricot", "Full zip, high collar", "Machine wash cold"],
    images: ["3fda809117df4d83a8cad870a47ea6d9_9366/Firebird_Track_Jacket_Black_KD8312_000_plp_model.jpg"],
  },
  {
    slug: "metro-quarter-zip-black",
    name: "Metro Quarter Zip",
    colour: "Black",
    swatch: "#1A1A1A",
    priceUsd: 85,
    category: "Tops",
    gender: "Unisex",
    family: "metro-quarter-zip",
    isNew: false,
    description: "A heavyweight fleece quarter-zip with a tall collar. Layers over a tee, under a jacket.",
    details: ["Regular fit", "Heavy fleece", "Quarter zip, tall collar", "Machine wash cold"],
    images: ["9d21401354094880a1559e13e84f8673_9366/adiSignature_NY_Quarter_Zip_Sweatshirt_Black_LD1668_000_plp_model.jpg"],
  },
  {
    slug: "heavy-oversized-hoodie-black",
    name: "Heavy Oversized Hoodie",
    colour: "Black",
    swatch: "#1A1A1A",
    priceUsd: 55,
    category: "Tops",
    gender: "Unisex",
    family: "heavy-oversized-hoodie",
    isNew: false,
    description: "Our everyday hoodie: dropped shoulders, long sleeves and a hood that holds its shape.",
    details: ["Oversized fit", "Heavy brushed fleece", "Kangaroo pocket", "Machine wash cold"],
    images: ["ff5f6b45e726465d96053e50699ed2d5_9366/Essentials_Oversized_Fleece_Hoodie_Black_IY7344_000_plp_model.jpg"],
  },
  {
    slug: "loose-track-pant-moss",
    name: "Loose Track Pant",
    colour: "Moss",
    swatch: "#8DB8A0",
    priceUsd: 75,
    category: "Bottoms",
    gender: "Unisex",
    family: "loose-track-pant",
    isNew: true,
    description: "A loose, low-slung track pant in a washed green with a cuffed ankle you can wear up or down.",
    details: ["Loose fit", "Recycled tricot", "Adjustable ankle", "Machine wash cold"],
    images: ["5793762e687841a0a4b0667a88e44653_9366/FIREBIRD_LOOSE_TRACK_PANTS_Green_KV2235_000_plp_model.jpg"],
  },
];

export function findProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function colourways(product: Product): readonly Product[] {
  return PRODUCTS.filter((candidate) => candidate.family === product.family);
}

export function relatedProducts(product: Product, count = 4): readonly Product[] {
  return PRODUCTS.filter(
    (candidate) =>
      candidate.family !== product.family &&
      (candidate.colour === product.colour || candidate.gender === product.gender),
  ).slice(0, count);
}

export function isSize(value: string): value is Size {
  return (SIZES as readonly string[]).includes(value);
}
