"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp, signOut } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে!");
      return;
    }
    if (password !== confirm) {
      toast.error("পাসওয়ার্ড মিলছে না!");
      return;
    }

    setLoading(true);
    const { error } = await signUp.email({ name, email, password });

    if (error) {
      toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে!");
      setLoading(false);
      return;
    }

    // BetterAuth সাইন আপের পর অটো লগইন করে দেয়। Assignment অনুযায়ী
    // লগইন পেজে পাঠাতে হবে, তাই আগে সাইন আউট করে নিচ্ছি।
    await signOut();
    toast.success("রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন।");
    router.push("/signin");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="card bg-white border shadow-lg w-full max-w-md">
        <div className="card-body">
          <div className="text-center mb-2">
            <h1 className="text-2xl font-bold text-gray-800">
              অ্যাকাউন্ট তৈরি করুন
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              বাজার দর-এ আপনাকে স্বাগতম
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="label">
                <span className="label-text font-medium">নাম</span>
              </label>
              <input
                type="text"
                placeholder="আপনার নাম"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">ইমেইল</span>
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">পাসওয়ার্ড</span>
              </label>
              <input
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">পাসওয়ার্ড নিশ্চিত করুন</span>
              </label>
              <input
                type="password"
                placeholder="আবার লিখুন"
                className="input input-bordered w-full"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success text-white w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "রেজিস্টার করুন"
              )}
            </button>
          </form>

          <div className="divider text-gray-400 text-sm">অথবা</div>

          <SocialButtons callbackURL="/" verb="সাইন আপ" />

          <p className="text-center text-sm text-gray-500 mt-4">
            ইতোমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="text-green-600 font-semibold hover:underline">
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}