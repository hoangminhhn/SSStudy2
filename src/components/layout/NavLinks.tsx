"use client";

import React from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const NavLinks: React.FC = () => {
  return (
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
  );
};

export default NavLinks;