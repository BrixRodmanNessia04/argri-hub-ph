import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AgriHub - Offline-First Harvest Tracker",
    short_name: "AgriHub",
    description: "Offline-first PWA harvest tracking for agricultural teams and farmers.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#16a34a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
