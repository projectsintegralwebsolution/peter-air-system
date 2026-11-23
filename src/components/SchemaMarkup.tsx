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
    "address": [
      {
        "@type": "PostalAddress",
        "name": "Head Office",
        "streetAddress": "106, Dattani Prism IT Park-1, Vasai West",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "401202",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "name": "Factory Address",
        "streetAddress": "Unit No. – 01, 02, 03 and 06, Agarwal Industrial Estate, Golani, Vasai East, Palghar",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "401208",
        "addressCountry": "IN"
      }
    ],
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

export const ManufacturingServiceSchema: React.FC<{
  name: string;
  description: string;
  image: string;
  serviceType: string;
  category?: string;
  url: string;
  areaServed?: string[];
  offerings?: string[];
}> = ({ name, description, image, serviceType, category, url, areaServed, offerings }) => {
  const imageUrl = image.startsWith("http") ? image : `${siteConfig.url}${image}`;
  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "serviceType": serviceType,
    "category": category || "Air Handling & HVAC Systems",
    "description": description,
    "image": imageUrl,
    "url": url,
    "brand": {
      "@type": "Brand",
      "name": siteConfig.name
    },
    "provider": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url,
      "logo": `${siteConfig.url}/images/PETER-AIR-LOGO.png`,
      "telephone": siteConfig.contact.phonePrimary,
      "email": siteConfig.contact.emailSales
    },
    "areaServed": (areaServed && areaServed.length > 0 ? areaServed : ["India"]).map((country) => ({
      "@type": "Country",
      "name": country
    })),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  if (offerings && offerings.length > 0) {
    schema.hasOfferCatalog = {
      "@type": "OfferCatalog",
      "name": `${name} Configurations`,
      "itemListElement": offerings.map((item) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": item
        }
      }))
    };
  }

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
  lowPrice?: string;
  highPrice?: string;
  priceCurrency?: string;
  areaServed?: string[];
  additionalProperties?: { name: string; value: string }[];
}> = ({
  name,
  description,
  image,
  category,
  url,
  sku,
  lowPrice,
  highPrice,
  priceCurrency = "INR",
  areaServed,
  additionalProperties,
}) => {
  const imageUrl = image.startsWith("http") ? image : `${siteConfig.url}${image}`;
  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "image": [imageUrl],
    "description": description,
    "category": category || "Cleanroom Equipment & HVAC Systems",
    "brand": {
      "@type": "Brand",
      "name": "Peter Air Systems"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Peter Air Systems",
      "url": siteConfig.url
    },
    "url": url
  };

  if (lowPrice) {
    schema.offers = {
      "@type": highPrice ? "AggregateOffer" : "Offer",
      "url": url,
      "priceCurrency": priceCurrency,
      ...(highPrice
        ? { "lowPrice": lowPrice, "highPrice": highPrice }
        : { "price": lowPrice }),
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "Peter Air Systems"
      },
      ...(areaServed && areaServed.length > 0
        ? {
            "areaServed": areaServed.map((country) => ({
              "@type": "Country",
              "name": country
            }))
          }
        : {})
    };
  }

  if (sku) {
    schema.sku = sku;
    schema.mpn = sku;
  }

  if (additionalProperties && additionalProperties.length > 0) {
    schema.additionalProperty = additionalProperties.map((prop) => ({
      "@type": "PropertyValue",
      "name": prop.name,
      "value": prop.value
    }));
  }

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
