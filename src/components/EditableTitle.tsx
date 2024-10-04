import React, { useState } from 'react';

interface EditableTitleProps {
  initialTitle: string;
  onTitleChange: (newTitle: string) => void;
  className?: string;
}

const EditableTitle: React.FC<EditableTitleProps> = ({ initialTitle, onTitleChange, className }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      onTitleChange(title);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    onTitleChange(title);
  };

  return (
    <div className={className}>
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          autoFocus
          className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
        />
      ) : (
        <h2 onClick={() => setIsEditing(true)} className="cursor-pointer">
          {title}
        </h2>
      )}
    </div>
  );
};

export default EditableTitle;