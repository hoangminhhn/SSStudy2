"use client";

import React, { useMemo } from "react";
import MaterialCard from "./MaterialCard";
import { materials as materialsData, Material } from "@/data/materialsData";
import { MaterialsFiltersState } from "./MaterialsFilters";

interface MaterialGridProps {
  filters: MaterialsFiltersState;
}

const MaterialGrid: React.FC<MaterialGridProps> = ({ filters }) => {
  const list: Material[] = materialsData;

  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return list.filter((m) => {
      if (filters.onlyVIP && m.accessLevel !== "purchased") return false;
      if (filters.subject && m.subject !== filters.subject) return false;
      if (filters.grade && m.grade !== filters.grade) return false;
      if (filters.category && m.category !== filters.category) return false;
      if (q) {
        const hay = `${m.title} ${m.description} ${m.subject} ${m.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [list, filters]);

  if (filtered.length === 0) {
    return <div className="p-8 text-center text-gray-500">Không tìm thấy tài liệu phù hợp.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((m) => (
        <MaterialCard key={m.id} material={m} />
      ))}
    </div>
  );
};

export default MaterialGrid;