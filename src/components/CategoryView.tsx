"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import SortDropdown from "./SortDropdown";
import type { Product, Category } from "@/lib/utils";

export default function CategoryView({
  products,
  category,
}: {
  products: Product[];
  category: Category;
}) {
  const [sortBy, setSortBy] = useState("default");

  const sorted = [...products].sort((a, b) => {
    if (sortBy === "price-asc") return a.today - b.today;
    if (sortBy === "price-desc") return b.today - a.today;
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span>{category.icon}</span>
            {category.nameBn}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            এই ক্যাটাগরিতে মোট {products.length}টি পণ্য
          </p>
        </div>
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}