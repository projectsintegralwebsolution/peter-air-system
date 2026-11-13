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
      <div className="flex flex-wrap justify-center -m-4">
        {categories.map((cat) => {
          const primaryProd = products.find((prod) =>
            cat.productSlugs.includes(prod.slug)
          );
          const primaryApp = primaryProd?.applications?.[0];
          return (
            <div
              key={cat.id}
              className="p-4 w-full md:w-1/2 lg:w-1/3 max-w-md md:max-w-none flex"
            >
              <CategoryCard
                id={cat.id}
                slug={cat.slug}
                name={cat.name}
                shortDescription={cat.shortDescription}
                featuredImage={cat.featuredImage}
                productCount={cat.productSlugs.length}
                primaryApplication={primaryApp}
                onEnquire={() => setSelectedCategory(cat.name)}
              />
            </div>
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
