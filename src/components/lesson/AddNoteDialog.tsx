"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, List, ListOrdered } from "lucide-react";

interface AddNoteDialogProps {
  children: React.ReactNode;
  timestamp: string; // e.g., "00:00"
  onSave: (noteContent: string) => void;
  onCancel: () => void;
}

const AddNoteDialog: React.FC<AddNoteDialogProps> = ({
  children,
  timestamp,
  onSave,
  onCancel,
}) => {
  const [noteContent, setNoteContent] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSave = () => {
    onSave(noteContent);
    setNoteContent(""); // Clear content after saving
    setIsOpen(false); // Close dialog
  };

  const handleCancel = () => {
    setNoteContent(""); // Clear content on cancel
    onCancel();
    setIsOpen(false); // Close dialog
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Thêm ghi chú tại <span className="text-orange-500">{timestamp}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {/* Rich Text Editor Toolbar */}
          <div className="flex items-center space-x-2 border rounded-md p-2 bg-gray-50">
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

          {/* Textarea for note content */}
          <Textarea
            placeholder="Nội dung ghi chú..."
            className="min-h-[150px]"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />

          {/* Action Buttons */}
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
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteDialog;