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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">আমার প্রোফাইল</h1>

      <div className="card bg-white border shadow mb-6">
        <div className="card-body flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                {image ? (
                  <img src={image} alt={name} />
                ) : (
                  <span className="text-2xl">{name?.charAt(0) || "U"}</span>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
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
      </div>

      <div className="card bg-white border shadow">
        <div className="card-body">
          <h3 className="font-semibold text-gray-700 mb-2">তথ্য</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">নাম</p>
              <p className="font-medium">{name}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">ইমেইল</p>
              <p className="font-medium">{email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}