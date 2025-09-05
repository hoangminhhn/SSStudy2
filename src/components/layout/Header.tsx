"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                SS
              </div>
              <span className="font-semibold text-lg text-slate-800">SSStudy</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-4 ml-6">
              <Link to="/courses" className="text-sm text-slate-600 hover:text-slate-900">
                Khóa học
              </Link>
              <Link to="/about" className="text-sm text-slate-600 hover:text-slate-900">
                Về chúng tôi
              </Link>
              <Link to="/contact" className="text-sm text-slate-600 hover:text-slate-900">
                Liên hệ
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            <Link to="/courses">
              <Button className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 text-sm font-semibold">
                Khám phá
              </Button>
            </Link>

            {/* Mobile menu button (kept minimal) */}
            <div className="md:hidden">
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;