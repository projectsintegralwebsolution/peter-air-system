"use client";

import React, { useState } from "react";
import { CategoryCard } from "./CategoryCard";
import { EnquiryModal } from "./EnquiryModal";

export interface CategoryItem {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  featuredImage: string;
  productSlugs: string[];
}

export interface ProductItem {
  slug: string;
  applications?: string[];
}

interface ProductCategorySectionProps {
  categories: CategoryItem[];
  products: ProductItem[];
}

export const ProductCategorySection: React.FC<ProductCategorySectionProps> = ({
  categories,
  products,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => {
          const primaryProd = products.find((prod) =>
            cat.productSlugs.includes(prod.slug)
          );
          const primaryApp = primaryProd?.applications?.[0];
          return (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              slug={cat.slug}
              name={cat.name}
              shortDescription={cat.shortDescription}
              featuredImage={cat.featuredImage}
              productCount={cat.productSlugs.length}
              primaryApplication={primaryApp}
              onEnquire={() => setSelectedCategory(cat.name)}
            />
          );
        })}
      </div>

      {/* Exactly ONE modal rendered at the section level, mounted to body via portal */}
      <EnquiryModal
        isOpen={Boolean(selectedCategory)}
        onClose={() => setSelectedCategory(null)}
        productName={selectedCategory || ""}
        sourceContext={`Homepage Category: ${selectedCategory || ""}`}
      />
    </>
  );
};
