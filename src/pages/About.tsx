"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import AboutHero from "@/components/about/AboutHero";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle="Giới thiệu" />
      <main className="flex-grow container mx-auto px-4 py-12 space-y-8">
        {/* Hero section (matches provided image) */}
        <AboutHero />
      </main>
      <Footer />
    </div>
  );
};

export default About;