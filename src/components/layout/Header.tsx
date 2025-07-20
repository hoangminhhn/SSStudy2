"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bell, ShoppingCart, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface HeaderProps {
  bgColor?: string; // New prop for background color
}

const Header: React.FC<HeaderProps> = ({ bgColor }) => {
  return (
    <header className={cn("shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-50", bgColor ? `bg-${bgColor}` : "bg-white")}>
      <div className="flex items-center space-x-8">
        <Link to="/" className={cn("text-2xl font-bold", bgColor ? "text-white" : "text-blue-600")}>
          S
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="#" className={cn("font-medium", bgColor ? "text-gray-200 hover:text-white" : "text-gray-700 hover:text-blue-600")}>
            Giới thiệu
          </Link>
          <Link to="/courses" className={cn("font-medium", bgColor ? "text-gray-200 hover:text-white" : "text-gray-700 hover:text-blue-600")}> {/* Updated link */}
            Khóa học
          </Link>
          <Link to="#" className={cn("font-medium", bgColor ? "text-gray-200 hover:text-white" : "text-gray-700 hover:text-blue-600")}>
            Sách
          </Link>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Input
            type="text"
            placeholder="Nội dung tìm kiếm"
            className={cn("pl-10 pr-4 py-2 rounded-full border", bgColor ? "border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:ring-gray-500 focus:border-gray-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500")}
          />
          <Search className={cn("absolute left-3 top-1/2 -translate-y-1/2", bgColor ? "text-gray-400" : "text-gray-400")} size={18} />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} className={bgColor ? "text-white" : ""} />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart size={20} className={bgColor ? "text-white" : ""} />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </Button>
        <Button className={cn("rounded-full px-4 py-2 hidden sm:block", bgColor ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white")}>
          Thi thử
        </Button>
        <Button className={cn("rounded-full px-4 py-2 hidden sm:block", bgColor ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-orange-500 hover:bg-orange-600 text-white")}>
          Mã kích hoạt
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full p-2">
              <User size={20} className={bgColor ? "text-white" : ""} />
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