import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductSkeleton from "@/components/ProductSkeleton";
import {
  formatPrice,
  toBengaliNumber,
  getUnitBn,
  type Product,
} from "@/lib/utils";

const API = "https://api.api-store.workers.dev/api/bazardor";

async function ProductContent({ slug }: { slug: string }) {
  const res = await fetch(`${API}/products`, { cache: "no-store" });
  if (!res.ok) notFound();

  const products: Product[] = await res.json();
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const minPrice = Math.min(...product.markets.map((m) => m.min));
  const maxPrice = Math.max(...product.markets.map((m) => m.max));
  const avgPrice = Math.round(
    product.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) /
      product.markets.length
  );

  const { dir, pct } = product.change;
  const badge =
    dir === "up"
      ? `▲ ${toBengaliNumber(Math.abs(pct).toFixed(1))}%`
      : dir === "down"
      ? `▼ ${toBengaliNumber(Math.abs(pct).toFixed(1))}%`
      : `— ${toBengaliNumber("0.0")}%`;
  const badgeColor =
    dir === "up"
      ? "text-red-500"
      : dir === "down"
      ? "text-green-600"
      : "text-gray-400";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="breadcrumbs text-sm mb-6">
        <ul>
          <li><Link href="/">হোম</Link></li>
          <li>
            <Link href={`/category/${product.category}`}>
              {product.categoryNameBn}
            </Link>
          </li>
          <li className="font-semibold">{product.nameBn}</li>
        </ul>
      </div>

      {/* Summary */}
      <div className="bg-white border rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="text-6xl">{product.image}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {product.nameBn}
              </h1>
              <p className="text-gray-500 mt-1">
                আজকের বাজারের সর্বশেষ দাম ও বিস্তারিত
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="badge badge-outline">
                  {product.categoryIcon} {product.categoryNameBn}
                </span>
                <span className="badge badge-outline">
                  {getUnitBn(product.unit)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center md:min-w-40">
            <p className="text-xs text-gray-500">আজকের দাম</p>
            <p className="text-3xl font-bold text-green-700">
              {formatPrice(product.today)}
            </p>
            <p className="text-xs text-gray-500">টাকা / {getUnitBn(product.unit).replace("প্রতি ", "")}</p>
            <p className={`text-sm font-semibold mt-1 ${badgeColor}`}>{badge}</p>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <h2 className="text-xl font-bold text-gray-800 mb-3">দামের সারসংক্ষেপ</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
          <p className="text-2xl font-bold text-green-700">
            {formatPrice(minPrice)} <span className="text-sm font-normal">টাকা</span>
          </p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
          <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>
          <p className="text-2xl font-bold text-red-600">
            {formatPrice(maxPrice)} <span className="text-sm font-normal">টাকা</span>
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-sm text-gray-500">গড় দাম</p>
          <p className="text-2xl font-bold text-blue-600">
            {formatPrice(avgPrice)} <span className="text-sm font-normal">টাকা</span>
          </p>
        </div>
      </div>

      {/* Market Table */}
      <h2 className="text-xl font-bold text-gray-800 mb-3">
        বাজারভিত্তিক আজকের দাম
      </h2>
      <div className="overflow-x-auto bg-white border rounded-xl mb-8">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>বাজার</th>
              <th>বিভাগ</th>
              <th>সর্বনিম্ন</th>
              <th>সর্বোচ্চ</th>
              <th>গড়</th>
            </tr>
          </thead>
          <tbody>
            {product.markets.map((m) => (
              <tr key={`${m.market}-${m.division}`}>
                <td className="font-medium">{m.market}</td>
                <td>{m.division}</td>
                <td className="text-green-600 font-semibold">
                  {formatPrice(m.min)} টাকা
                </td>
                <td className="text-red-500 font-semibold">
                  {formatPrice(m.max)} টাকা
                </td>
                <td className="font-semibold">
                  {formatPrice(Math.round((m.min + m.max) / 2))} টাকা
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* History */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📊 দামের তুলনা</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            ["আজ", product.today],
            ["গতকাল", product.yesterday],
            ["গত সপ্তাহ", product.lastWeek],
            ["গত মাস", product.lastMonth],
          ].map(([label, value]) => (
            <div key={label as string} className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-lg font-bold">{formatPrice(value as number)} টাকা</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function ProductLoader({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProductContent slug={slug} />;
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductLoader params={params} />
    </Suspense>
  );
}