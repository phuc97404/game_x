export default function Footer() {
  return (
    <footer className="w-full mt-8 py-6 bg-gradient-to-r from-blue-700 to-purple-700 text-white rounded-t-2xl shadow-inner text-center">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <div className="text-lg font-bold">GameX - Mua bán acc game uy tín</div>
        <div className="text-sm">
          Liên hệ:{" "}
          <a
            href="mailto:support@gamex.vn"
            className="underline hover:text-yellow-300"
          >
            support@gamex.vn
          </a>{" "}
          | Hotline:{" "}
          <a href="tel:0123456789" className="underline hover:text-yellow-300">
            0123 456 789
          </a>
        </div>
        <div className="text-xs">
          © {new Date().getFullYear()} GameX. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
