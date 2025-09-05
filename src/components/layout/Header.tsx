"use client";

import React from "react";
import NavLinks from "./NavLinks";
import HeaderSearch from "./HeaderSearch";
import HeaderActions from "./HeaderActions";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-8">
        <NavLinks />
      </div>

      <div className="flex items-center space-x-4">
        <HeaderSearch />
        <HeaderActions />
      </div>
    </header>
  );
};

export default Header;