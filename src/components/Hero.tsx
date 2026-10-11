import { getBanglaDate, toBengaliNumber, type Product } from "@/lib/utils";

export default function Hero({ products }: { products: Product[] }) {
  const total = products.length;
  const up = products.filter((p) => p.change.dir === "up").length;
  const down = products.filter((p) => p.change.dir === "down").length;

  return (
    <section className="bg-gradient-to-r from-green-50 to-green-100 py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <span className="badge badge-success badge-outline mb-3">
            {getBanglaDate()}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-snug">
            আজকের বাজারের দাম এক নজরে
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-success text-white">
            সব পণ্য দেখুন
          </a>
        </div>

        <div className="flex-1 flex flex-col items-center gap-4">
          <div className="text-8xl">🧺</div>
          <div className="grid grid-cols-3 gap-4 bg-white/70 border rounded-2xl p-4 text-center">
            <div>
              <p className="text-xs text-gray-500">মোট</p>
              <p className="text-3xl font-bold text-green-700">{toBengaliNumber(total)}</p>
              <p className="text-xs text-gray-500">টি পণ্য</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">বেড়েছে</p>
              <p className="text-3xl font-bold text-red-500">{toBengaliNumber(up)}</p>
              <p className="text-xs text-gray-500">টি পণ্য</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">কমেছে</p>
              <p className="text-3xl font-bold text-green-600">{toBengaliNumber(down)}</p>
              <p className="text-xs text-gray-500">টি পণ্য</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}