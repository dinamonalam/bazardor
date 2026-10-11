"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">
        <div className="skeleton h-8 w-48"></div>
        <div className="skeleton h-28 w-full"></div>
        <div className="skeleton h-40 w-full"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <p className="text-gray-500 mb-4">আপনি লগইন করেননি</p>
        <Link href="/signin" className="btn btn-success text-white">
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  const { name, email, image } = session.user;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
      <p className="text-gray-500 text-sm mb-5">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      <div className="bg-white border border-green-100 rounded-2xl p-5 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-16 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
              {image ? (
                <img src={image} alt={name} />
              ) : (
                <span className="text-2xl">{name?.charAt(0) || "U"}</span>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
            <p className="text-gray-500 text-sm">{email}</p>
          </div>
        </div>

        <Link
          href="/profile/update"
          className="btn btn-sm btn-outline btn-error"
        >
          ✏️ তথ্য আপডেট করুন
        </Link>
      </div>

      <div className="bg-white border border-green-100 rounded-2xl p-5">
        <h3 className="font-semibold text-gray-800 mb-4">তথ্য</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500 mb-1">নাম</p>
            <div className="border rounded-lg px-3 py-2 bg-gray-50 font-medium">
              {name}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">ইমেইল</p>
            <div className="border rounded-lg px-3 py-2 bg-gray-50 font-medium">
              {email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}