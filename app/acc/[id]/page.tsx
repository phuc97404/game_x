"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import mockAccounts from "../../admin/initialAccounts.json";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useState } from "react";

export default function AccDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const account = mockAccounts.find((a) => a.id === id);
  const [imgIdx, setImgIdx] = useState(0);
  const images = account
    ? Array.isArray(account.images) && account.images.length > 0
      ? account.images
      : account.image
      ? [account.image]
      : ["/file.svg"]
    : ["/file.svg"];

  if (!account) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Không tìm thấy tài khoản</h1>
        <Link href="/" className="text-blue-500 hover:underline">
          Quay về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl p-6 relative">
      <Header />
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
        {/* Slide ảnh */}
        <div className="relative w-full flex items-center justify-center mb-4">
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-blue-400 text-blue-700 rounded-full p-2 shadow-lg z-10 disabled:opacity-40"
            onClick={() =>
              setImgIdx((i) => (i > 0 ? i - 1 : images.length - 1))
            }
            disabled={images.length <= 1}
            aria-label="Prev image"
          >
            ◀
          </button>
          <Image
            src={images[imgIdx]}
            alt={account.game}
            width={320}
            height={220}
            className="rounded-xl shadow object-cover"
          />
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-blue-400 text-blue-700 rounded-full p-2 shadow-lg z-10 disabled:opacity-40"
            onClick={() =>
              setImgIdx((i) => (i < images.length - 1 ? i + 1 : 0))
            }
            disabled={images.length <= 1}
            aria-label="Next image"
          >
            ▶
          </button>
        </div>
        {/* Hiển thị mức sale và loại tài khoản */}
        <div className="w-full flex flex-col gap-2 mb-4">
          <h1 className="text-3xl font-extrabold text-blue-700 mb-2 flex items-center gap-2">
            {account.game}{" "}
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded font-mono">
              ID: {account.id}
            </span>
          </h1>
          <div className="flex flex-wrap gap-4 text-lg mb-2">
            <div className="bg-blue-50 px-4 py-2 rounded-lg font-semibold text-blue-700 shadow-sm">
              Rank: {account.rank}
            </div>
            <div className="bg-pink-50 px-4 py-2 rounded-lg font-semibold text-pink-600 shadow-sm">
              Số skin: {account.skins}
            </div>
            <div className="bg-yellow-50 px-4 py-2 rounded-lg font-bold text-yellow-700 shadow-sm">
              Giá: {account.price.toLocaleString()} VNĐ
            </div>
            <div className="bg-yellow-100 text-yellow-700 font-bold px-4 py-2 rounded-lg shadow-sm">
              <div className="bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-lg shadow-sm">
                {"accountInfo" in account &&
                  account.accountInfo &&
                  account.accountInfo}
              </div>
              {"sale" in account && account.sale && `Sale ${account.sale}%`}
            </div>
          </div>
          {/* Thông tin nick bổ sung */}
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 shadow-inner mb-2">
            <div>
              <span className="font-semibold">Tài khoản:</span> acc_demo_
              {account.id}@game.vn
            </div>
            <div>
              <span className="font-semibold">Mật khẩu:</span> *******
            </div>
            <div>
              <span className="font-semibold">Email liên kết:</span> acc_demo_
              {account.id}@gmail.com
            </div>
            <div>
              <span className="font-semibold">Ngày tạo:</span> 2023-12-01
            </div>
            <div>
              <span className="font-semibold">Tình trạng:</span>{" "}
              <span className="text-green-600 font-bold">Còn hàng</span>
            </div>
          </div>
        </div>
        {/* Hướng dẫn thanh toán chuyển khoản */}
        <div className="w-full bg-blue-50 rounded-xl p-4 mb-4 mt-2 shadow text-blue-900">
          <div className="font-bold text-lg mb-2 flex items-center gap-2">
            <span className="text-2xl">💳</span> Thanh toán chuyển khoản
          </div>
          <div className="mb-1">Vui lòng chuyển khoản đến:</div>
          <div className="mb-1">
            <span className="font-semibold">Ngân hàng:</span> Vietcombank
          </div>
          <div className="mb-1">
            <span className="font-semibold">Số tài khoản:</span> 0123456789
          </div>
          <div className="mb-1">
            <span className="font-semibold">Chủ tài khoản:</span> NGUYEN VAN A
          </div>
          <div className="mb-1">
            <span className="font-semibold">Số tiền:</span>{" "}
            <span className="text-pink-600 font-bold">
              {account.price.toLocaleString()} VNĐ
            </span>
          </div>
          <div className="mb-1">
            <span className="font-semibold">Nội dung chuyển khoản:</span>{" "}
            <span className="bg-yellow-100 px-2 py-1 rounded font-mono">
              {account.id}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Sau khi chuyển khoản, hệ thống sẽ tự động xác nhận và gửi thông tin
            tài khoản qua email hoặc số điện thoại của bạn.
          </div>
        </div>
        <button
          onClick={() => router.push(`/thanh-toan?id=${account.id}`)}
          className="mt-2 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 rounded-xl shadow hover:from-purple-500 hover:to-pink-500 transition-colors text-xl"
        >
          Mua ngay
        </button>
        <Link href="/" className="mt-4 text-blue-500 hover:underline">
          ← Quay về trang chủ
        </Link>
        {/* Thông tin liên hệ */}
        {/* <div className="w-full mt-8 text-center text-gray-500 text-sm border-t pt-4">
          <div>
            Hỗ trợ 24/7:{" "}
            <a href="tel:0123456789" className="text-blue-600 hover:underline">
              0123 456 789
            </a>{" "}
            | Zalo:{" "}
            <a
              href="https://zalo.me/0123456789"
              className="text-blue-600 hover:underline"
            >
              0123456789
            </a>
          </div>
          <div>
            Email:{" "}
            <a
              href="mailto:support@gamex.vn"
              className="text-blue-600 hover:underline"
            >
              support@gamex.vn
            </a>
          </div>
          <div className="mt-1">
            © {new Date().getFullYear()} GameX. All rights reserved.
          </div>
        </div> */}
        <Footer />
      </div>
    </div>
  );
}
