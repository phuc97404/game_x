"use client";
import Link from "next/link";
import Image from "next/image";
import mockAccounts from "../admin/initialAccounts.json";
import { useState } from "react";

export default function AccListPage() {
  // Lọc các nick hot (hoặc tất cả nick nếu muốn)
  const [filter, setFilter] = useState("hot");
  const accounts = mockAccounts.filter(
    (a) => !a.hidden && (filter === "all" || a.isHot)
  );

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-3xl font-extrabold text-blue-700">
          Danh sách tài khoản {filter === "hot" ? "HOT" : "TẤT CẢ"}
        </h1>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg font-bold border transition-colors ${
              filter === "hot"
                ? "bg-pink-500 text-white border-pink-500"
                : "bg-white text-pink-500 border-pink-500 hover:bg-pink-50"
            }`}
            onClick={() => setFilter("hot")}
          >
            Nick HOT
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-bold border transition-colors ${
              filter === "all"
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-blue-500 border-blue-500 hover:bg-blue-50"
            }`}
            onClick={() => setFilter("all")}
          >
            Tất cả nick
          </button>
        </div>
      </div>
      {accounts.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          Không có tài khoản nào.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {accounts.map((account) => (
            <Link
              href={`/acc/${account.id}`}
              key={account.id}
              className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:shadow-2xl transition-shadow border border-transparent hover:border-blue-300"
            >
              <Image
                src={account.image}
                alt={account.game}
                width={200}
                height={200}
                className="rounded-lg mb-2 shadow"
              />
              <div className="w-full flex flex-col gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-700">
                    {account.game}
                  </span>
                  {account.isHot && (
                    <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded font-bold ml-2">
                      HOT
                    </span>
                  )}
                  <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded font-mono ml-auto">
                    ID: {account.id}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-blue-50 px-2 py-1 rounded text-blue-700 font-semibold">
                    Rank: {account.rank}
                  </span>
                  <span className="bg-pink-50 px-2 py-1 rounded text-pink-600 font-semibold">
                    Skin: {account.skins}
                  </span>
                  <span className="bg-yellow-50 px-2 py-1 rounded text-yellow-700 font-bold">
                    {account.price.toLocaleString()} VNĐ
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="mt-10 text-center">
        <Link
          href="/"
          className="text-blue-500 hover:underline text-lg font-semibold"
        >
          ← Quay về trang chủ
        </Link>
      </div>
    </div>
  );
}
