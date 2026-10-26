import React from "react";
import { siteConfig } from "@/data/siteConfig";

export const OrganizationSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.name,
    "legalName": siteConfig.legalName,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/images/PETER-AIR-LOGO.png`,
    "description": siteConfig.description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Unit No. - 01, 02, 03 and 06, Agarwal Industrial Estate, Golani, Vasai East",
      "addressLocality": "Palghar, Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "401208",
      "addressCountry": "IN"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": siteConfig.contact.phonePrimary,
        "contactType": "sales",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      },
      {
        "@type": "ContactPoint",
        "telephone": siteConfig.contact.phoneSecondary,
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const WebSiteSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteConfig.url}/search/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const ProductSchema: React.FC<{
  name: string;
  description: string;
  image: string;
  category?: string;
  url: string;
}> = ({ name, description, image, category, url }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "image": image.startsWith("http") ? image : `${siteConfig.url}${image}`,
    "description": description,
    "category": category || "Cleanroom Equipment & HVAC Systems",
    "brand": {
      "@type": "Brand",
      "name": "Peter Air Systems"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Peter Air Systems"
    },
    "url": url
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const FAQSchema: React.FC<{
  faqs: { question: string; answer: string }[];
}> = ({ faqs }) => {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const BreadcrumbSchema: React.FC<{
  items: { name: string; url: string }[];
}> = ({ items }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const ArticleSchema: React.FC<{
  title: string;
  description: string;
  image: string;
  datePublished: string;
  url: string;
}> = ({ title, description, image, datePublished, url }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image.startsWith("http") ? image : `${siteConfig.url}${image}`,
    "datePublished": datePublished,
    "author": {
      "@type": "Organization",
      "name": "Peter Air Systems Engineering Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.url}/images/PETER-AIR-LOGO.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
