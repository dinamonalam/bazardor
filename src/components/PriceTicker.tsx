"use client";

import { useEffect, useState } from "react";
import { formatPrice, toBengaliNumber, type Product } from "@/lib/utils";

const unitMap: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://api.api-store.workers.dev/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Ticker error:", err));
  }, []);

  if (products.length === 0) return null;

  const items = [...products, ...products];

  return (
    <div className="bg-gray-50 border-t border-gray-100 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap py-1.5 flex w-max">
        {items.map((p, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 mx-4 text-sm">
            <span>{p.image}</span>
            <span className="font-medium text-gray-700">{p.nameBn}</span>
            <span className="text-gray-500">
              {formatPrice(p.today)} টাকা/{unitMap[p.unit] || p.unit}
            </span>
            <span
              className={`font-semibold ${
                p.change.dir === "up"
                  ? "text-red-500"
                  : p.change.dir === "down"
                  ? "text-green-600"
                  : "text-gray-400"
              }`}
            >
              {p.change.dir === "up"
                ? `▲ ${toBengaliNumber(Math.abs(p.change.pct).toFixed(1))}%`
                : p.change.dir === "down"
                ? `▼ ${toBengaliNumber(Math.abs(p.change.pct).toFixed(1))}%`
                : `— ${toBengaliNumber("0.0")}%`}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}