import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "AgriHub PH",
    short_name: "AgriHub",
    description: "Offline-capable agriculture and fisheries operations platform.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f4faf5",
    theme_color: "#059669",
    orientation: "any",
    categories: ["business", "productivity", "agriculture"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
