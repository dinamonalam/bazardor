import { Suspense } from "react";
import Link from "next/link";
import CategoryView from "@/components/CategoryView";
import CategorySkeleton from "@/components/CategorySkeleton";
import type { Product, Category } from "@/lib/utils";

const API = "https://api.api-store.workers.dev/api/bazardor";

async function CategoryContent({ slug }: { slug: string }) {
  let products: Product[] = [];
  let category: Category | null = null;

  try {
    const [pRes, cRes] = await Promise.all([
      fetch(`${API}/products?category=${slug}`, { cache: "no-store" }),
      fetch(`${API}/categories/${slug}`, { cache: "no-store" }),
    ]);
    if (pRes.ok) products = await pRes.json();
    if (cRes.ok) category = await cRes.json();
  } catch {
    // নিচে empty state দেখাবে
  }

  if (!category || !Array.isArray(products) || products.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">😢</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          কোনো পণ্য পাওয়া যায়নি
        </h2>
        <p className="text-gray-500 mb-6">
          এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ক্যাটাগরিটি সঠিক নয়।
        </p>
        <Link href="/" className="btn btn-success text-white">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return <CategoryView products={products} category={category} />;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryContent slug={slug} />
    </Suspense>
  );
}