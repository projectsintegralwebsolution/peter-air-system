import { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { industries } from "@/data/industries";
import { blogPosts } from "@/data/blogs";
import { getAllBlogSlugs } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // 1. Static Core Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us-peter-air-systems/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/certifications-peter-air-systems-iso-ce-certified-solutions/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-peter-air-systems/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/industries/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/peter-terms-of-service/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // 2. Product Categories
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/${cat.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 3. Products (all exact slugs)
  const productRoutes: MetadataRoute.Sitemap = products.map((prod) => ({
    url: `${baseUrl}/${prod.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.95,
  }));

  // 4. Industries
  const industryRoutes: MetadataRoute.Sitemap = industries.map((ind) => ({
    url: `${baseUrl}/industries/${ind.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 5. Blog Posts (Dynamic from database with static fallback)
  let blogSlugs: string[] = [];
  try {
    blogSlugs = await getAllBlogSlugs();
  } catch (e) {
    blogSlugs = blogPosts.map((p) => p.slug);
  }

  if (!blogSlugs || blogSlugs.length === 0) {
    blogSlugs = blogPosts.map((p) => p.slug);
  }

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...industryRoutes,
    ...blogRoutes,
  ];
}
