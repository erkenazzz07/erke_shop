export type JournalBlock =
  | { readonly kind: "paragraph"; readonly text: string }
  | { readonly kind: "quote"; readonly text: string }
  | { readonly kind: "heading"; readonly text: string };

export type JournalEntry = {
  readonly slug: string;
  readonly title: string;
  readonly kicker: string;
  readonly dateIso: string;
  readonly readMinutes: number;
  readonly excerpt: string;
  /** Product slug whose photo is used as the cover. */
  readonly coverProduct: string;
  readonly featuredProducts: readonly string[];
  readonly body: readonly JournalBlock[];
};

export const JOURNAL: readonly JournalEntry[] = [
  {
    slug: "six-in-the-evening",
    title: "Six in the evening",
    kicker: "Colour",
    dateIso: "2026-10-28",
    readMinutes: 4,
    excerpt: "Why this season is dyed in brick, rust and the last light on concrete.",
    coverProduct: "static-fade-track-top-ember",
    featuredProducts: ["static-fade-track-top-ember", "loop-crew-ember", "lane-track-pant-oxblood"],
    body: [
      { kind: "paragraph", text: "Every erke season starts with one hour of the day. For Issue 03 it was six in the evening, the minute the streetlights come on and the city turns from grey to orange." },
      { kind: "paragraph", text: "We took photos of walls, shutters and pavements at that hour for six weeks, then matched each colour to a dye. Ember is the brick across from the studio. Cocoa is wet tarmac. Oxblood is the shutter of the corner shop just before it closes." },
      { kind: "quote", text: "We wanted clothes that look like they belong on the street, not just on it." },
      { kind: "heading", text: "Faded by hand" },
      { kind: "paragraph", text: "The Static Fade track top is dipped twice, by hand, so the gradient lands somewhere different on every piece. If yours fades out higher than the one in the photo, that's the point." },
    ],
  },
  {
    slug: "how-it-should-fit",
    title: "How it should fit",
    kicker: "Fit notes",
    dateIso: "2026-10-12",
    readMinutes: 3,
    excerpt: "Boxy, cropped, loose, relaxed: what our fit words mean and when to size up.",
    coverProduct: "block-cropped-hoodie-mocha",
    featuredProducts: ["block-cropped-hoodie-mocha", "heavy-oversized-hoodie-black", "curb-track-pant-black"],
    body: [
      { kind: "paragraph", text: "We cut almost everything with room in it. That makes sizing feel unfamiliar if you're used to slim fits, so here's what each word on a product page means." },
      { kind: "heading", text: "Boxy and cropped" },
      { kind: "paragraph", text: "Wide through the body, shorter in length. Take your usual size for the intended look. Size up if you want it to hit at the hip." },
      { kind: "heading", text: "Oversized" },
      { kind: "paragraph", text: "Dropped shoulders and long sleeves. Size down once if you'd rather it looked relaxed than big." },
      { kind: "heading", text: "Loose and wide" },
      { kind: "paragraph", text: "Our pants are cut to stack over sneakers. If you're between sizes, go with your waist and let the length do its thing." },
    ],
  },
  {
    slug: "boucle-for-the-block",
    title: "Bouclé for the block",
    kicker: "Fabric",
    dateIso: "2026-09-30",
    readMinutes: 3,
    excerpt: "A fabric from old-school tailoring, cut like a sweatsuit.",
    coverProduct: "boxy-polo-crew-umber",
    featuredProducts: ["boxy-polo-crew-umber", "loop-crew-cocoa", "loop-pant-cocoa"],
    body: [
      { kind: "paragraph", text: "Bouclé is a looped yarn that gives fabric a soft, nubbly surface. It usually ends up in tweed jackets. We wanted to see what happened if you cut it like a tracksuit." },
      { kind: "paragraph", text: "The result is the Loop set and the Boxy Polo Crew: warm, textured pieces that still move like fleece. They're heavier than they look, and they get softer every wash." },
      { kind: "quote", text: "Tailoring fabric, sweatsuit attitude." },
      { kind: "paragraph", text: "Care is simple: wash cold, inside out, and dry flat so the loops keep their shape." },
    ],
  },
];

export function findEntry(slug: string): JournalEntry | undefined {
  return JOURNAL.find((entry) => entry.slug === slug);
}

export function formatDate(dateIso: string): string {
  return new Date(dateIso + "T12:00:00Z").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}
