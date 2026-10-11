import { Suspense } from "react";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import HomeSkeleton from "@/components/HomeSkeleton";
import { type Product } from "@/lib/utils";

async function HomeContent() {
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products", {
    cache: "no-store",
  });
  const products: Product[] = res.ok ? await res.json() : [];

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  return (
    <>
      <Hero products={products} />
      <ProductSection title="▲ আজ দাম বেড়েছে" products={risers} />
      <ProductSection title="▼ আজ দাম কমেছে" products={fallers} gray />
      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${products.length}টি পণ্যের আজকের বাজার দর`}
        products={products}
        wide
      />
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}