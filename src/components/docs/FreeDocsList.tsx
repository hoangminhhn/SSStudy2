"use client";

import React from "react";
import DocCard, { Doc } from "./DocCard";

interface Props {
  docs: Doc[];
  favorites: Record<string, boolean>;
  onToggleFavorite: (id: string) => void;
  onOpen: (doc: Doc) => void;
}

const FreeDocsList: React.FC<Props> = ({ docs, favorites, onToggleFavorite, onOpen }) => {
  if (docs.length === 0) {
    return <div className="text-center text-gray-500 py-8">Không có tài liệu nào khớp.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {docs.map((d) => (
        <DocCard
          key={d.id}
          doc={d}
          isFavorite={!!favorites[d.id]}
          onToggleFavorite={onToggleFavorite}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
};

export default FreeDocsList;