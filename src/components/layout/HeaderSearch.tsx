"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const HeaderSearch: React.FC = () => {
  return (
    <div className="relative hidden md:block">
      <Input
        type="text"
        placeholder="Nội dung tìm kiếm"
        className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
    </div>
  );
};

export default HeaderSearch;