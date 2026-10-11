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
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
      {/* হেডার কার্ড */}
      <div className="bg-white border border-green-100 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gray-50 border flex items-center justify-center text-3xl">
          {category.icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{category.nameBn}</h1>
          <p className="text-gray-500 text-sm">
            এই ক্যাটাগরিতে মোট {products.length}টি পণ্য
          </p>
        </div>
      </div>

      {/* সর্ট কার্ড */}
      <div className="bg-white border border-green-100 rounded-2xl px-5 py-3 flex items-center justify-end gap-3">
        <span className="text-sm text-gray-500">সাজান:</span>
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      <p className="text-sm text-gray-500">
        মোট {products.length}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}