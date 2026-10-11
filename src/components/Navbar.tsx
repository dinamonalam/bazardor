"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession, signOut } from "@/lib/auth-client";
import { getBanglaDate, type Category } from "@/lib/utils";
import PriceTicker from "./PriceTicker";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch("https://api.api-store.workers.dev/api/bazardor/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Category error:", err));
  }, []);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট সফল হয়েছে!");
          router.push("/");
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🛒</span>
          <div>
            <h1 className="text-xl font-bold text-green-700 leading-tight">বাজার দর</h1>
            <p className="text-xs text-gray-500">{getBanglaDate()}</p>
          </div>
        </Link>

        <button
          className="lg:hidden btn btn-ghost btn-sm"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <div className="hidden lg:flex items-center gap-2">
          {isPending ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : session ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-2">
                <div className="avatar">
                  <div className="w-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                    {session.user.image ? (
                      <img src={session.user.image} alt={session.user.name} />
                    ) : (
                      <span className="text-sm">{session.user.name?.charAt(0) || "U"}</span>
                    )}
                  </div>
                </div>
                <span>{session.user.name}</span>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white rounded-box shadow-lg z-10 w-56 p-2"
              >
                <li className="px-3 py-1 text-xs text-gray-500 pointer-events-none">
                  {session.user.email}
                </li>
                <li>
                  <Link href="/profile">👤 আমার প্রোফাইল</Link>
                </li>
                <li>
                  <button onClick={handleSignOut}>🚪 সাইন আউট</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-sm btn-outline btn-success">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-sm btn-success text-white">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <nav className={`${menuOpen ? "block" : "hidden"} lg:block`}>
            <ul className="flex flex-wrap items-center gap-1 py-2">
              {categories.map((cat) => {
                const isActive = pathname === `/category/${cat.slug}`;
                return (
                  <li key={cat.slug}>
                    <Link
                      href={`/category/${cat.slug}`}
                      className={`btn btn-sm ${
                        isActive
                          ? "btn-success text-white"
                          : "btn-ghost text-gray-600 hover:bg-green-50"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>{cat.icon}</span>
                      {cat.nameBn}
                    </Link>
                  </li>
                );
              })}

              {menuOpen && (
                <li className="w-full mt-2 flex gap-2 lg:hidden">
                  {session ? (
                    <>
                      <Link href="/profile" className="btn btn-sm btn-outline btn-success flex-1">
                        প্রোফাইল
                      </Link>
                      <button onClick={handleSignOut} className="btn btn-sm btn-error text-white flex-1">
                        সাইন আউট
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/signin" className="btn btn-sm btn-outline btn-success flex-1">
                        সাইন ইন
                      </Link>
                      <Link href="/signup" className="btn btn-sm btn-success text-white flex-1">
                        সাইন আপ
                      </Link>
                    </>
                  )}
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>

      <PriceTicker />
    </header>
  );
}