import Link from "next/link";

export default function Header() {
  return (
    <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-lg mb-4 flex items-center justify-center">
      <img
        src="/globe.svg"
        alt="Banner"
        className="absolute w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700/70 to-purple-600/60" />
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-4xl md:text-3xl font-extrabold text-white drop-shadow-lg mb-2 animate-pulse">
          MUA ACC GAME UY TÍN - GIÁ TỐT
        </h1>
        <p className="text-lg md:text-xl text-white font-medium drop-shadow">
          Đăng nhập an toàn, giao dịch nhanh chóng, hỗ trợ 24/7
        </p>
      </div>
    </div>
  );
}
