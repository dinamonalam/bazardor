import ProductCard from "./ProductCard";
import { type Product } from "@/lib/utils";

type Props = {
  title: string;
  subtitle?: string;
  products: Product[];
  id?: string;
  gray?: boolean;
  wide?: boolean;
};

export default function ProductSection({ title, subtitle, products, id, gray, wide }: Props) {
  if (products.length === 0) return null;

  return (
    <section id={id} className={`py-8 scroll-mt-32 ${gray ? "bg-gray-50" : ""}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
        </div>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${
            wide ? "xl:grid-cols-4" : ""
          } gap-4`}
        >
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}