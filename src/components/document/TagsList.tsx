"use client";

import React from "react";

interface TagsListProps {
  tags?: string[];
}

const TagsList: React.FC<TagsListProps> = ({ tags = [] }) => {
  return (
    <div className="bg-white border rounded-lg p-4">
      <h4 className="font-semibold mb-3">Tags</h4>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">#{t}</span>
        ))}
      </div>
    </div>
  );
};

export default TagsList;