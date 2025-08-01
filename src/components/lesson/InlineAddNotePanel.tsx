"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, List, ListOrdered } from "lucide-react";

interface InlineAddNotePanelProps {
  timestamp: string;
  onSave: (noteContent: string) => void;
  onCancel: () => void;
  onClose: () => void;
}

const InlineAddNotePanel: React.FC<InlineAddNotePanelProps> = ({
  timestamp,
  onSave,
  onCancel,
  onClose,
}) => {
  const [noteContent, setNoteContent] = useState("");

  const handleSave = () => {
    if (noteContent.trim() === "") return;
    onSave(noteContent);
    setNoteContent("");
    onClose();
  };

  const handleCancel = () => {
    setNoteContent("");
    onCancel();
    onClose();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg p-4 z-50 max-w-4xl mx-auto">
      <div className="mb-2 font-semibold text-gray-800">
        Thêm ghi chú tại <span className="text-orange-500">{timestamp}</span>
      </div>

      {/* Toolbar */}
      <div className="flex items-center space-x-2 border rounded-md p-2 bg-gray-50 mb-3">
        <Select>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Normal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="heading1">Heading 1</SelectItem>
            <SelectItem value="heading2">Heading 2</SelectItem>
          </SelectContent>
        </Select>
        <Toggle aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </Toggle>
        <ToggleGroup type="single" aria-label="Text alignment">
          <ToggleGroupItem value="list" aria-label="Toggle unordered list">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="ordered-list" aria-label="Toggle ordered list">
            <ListOrdered className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Textarea
        placeholder="Nội dung ghi chú..."
        className="min-h-[120px]"
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
      />

      <div className="flex justify-end space-x-4 pt-2">
        <Button
          variant="outline"
          className="text-blue-600 border-blue-600 hover:bg-blue-50 rounded-full px-6 py-3"
          onClick={handleCancel}
        >
          HỦY BỎ
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-3"
          onClick={handleSave}
        >
          TẠO GHI CHÚ
        </Button>
      </div>
    </div>
  );
};

export default InlineAddNotePanel;