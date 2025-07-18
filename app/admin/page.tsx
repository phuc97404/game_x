"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function AdminPage() {
  const [accounts, setAccounts] = useState<any[]>([]);
  // Lấy dữ liệu từ API khi load trang
  useEffect(() => {
    fetch("/api/accounts")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAccounts(
            data.map((acc) => ({
              ...acc,
              createdAt: acc.createdAt || new Date().toISOString(),
              updatedAt:
                "updatedAt" in acc && typeof acc.updatedAt === "string"
                  ? acc.updatedAt
                  : acc.createdAt || new Date().toISOString(),
              hidden: acc.hidden ?? false,
            }))
          );
        }
      });
  }, []);

  // Hàm ghi accounts ra file qua API
  const saveAccounts = async (newAccounts: any[]) => {
    await fetch("/api/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAccounts),
    });
    setAccounts(newAccounts);
  };
  const [editing, setEditing] = useState<string | null>(null);
  // Hàm sinh mã ID mới dạng acc_YYYYMMDDHHmmss
  const genNewId = () => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const y = now.getFullYear();
    const m = pad(now.getMonth() + 1);
    const d = pad(now.getDate());
    const h = pad(now.getHours());
    const min = pad(now.getMinutes());
    const s = pad(now.getSeconds());
    return `acc_${y}${m}${d}${h}${min}${s}`;
  };

  const [form, setForm] = useState({
    id: genNewId(),
    game: "",
    rank: "",
    price: "",
    skins: "",
    images: "",
    accountInfo: "",
    sale: "10",
    isHot: true,
    isNew: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    hidden: false,
  });

  // Xử lý nhập liệu
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    // Không cho sửa id nếu là thêm mới
    if (name === "id" && !editing) return;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  // Thêm hoặc cập nhật account
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const now = new Date().toISOString();
    // Xử lý images: chuyển từ textarea (dạng string) sang mảng string
    const imagesArr = form.images
      ? form.images
          .split("\n")
          .map((s: string) => s.trim())
          .filter(Boolean)
      : [];
    if (editing) {
      const newAccounts = accounts.map((acc) =>
        acc.id === editing
          ? {
              ...form,
              price: +form.price,
              skins: +form.skins,
              images: imagesArr,
              hidden: false,
              updatedAt: now,
            }
          : acc
      );
      await saveAccounts(newAccounts);
      setForm({
        id: genNewId(),
        game: "",
        rank: "",
        price: "",
        skins: "",
        images: "",
        accountInfo: "",
        sale: "10",
        isHot: true,
        isNew: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        hidden: false,
      });
    } else {
      const newAccounts = [
        ...accounts,
        {
          ...form,
          id: genNewId(),
          price: +form.price,
          skins: +form.skins,
          images: imagesArr,
          accountInfo: form.accountInfo,
          createdAt: now,
          updatedAt: now,
          hidden: false,
        },
      ];
      await saveAccounts(newAccounts);
      setForm({
        id: genNewId(),
        game: "",
        rank: "",
        price: "",
        skins: "",
        images: "",
        accountInfo: "",
        sale: "10",
        isHot: true,
        isNew: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        hidden: false,
      });
    }
    setEditing(null);
  };

  // Sửa
  const handleEdit = (acc: any) => {
    setForm({
      ...acc,
      price: acc.price + "",
      skins: acc.skins + "",
      images: Array.isArray(acc.images)
        ? acc.images.join("\n")
        : acc.images || "",
      accountInfo: acc.accountInfo || "",
      sale: acc.sale ? acc.sale + "" : "10",
    });
    setEditing(acc.id);
  };

  // Ẩn (xóa mềm)
  const handleHide = async (id: string) => {
    if (confirm("Bạn chắc chắn muốn ẩn tài khoản này?")) {
      const now = new Date().toISOString();
      const newAccounts = accounts.map((acc) =>
        acc.id === id ? { ...acc, hidden: true, updatedAt: now } : acc
      );
      await saveAccounts(newAccounts);
      if (editing === id) setEditing(null);
    }
  };

  // Mở lại acc đã ẩn
  const handleShow = async (id: string) => {
    const now = new Date().toISOString();
    const newAccounts = accounts.map((acc) =>
      acc.id === id ? { ...acc, hidden: false, updatedAt: now } : acc
    );
    await saveAccounts(newAccounts);
  };

  // Hủy
  const handleCancel = () => {
    setForm({
      id: genNewId(),
      game: "",
      rank: "",
      price: "",
      skins: "",
      images: "",
      accountInfo: "",
      sale: "10",
      isHot: true,
      isNew: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      hidden: false,
    });
    setEditing(null);
  };

  return (
    <div className="container mx-auto  p-6">
      <h1 className="text-3xl font-extrabold mb-6 text-blue-700 flex items-center gap-3">
        <span>Quản lý tài khoản game</span>
        <span className="text-base font-normal text-gray-400">
          (Admin Panel)
        </span>
      </h1>
      {/* Form nhập/sửa */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-4 mb-8 flex flex-col gap-3"
      >
        <div className="flex flex-wrap gap-4">
          <input
            name="id"
            value={form.id}
            placeholder="ID"
            required
            className="border rounded px-3 py-2 w-32 bg-gray-100 text-gray-500 cursor-not-allowed"
            disabled
          />
          <select
            name="game"
            value={form.game}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 w-40"
          >
            <option value="">Chọn game</option>
            <option value="Liên Quân">Liên Quân</option>
            <option value="Free Fire">Free Fire</option>
            <option value="Liên Minh Huyền Thoại">Liên Minh Huyền Thoại</option>
          </select>
          <input
            name="rank"
            value={form.rank}
            onChange={handleChange}
            placeholder="Rank"
            required
            className="border rounded px-3 py-2 w-32"
          />
          <select
            name="sale"
            value={form.sale}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-28"
            required
          >
            {Array.from({ length: 9 }, (_, i) => 10 * (i + 1)).map((v) => (
              <option key={v} value={v}>{`Sale ${v}%`}</option>
            ))}
          </select>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Giá"
            type="number"
            required
            className="border rounded px-3 py-2 w-24"
          />
          <input
            name="skins"
            value={form.skins}
            onChange={handleChange}
            placeholder="Số skin"
            type="number"
            required
            className="border rounded px-3 py-2 w-24"
          />
          <textarea
            name="images"
            value={form.images}
            onChange={handleChange}
            placeholder="Link ảnh (mỗi dòng 1 link)"
            className="border rounded px-3 py-2 w-64 h-20 resize-y"
          />
          <input
            name="accountInfo"
            value={form.accountInfo}
            onChange={handleChange}
            placeholder="Dữ liệu tài khoản đăng ký"
            className="border rounded px-3 py-2 w-64"
          />
          {/* Ẩn ô nhập ngày tạo, chỉ lưu tự động */}
        </div>
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              name="isHot"
              checked={form.isHot}
              onChange={handleChange}
            />{" "}
            Hot
          </label>
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              name="isNew"
              checked={form.isNew}
              onChange={handleChange}
            />{" "}
            New
          </label>
        </div>
        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            {editing ? "Cập nhật" : "Thêm mới"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Hủy
            </button>
          )}
        </div>
      </form>
      {/* Danh sách account */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          Danh sách tài khoản
          <span className="text-xs text-gray-400">
            (Click ID để copy, di chuột vào ảnh để xem lớn)
          </span>
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-blue-100 text-gray-700">
                <th className="border px-2 py-1">ID</th>
                <th className="border px-2 py-1">Game</th>
                <th className="border px-2 py-1">Rank</th>
                <th className="border px-2 py-1">Giá (VNĐ)</th>
                <th className="border px-2 py-1">Skin</th>
                <th className="border px-2 py-1">Sale</th>
                <th className="border px-2 py-1">HOT</th>
                <th className="border px-2 py-1">NEW</th>
                <th className="border px-2 py-1">Ảnh</th>
                <th className="border px-2 py-1">TK Đăng ký</th>
                <th className="border px-2 py-1">Ngày tạo</th>
                <th className="border px-2 py-1">Cập nhật</th>
                <th className="border px-2 py-1">Trạng thái</th>
                <th className="border px-2 py-1">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acc) => (
                <tr
                  key={acc.id}
                  className={
                    acc.hidden ? "opacity-60" : "hover:bg-blue-50 transition"
                  }
                >
                  <td
                    className="border px-2 py-1 font-mono cursor-pointer text-blue-700 hover:underline relative group"
                    title="Nhấn để copy ID"
                    onClick={() => {
                      navigator.clipboard.writeText(acc.id);
                    }}
                  >
                    {acc.id}
                    <span className="absolute left-1/2 -translate-x-1/2 -bottom-6 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition">
                      Copy!
                    </span>
                  </td>
                  <td className="border px-2 py-1">{acc.game}</td>
                  <td className="border px-2 py-1">{acc.rank}</td>
                  <td className="border px-2 py-1 text-right font-bold text-pink-600">
                    {acc.price.toLocaleString()}
                  </td>
                  <td className="border px-2 py-1 text-right">{acc.skins}</td>
                  <td className="border px-2 py-1 text-center font-bold text-red-500">
                    {acc.sale ? `${acc.sale}%` : "-"}
                  </td>
                  <td className="border px-2 py-1 text-center">
                    {acc.isHot ? (
                      <span
                        className="inline-flex items-center gap-1 text-pink-600 font-bold"
                        title="Tài khoản HOT"
                      >
                        🔥 <span className="text-xs">HOT</span>
                      </span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="border px-2 py-1 text-center">
                    {acc.isNew ? (
                      <span
                        className="inline-flex items-center gap-1 text-blue-600 font-bold"
                        title="Nick mới"
                      >
                        🆕 <span className="text-xs">NEW</span>
                      </span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="border px-2 py-1">
                    {Array.isArray(acc.images) && acc.images.length > 0 ? (
                      <div className="flex flex-wrap gap-1 items-center">
                        {acc.images.map((img: string, idx: number) => (
                          <div
                            key={img + idx}
                            className="relative group flex items-center justify-center"
                          >
                            <Image
                              src={img}
                              alt={acc.game}
                              width={40}
                              height={40}
                              className="rounded shadow cursor-pointer border border-gray-200 group-hover:opacity-60"
                            />
                            <div className="absolute z-10 hidden group-hover:flex left-1/2 -translate-x-1/2 top-10 bg-white p-2 rounded shadow-xl border border-blue-200">
                              <Image
                                src={img}
                                alt={acc.game}
                                width={180}
                                height={180}
                                className="rounded"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : acc.image ? (
                      <div className="relative group flex items-center justify-center">
                        <Image
                          src={acc.image}
                          alt={acc.game}
                          width={40}
                          height={40}
                          className="rounded shadow cursor-pointer border border-gray-200 group-hover:opacity-60"
                        />
                        <div className="absolute z-10 hidden group-hover:flex left-1/2 -translate-x-1/2 top-10 bg-white p-2 rounded shadow-xl border border-blue-200">
                          <Image
                            src={acc.image}
                            alt={acc.game}
                            width={180}
                            height={180}
                            className="rounded"
                          />
                        </div>
                      </div>
                    ) : null}
                  </td>
                  <td className="border px-2 py-1 font-mono text-xs text-gray-700">
                    {acc.accountInfo || ""}
                  </td>
                  <td
                    className="border px-2 py-1 font-mono text-xs text-gray-700"
                    title={acc.createdAt}
                  >
                    {acc.createdAt ? acc.createdAt.slice(0, 10) : ""}
                  </td>
                  <td
                    className="border px-2 py-1 font-mono text-xs text-gray-700"
                    title={acc.updatedAt}
                  >
                    {acc.updatedAt
                      ? acc.updatedAt.slice(0, 19).replace("T", " ")
                      : ""}
                  </td>
                  <td className="border px-2 py-1 text-center font-bold">
                    {acc.hidden ? (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded">
                        Ẩn
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                        Mở
                      </span>
                    )}
                  </td>
                  <td className="border px-2 py-1 flex gap-2 justify-center items-center">
                    <button
                      onClick={() => handleEdit(acc)}
                      className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500 font-semibold text-xs shadow"
                      title="Sửa thông tin"
                    >
                      Sửa
                    </button>
                    {acc.hidden ? (
                      <button
                        onClick={() => handleShow(acc.id)}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 font-semibold text-xs shadow"
                        title="Mở lại tài khoản"
                      >
                        Mở
                      </button>
                    ) : (
                      <button
                        onClick={() => handleHide(acc.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 font-semibold text-xs shadow"
                        title="Ẩn tài khoản (xóa mềm)"
                      >
                        Ẩn
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
