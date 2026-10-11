import Link from "next/link";
import { formatPrice, toBengaliNumber, getUnitBn, type Product } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const { dir, pct } = product.change;
  const badge =
    dir === "up"
      ? `▲ ${toBengaliNumber(Math.abs(pct).toFixed(1))}%`
      : dir === "down"
      ? `▼ ${toBengaliNumber(Math.abs(pct).toFixed(1))}%`
      : `— ${toBengaliNumber("0.0")}%`;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="card bg-white border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all group"
    >
      <div className="card-body p-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl group-hover:scale-110 transition-transform">
            {product.image}
          </span>
          <div>
            <h3 className="font-semibold text-gray-800 group-hover:text-green-700">
              {product.nameBn}
            </h3>
            <p className="text-xs text-gray-400">{getUnitBn(product.unit)}</p>
          </div>
        </div>
        <div className="flex items-end justify-between mt-auto">
          <div>
            <p className="text-xs text-gray-400">আজকের দাম</p>
            <p className="text-lg font-bold text-gray-800">
              {formatPrice(product.today)}{" "}
              <span className="text-sm font-normal">টাকা</span>
            </p>
          </div>
          <span
            className={`badge badge-sm ${
              dir === "up"
                ? "badge-error text-white"
                : dir === "down"
                ? "badge-success text-white"
                : "badge-ghost"
            }`}
          >
            {badge}
          </span>
        </div>
      </div>
    </Link>
  );
}