import { getBanglaDate, toBengaliNumber, type Product } from "@/lib/utils";

export default function Hero({ products }: { products: Product[] }) {
  const total = products.length;
  const up = products.filter((p) => p.change.dir === "up").length;
  const down = products.filter((p) => p.change.dir === "down").length;

  return (
    <section className="max-w-6xl mx-auto px-4 pt-6 pb-2">
      <div className="bg-white border border-green-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
        {/* বাম পাশ */}
        <div className="flex-1">
          <span className="badge badge-success badge-outline mb-3">
            {getBanglaDate()}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-snug">
            আজকের বাজারের দাম এক নজরে
          </h2>
          <p className="text-gray-500 mb-5 max-w-xl text-sm md:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#সব-পণ্য" className="btn btn-success text-white btn-sm sm:btn-md">
              সব পণ্য দেখুন
            </a>
            <a href="#সব-পণ্য" className="btn btn-outline btn-sm sm:btn-md">
              🧺 বাজার তুলনা
            </a>
          </div>
        </div>

        {/* ডান পাশ: stats কার্ড */}
        <div className="grid grid-cols-3 divide-x divide-green-100 bg-green-50 border border-green-100 rounded-xl text-center md:min-w-72">
          <div className="p-4">
            <p className="text-xs text-gray-500">মোট</p>
            <p className="text-3xl font-bold text-gray-900">{toBengaliNumber(total)}</p>
            <p className="text-xs text-gray-500">টি পণ্য</p>
          </div>
          <div className="p-4">
            <p className="text-xs text-gray-500">বেড়েছে</p>
            <p className="text-3xl font-bold text-red-500">{toBengaliNumber(up)}</p>
            <p className="text-xs text-gray-500">টি পণ্য</p>
          </div>
          <div className="p-4">
            <p className="text-xs text-gray-500">কমেছে</p>
            <p className="text-3xl font-bold text-green-600">{toBengaliNumber(down)}</p>
            <p className="text-xs text-gray-500">টি পণ্য</p>
          </div>
        </div>
      </div>
    </section>
  );
}