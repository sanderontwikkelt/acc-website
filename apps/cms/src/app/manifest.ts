import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sockwave",
    short_name: "Sockwave",
    description: "Sockwave: Verantwoorde Nederlandse Kledingproductie",
    start_url: "/",
    display: "standalone",
    background_color: "#FCF9EC",
    theme_color: "#64BD6E",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
