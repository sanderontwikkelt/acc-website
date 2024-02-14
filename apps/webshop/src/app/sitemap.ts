import type { MetadataRoute } from "next";

const WEB_URL = "https://www.physis.nl";

export const routes = {
  home: {
    updatedAt: new Date(),
    priority: 1,
    images: [{ url: WEB_URL + "/images/home.jpg", width: 510, height: 852 }],
    title:
      "Kleerlijk: Verantwoorde Nederlandse Kledingproductie | Ervaren Atelier & Vakmanschap",
    description:
      "Geproduceerd in Nederland met vakmensen met een vluchtelingenachtergrond. Ontdek onze transparante aanpak in de fashion industry, unieke kledinglijnen en diensten zoals het maken van samples en productie. Samen voor een positieve impact op klimaat, mens en economie.",
  },
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...Object.entries(routes).map(([route, { updatedAt, priority }]) => ({
      url: `${WEB_URL}/${route}`,
      lastModified: updatedAt,
      priority,
    })),
  ];
}
