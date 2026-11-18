export type Look = {
  readonly title: string;
  readonly note: string;
  /** First slug supplies the photo; all slugs are the pieces worn. */
  readonly productSlugs: readonly string[];
};

export const LOOKS: readonly Look[] = [
  { title: "Brick wall", note: "Fade top, worn open.", productSlugs: ["static-fade-track-top-ember", "loose-track-pant-moss"] },
  { title: "Corner shop", note: "The full Night Club set.", productSlugs: ["night-club-jacket-umber", "night-club-pant-umber"] },
  { title: "Bus stop", note: "Cropped and stacked.", productSlugs: ["block-cropped-hoodie-mocha", "block-open-hem-sweat-mocha"] },
  { title: "Late tram", note: "Collar up.", productSlugs: ["boxy-polo-crew-umber", "curb-track-pant-black"] },
  { title: "Shutters down", note: "Oxblood, head to toe.", productSlugs: ["lane-track-pant-oxblood", "loop-crew-cocoa"] },
  { title: "Wet tarmac", note: "Cocoa on cocoa.", productSlugs: ["loop-crew-cocoa", "loop-pant-cocoa"] },
  { title: "Streetlight", note: "Moss, washed out.", productSlugs: ["static-fade-track-top-moss", "loose-track-pant-moss"] },
  { title: "Night bus", note: "All black, one zip.", productSlugs: ["metro-quarter-zip-black", "curb-track-pant-black"] },
];
