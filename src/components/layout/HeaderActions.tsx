"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Bell, ShoppingCart } from "lucide-react";
import UserMenu from "./UserMenu";

const HeaderActions: React.FC = () => {
  return (
    <div className="flex items-center space-x-4">
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

      <UserMenu />
    </div>
  );
};

export default HeaderActions;