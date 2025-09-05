"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { User, MapPin } from "lucide-react";

interface Champion {
  id: string;
  image: string;
  score: string;
  subject: string;
  name: string;
  school: string;
  note?: string;
}

const CHAMPIONS: Champion[] = [
  {
    id: "c-1",
    image: "/images/bang-vang-1.png",
    score: "9,8 toán",
    subject: "toán",
    name: "Nguyễn Phương Thảo",
    school: "THPT Quốc Oai, Hà Nội",
    note: "HS khóa S23 thầy Đạt",
  },
  {
    id: "c-2",
    image: "/images/bang-vang-2.png",
    score: "9,8 toán",
    subject: "toán",
    name: "Nguyễn Phương Thảo",
    school: "THPT Quốc Oai, Hà Nội",
    note: "HS khóa S23 thầy Đạt",
  },
  {
    id: "c-3",
    image: "/images/bang-vang-3.png",
    score: "9,8 toán",
    subject: "toán",
    name: "Nguyễn Phương Thảo",
    school: "THPT Quốc Oai, Hà Nội",
    note: "HS khóa S23 thầy Đạt",
  },
  {
    id: "c-4",
    image: "/images/bang-vang-4.png",
    score: "9,8 toán",
    subject: "toán",
    name: "Nguyễn Phương Thảo",
    school: "THPT Quốc Oai, Hà Nội",
    note: "HS khóa S23 thầy Đạt",
  },
];

const ChampionCard: React.FC<{ champ: Champion }> = ({ champ }) => {
  return (
    <Card className="rounded-lg overflow-hidden shadow-sm">
      <div className="w-full h-44 bg-gray-100">
        <img src={champ.image} alt={champ.name} className="w-full h-full object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="text-red-600 font-semibold text-lg">{champ.score}</div>
        <div className="mt-1 font-medium text-gray-800">{champ.name}</div>
        <div className="text-sm text-gray-500 mt-1">{champ.school}</div>

        <div className="flex items-center text-xs text-gray-400 mt-3">
          <User size={14} className="mr-2" />
          <span className="truncate">{champ.note}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const ChampionBoard: React.FC = () => {
  return (
    <section aria-labelledby="champion-heading" className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 items-center mb-6">
          <div />
          <h2 id="champion-heading" className="text-center text-2xl sm:text-3xl font-bold text-gray-800">
            Bảng vàng thành tích của SSStudy
          </h2>
          <div className="text-right">
            <Link to="#" className="text-sm text-blue-600 hover:underline inline-flex items-center">
              Xem tất cả <span className="ml-2">→</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHAMPIONS.map((c) => (
            <ChampionCard key={c.id} champ={c} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChampionBoard;