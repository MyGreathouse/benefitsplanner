import type { MetadataRoute } from "next";
import { BENEFITS } from "@/lib/benefits-data";
import { PLANNERS } from "@/lib/planner-data";

const BASE_URL = "https://benefitsplanner.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/benefits`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/planners`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/tools/benefits-eligibility-checker`, changeFrequency: "weekly", priority: 0.9 },
  ];

  const benefitRoutes: MetadataRoute.Sitemap = BENEFITS.map((b) => ({
    url: `${BASE_URL}/benefits/${b.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const plannerRoutes: MetadataRoute.Sitemap = PLANNERS.map((p) => ({
    url: `${BASE_URL}/planners/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...benefitRoutes, ...plannerRoutes];
}
