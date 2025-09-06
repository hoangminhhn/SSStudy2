"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import CeoHero from "@/components/about/CeoHero";

const AboutCeo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle="Giới thiệu" />
      <main className="flex-grow container mx-auto px-4 py-8 space-y-8">
        {/* New CEO hero section */}
        <CeoHero />
      </main>
      <Footer />
    </div>
  );
};

export default AboutCeo;