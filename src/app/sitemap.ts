import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://spiker.network";

  const routes = [
    { url: "", changeFrequency: "weekly" as const, priority: 1.0 },
    { url: "/technology", changeFrequency: "monthly" as const, priority: 0.9 },
    { url: "/use-cases", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/enterprise", changeFrequency: "monthly" as const, priority: 0.8 },
    { url: "/early-access", changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "/about", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/privacy", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/contact", changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

