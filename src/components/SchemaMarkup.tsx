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

export const LocalBusinessSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Manufacturer"],
    "name": siteConfig.name,
    "legalName": siteConfig.legalName,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/images/PETER-AIR-LOGO.png`,
    "image": `${siteConfig.url}/images/AHU.jpeg`,
    "description": siteConfig.description,
    "telephone": siteConfig.contact.phonePrimary,
    "email": siteConfig.contact.emailSales,
    "priceRange": "$$$",
    "currenciesAccepted": "INR, USD",
    "paymentAccepted": "Bank Transfer, Wire Transfer, Letter of Credit",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Unit No. - 01, 02, 03 and 06, Agarwal Industrial Estate, Golani, Vasai East",
      "addressLocality": "Palghar, Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "401208",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.4084874,
      "longitude": 72.8585635
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "18:30"
      }
    ],
    "hasMap": "https://www.google.com/maps/place/Peter+Air+Systems+%7C+Manufacturer+of+Air+Handling+Units,+Modular+Clean+Room+Doors,+Panels,+Modular+OT,+HVAC+%26+Air+Filters/@19.4084874,72.8585635,17z/"
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
  sku?: string;
}> = ({ name, description, image, category, url, sku }) => {
  const imageUrl = image.startsWith("http") ? image : `${siteConfig.url}${image}`;
  const productSku = sku || url.replace(/\/$/, "").split("/").pop() || "PAS-PROD";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "image": [
      imageUrl
    ],
    "description": description,
    "sku": productSku,
    "mpn": productSku.toUpperCase(),
    "category": category || "Cleanroom Equipment & HVAC Systems",
    "brand": {
      "@type": "Brand",
      "name": "Peter Air Systems"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Peter Air Systems",
      "url": siteConfig.url,
      "logo": `${siteConfig.url}/images/PETER-AIR-LOGO.png`
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "15000",
      "highPrice": "3500000",
      "offerCount": "1",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "INR",
        "valueAddedTaxIncluded": "false"
      },
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "url": url,
      "seller": {
        "@type": "Organization",
        "name": "Peter Air Systems"
      }
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

export const ItemListSchema: React.FC<{
  name: string;
  description: string;
  items: { name: string; url: string; image?: string }[];
}> = ({ name, description, items }) => {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": name,
    "description": description,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "url": item.url,
      ...(item.image ? { "image": item.image.startsWith("http") ? item.image : `${siteConfig.url}${item.image}` } : {})
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
  dateModified?: string;
  url: string;
}> = ({ title, description, image, datePublished, dateModified, url }) => {
  const imageUrl = image.startsWith("http") ? image : `${siteConfig.url}${image}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": [
      imageUrl
    ],
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Organization",
      "name": "Peter Air Systems Engineering Team",
      "url": siteConfig.url
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url,
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
