"use client";

import React from "react";
import { Mail, Twitter, Github } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 text-slate-700">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Tên Công Ty</h3>
            <p className="text-sm text-slate-600 max-w-md">
              Chúng tôi cung cấp các giải pháp chất lượng và đáng tin cậy để giúp doanh nghiệp của bạn phát triển.
            </p>
            <div className="mt-4 flex items-center space-x-3">
              <a
                href="mailto:hello@example.com"
                aria-label="Email"
                className="inline-flex items-center px-3 py-2 rounded-md text-sm bg-white border border-slate-200 hover:bg-slate-100"
              >
                <Mail className="mr-2" size={16} /> hello@example.com
              </a>
            </div>
          </div>

          <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-8">
            <nav aria-label="Liên kết" className="flex gap-8">
              <div>
                <h4 className="text-sm font-medium text-slate-900 mb-2">Sản phẩm</h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li><a href="#" className="hover:underline">Tính năng</a></li>
                  <li><a href="#" className="hover:underline">Bảng giá</a></li>
                  <li><a href="#" className="hover:underline">Tài liệu</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-900 mb-2">Công ty</h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li><a href="#" className="hover:underline">Về chúng tôi</a></li>
                  <li><a href="#" className="hover:underline">Sự nghiệp</a></li>
                  <li><a href="#" className="hover:underline">Liên hệ</a></li>
                </ul>
              </div>
            </nav>

            <div className="flex-1">
              <h4 className="text-sm font-medium text-slate-900 mb-2">Kết nối</h4>
              <div className="flex items-center space-x-3">
                <a
                  href="#"
                  aria-label="Twitter"
                  className="p-2 rounded-md bg-white border border-slate-200 hover:bg-slate-100"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  aria-label="GitHub"
                  className="p-2 rounded-md bg-white border border-slate-200 hover:bg-slate-100"
                >
                  <Github size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-slate-500">© {currentYear} Tên Công Ty. Bảo lưu mọi quyền.</p>
          <div className="flex items-center space-x-4 text-sm text-slate-500">
            <a href="#" className="hover:underline">Chính sách bảo mật</a>
            <span aria-hidden>·</span>
            <a href="#" className="hover:underline">Điều khoản dịch vụ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;