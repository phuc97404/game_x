"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import mockAccounts from "./admin/initialAccounts.json";
import { url } from "inspector";

const games = ["Liên Quân", "Free Fire"];
const ranks = ["Cao Thủ", "Huyền Thoại", "Kim Cương", "Bạch Kim"];
const priceRanges = [
  { label: "< 150.000", min: 0, max: 150000 },
  { label: "150.000 - 250.000", min: 150000, max: 250000 },
  { label: "> 250.000", min: 250000, max: Infinity },
];

export default function Home() {
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedRank, setSelectedRank] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [search, setSearch] = useState("");

  // Chỉ filter cho danh sách hot, danh sách mới luôn lấy 4 acc mới nhất
  const filterHotAccounts = (accounts: typeof mockAccounts) => {
    return accounts.filter((acc) => {
      const matchGame = selectedGame ? acc.game === selectedGame : true;
      const matchRank = selectedRank ? acc.rank === selectedRank : true;
      const matchPrice = selectedPrice
        ? (() => {
            const range = priceRanges.find((r) => r.label === selectedPrice);
            return range
              ? acc.price >= range.min && acc.price < range.max
              : true;
          })()
        : true;
      const matchSearch = search
        ? acc.game.toLowerCase().includes(search.toLowerCase()) ||
          acc.rank.toLowerCase().includes(search.toLowerCase()) ||
          acc.id.toLowerCase().includes(search.toLowerCase())
        : true;
      return matchGame && matchRank && matchPrice && matchSearch;
    });
  };

  // Lấy 4 tài khoản mới nhất (isNew, không ẩn, không filter)
  const newAccounts = mockAccounts
    .filter((a) => a.isNew && !a.hidden)
    .slice(0, 4);
  // Lấy 12 acc hot (không ẩn, có filter)
  const hotAccounts = filterHotAccounts(
    mockAccounts.filter((a) => a.isHot && !a.hidden)
  ).slice(0, 12);

  return (
    <div className="container mx-auto p-4 font-sans relative">
      {/* Nút Login Admin */}
      <div className="absolute top-4 right-4 z-20">
        <Link
          href="/admin"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-5 py-2 rounded-full shadow hover:from-purple-600 hover:to-blue-600 transition-colors text-base"
        >
          Đăng nhập Admin
        </Link>
      </div>
      {/* Banner + Slider quảng cáo */}
      <div className="mb-8">
        {/* Banner */}
        <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-lg mb-4 flex items-center justify-center">
          <img
            src="/globe.svg"
            alt="Banner"
            className="absolute w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700/70 to-purple-600/60" />
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-2 animate-pulse">
              MUA ACC GAME UY TÍN - GIÁ TỐT
            </h1>
            <p className="text-lg md:text-xl text-white font-medium drop-shadow">
              Đăng nhập an toàn, giao dịch nhanh chóng, hỗ trợ 24/7
            </p>
          </div>
        </div>
        {/* Slider quảng cáo */}
        <div className="w-full overflow-x-auto flex gap-6 pb-2">
          {[
            { icon: "🔥", text: "Khuyến mãi 20% cho acc mới!" },
            { icon: "🎁", text: "Tặng skin ngẫu nhiên khi mua acc hot!" },
            { icon: "⚡", text: "Nạp tiền siêu tốc, nhận acc ngay!" },
          ].map((item, i) => (
            <div
              key={i}
              className="min-w-[320px] h-28 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-xl shadow-lg flex items-center px-6 text-white text-lg font-semibold gap-4 transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer border-2 border-transparent hover:border-yellow-300"
            >
              <span className="text-3xl mr-2 animate-bounce">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Nút xem tất cả */}
        {/* <div className="w-full flex justify-center mt-2">
          <Link
            href="/acc"
            className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2 px-6 rounded-full shadow hover:from-purple-500 hover:to-pink-500 transition-colors text-lg"
          >
            Xem tất cả các nick mới
          </Link>
        </div> */}
      </div>

      {/* Ô tìm kiếm */}
      {/* <div className="mb-4 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm theo tên game, rank hoặc mã acc..."
          className="w-full max-w-md px-4 py-2 rounded-full border-2 border-blue-300 shadow focus:ring-2 focus:ring-blue-400 outline-none text-lg"
        />
      </div> */}

      {/* Bộ lọc */}
      {/* <div className="mb-8 flex flex-wrap gap-6 items-end bg-white/80 rounded-2xl shadow p-4">
        <div>
          <label className="block font-semibold mb-1 text-blue-700">Game</label>
          <select
            className="border-2 border-blue-300 rounded-full px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
          >
            <option value="">Tất cả</option>
            {games.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1 text-blue-700">Rank</label>
          <select
            className="border-2 border-purple-300 rounded-full px-3 py-2 shadow-sm focus:ring-2 focus:ring-purple-400 outline-none"
            value={selectedRank}
            onChange={(e) => setSelectedRank(e.target.value)}
          >
            <option value="">Tất cả</option>
            {ranks.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1 text-blue-700">
            Giá tiền
          </label>
          <select
            className="border-2 border-pink-300 rounded-full px-3 py-2 shadow-sm focus:ring-2 focus:ring-pink-400 outline-none"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            <option value="">Tất cả</option>
            {priceRanges.map((p) => (
              <option key={p.label} value={p.label}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div> */}

      {/* Danh sách acc mới */}
      <h2 className="text-2xl font-extrabold mb-3 text-pink-600 flex items-center gap-2">
        <span className="text-3xl">🆕</span> Tài khoản mới
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {newAccounts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            Không có tài khoản phù hợp.
          </div>
        ) : (
          newAccounts.map((account) => (
            <div
              key={account.id}
              className="relative border-2 border-blue-200 rounded-2xl p-4 bg-gradient-to-br from-white via-blue-50 to-purple-50 shadow-lg transition-transform hover:scale-105 hover:border-pink-400 group"
            >
              <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1 animate-bounce">
                <span>🆕</span> Mới
              </div>
              <Image
                src={account.image}
                alt={account.game}
                width={220}
                height={220}
                className="w-full h-[200px] rounded-xl mb-2 shadow-md cover"
              />
              <h3 className="text-lg font-bold text-blue-700 mb-1 flex items-center gap-1">
                {account.game}
              </h3>
              <div className="text-xs text-gray-500 mb-1">
                ID:{" "}
                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                  {account.id}
                </span>
              </div>
              <p className="text-sm text-gray-700">
                Rank:{" "}
                <span className="font-semibold text-purple-600">
                  {account.rank}
                </span>
              </p>
              <p className="text-sm text-gray-700">
                Giá:{" "}
                <span className="font-bold text-pink-600">
                  {account.price.toLocaleString()} VNĐ
                </span>
              </p>
              <p className="text-sm text-gray-700 mb-2">
                Số lượng skin:{" "}
                <span className="font-semibold">{account.skins}</span>
              </p>
              <Link
                href={`/acc/${account.id}`}
                className="block text-center bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2 rounded-lg mt-2 shadow hover:from-purple-500 hover:to-pink-500 transition-colors"
              >
                Xem chi tiết
              </Link>
            </div>
          ))
        )}
      </div>
      {/* Ô tìm kiếm */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm theo tên game, rank hoặc mã acc..."
          className="w-full max-w-md px-4 py-2 rounded-full border-2 border-blue-300 shadow focus:ring-2 focus:ring-blue-400 outline-none text-lg"
        />
      </div>

      {/* Bộ lọc */}
      <div className="mb-8 flex flex-wrap gap-6 items-end bg-white/80 rounded-2xl shadow p-4">
        <div>
          <label className="block font-semibold mb-1 text-blue-700">Game</label>
          <select
            className="border-2 border-blue-300 rounded-full px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
          >
            <option value="">Tất cả</option>
            {games.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1 text-blue-700">Rank</label>
          <select
            className="border-2 border-purple-300 rounded-full px-3 py-2 shadow-sm focus:ring-2 focus:ring-purple-400 outline-none"
            value={selectedRank}
            onChange={(e) => setSelectedRank(e.target.value)}
          >
            <option value="">Tất cả</option>
            {ranks.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1 text-blue-700">
            Giá tiền
          </label>
          <select
            className="border-2 border-pink-300 rounded-full px-3 py-2 shadow-sm focus:ring-2 focus:ring-pink-400 outline-none"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            <option value="">Tất cả</option>
            {priceRanges.map((p) => (
              <option key={p.label} value={p.label}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Danh sách acc hot */}
      <h2 className="text-2xl font-extrabold mb-3 text-yellow-500 flex items-center gap-2">
        <span className="text-3xl">🔥</span> Tài khoản hot
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hotAccounts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            Không có tài khoản phù hợp.
          </div>
        ) : (
          hotAccounts.map((account) => (
            <div
              key={account.id}
              className="relative border-2 border-yellow-200 rounded-2xl p-4 bg-gradient-to-br from-white via-yellow-50 to-pink-50 shadow-lg transition-transform hover:scale-105 hover:border-yellow-400 group"
            >
              <div className="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
                <span>🔥</span> Hot
              </div>
              <Image
                src={account.image}
                alt={account.game}
                width={220}
                height={220}
                className="w-full h-[200px] rounded-xl mb-2 shadow-md cover"
              />
              <h3 className="text-lg font-bold text-yellow-700 mb-1 flex items-center gap-1">
                {account.game}
              </h3>
              <div className="text-xs text-gray-500 mb-1">
                ID:{" "}
                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                  {account.id}
                </span>
              </div>
              <p className="text-sm text-gray-700">
                Rank:{" "}
                <span className="font-semibold text-purple-600">
                  {account.rank}
                </span>
              </p>
              <p className="text-sm text-gray-700">
                Giá:{" "}
                <span className="font-bold text-pink-600">
                  {account.price.toLocaleString()} VNĐ
                </span>
              </p>
              <p className="text-sm text-gray-700 mb-2">
                Số lượng skin:{" "}
                <span className="font-semibold">{account.skins}</span>
              </p>
              <Link
                href={`/acc/${account.id}`}
                className="block text-center bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-bold py-2 rounded-lg mt-2 shadow hover:from-pink-400 hover:to-yellow-400 transition-colors"
              >
                Xem chi tiết
              </Link>
            </div>
          ))
        )}
      </div>
      {/* Nút xem tất cả */}
      <div className="w-full flex justify-center mt-2 mb-8">
        <Link
          href="/acc"
          className="inline-block bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-bold py-2 px-6 rounded-full shadow hover:from-pink-400 hover:to-yellow-400 transition-colors text-lg"
        >
          Xem tất cả các nick hot
        </Link>
      </div>
      {/* Footer */}
      <footer className="w-full mt-8 py-6 bg-gradient-to-r from-blue-700 to-purple-700 text-white rounded-t-2xl shadow-inner text-center">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
          <div className="text-lg font-bold">
            GameX - Mua bán acc game uy tín
          </div>
          <div className="text-sm">
            Liên hệ:{" "}
            <a
              href="mailto:support@gamex.vn"
              className="underline hover:text-yellow-300"
            >
              support@gamex.vn
            </a>{" "}
            | Hotline:{" "}
            <a
              href="tel:0123456789"
              className="underline hover:text-yellow-300"
            >
              0123 456 789
            </a>
          </div>
          <div className="text-xs">
            © {new Date().getFullYear()} GameX. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
