import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Accuraat",
    short_name: "Accuraat",
    description: "Op Maat Gemaakte Sportsokken met Eigen Logo",
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
