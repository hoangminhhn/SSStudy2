"use client";

import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Users } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white py-10 px-6 mt-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">SSSSTUDY</h3>
            <p className="text-sm mb-2">Số 88 Ngõ 27 Phố Đại Cồ Việt, Phường Cầu Dền, Quận Hai Bà Trưng, TP. Hà Nội</p>
            <p className="text-sm mb-2">Hotline 0339 793 147</p>
            <p className="text-sm mb-2">Email: ssstudy.vn@gmail.com</p>
            <p className="text-sm mb-2">Website: ssstudy.vn</p>
            <p className="text-sm">Mã số thuế: 0110995157</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Danh mục</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-blue-600 flex items-center"><BookOpen size={16} className="mr-2" />Thư viện đề thi</Link></li>
              <li><Link to="#" className="hover:text-blue-600 flex items-center"><Users size={16} className="mr-2" />Cộng đồng SSStudy</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Giới thiệu</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Khóa học</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Sách</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Sự kiện</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Tin tức</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Trợ giúp</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-blue-600">Điều khoản sử dụng</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Chính sách thanh toán, giao hàng</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Chính sách đổi trả, hoàn tiền</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Chính sách bảo mật</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Tải ứng dụng</h3>
            <div className="space-y-3">
              <img src="https://via.placeholder.com/150x50?text=App+Store" alt="App Store" className="w-36 h-auto rounded-md" />
              <img src="https://via.placeholder.com/150x50?text=Google+Play" alt="Google Play" className="w-36 h-auto rounded-md" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          © 2025 CÔNG TY CỔ PHẦN ĐÀO TẠO GIÁO DỤC SSSTUDY. Tất cả các quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
};

export default Footer;