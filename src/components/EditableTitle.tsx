import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface EditableTitleProps {
  initialTitle: string;
  onTitleChange: (newTitle: string) => void;
}

const EditableTitle: React.FC<EditableTitleProps> = ({ initialTitle, onTitleChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onTitleChange(title);
  };

  return (
    <div className="relative group cursor-pointer" onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <Input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleBlur}
          autoFocus
          className="w-full"
        />
      ) : (
        <>
          <span className="text-2xl font-normal">{title}</span>
          <Pencil className="h-4 w-4 absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
        </>
      )}
    </div>
  );
};

export default EditableTitle;