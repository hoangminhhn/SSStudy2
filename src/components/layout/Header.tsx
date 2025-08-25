"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bell, ShoppingCart, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          S
        </Link>
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="#" className="text-gray-700 hover:text-blue-600 font-medium">
            Giới thiệu
          </Link>

          {/* Khóa học with dropdown submenu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-gray-700 hover:text-blue-600 font-medium">
                Khóa học
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[180px]">
              <DropdownMenuItem asChild>
                <Link to="/courses" className="block w-full">
                  Khóa học (phiên bản cũ)
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/courses-v2" className="block w-full">
                  Khóa học V2
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/courses-v3" className="block w-full">
                  Khóa học V3
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="#" className="text-gray-700 hover:text-blue-600 font-medium">
            Sách
          </Link>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Input
            type="text"
            placeholder="Nội dung tìm kiếm"
            className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart size={20} />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 hidden sm:block">
          Thi thử
        </Button>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 hidden sm:block">
          Mã kích hoạt
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full p-2">
              <User size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Test xác nhận</DropdownMenuItem>
            <DropdownMenuItem>Thoát</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;