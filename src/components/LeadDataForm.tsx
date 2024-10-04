import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Pencil } from 'lucide-react';

interface LeadDataFormProps {
  leadData: { label: string; value: number; color: string }[];
  onInputChange: (index: number, field: 'label' | 'value' | 'color', value: string) => void;
  numBlocks: number;
  onNumBlocksChange: (newNumBlocks: number) => void;
}

const LeadDataForm: React.FC<LeadDataFormProps> = ({ leadData, onInputChange, numBlocks, onNumBlocksChange }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-4">Update Data</h3>
      <div className="mb-4">
        <label htmlFor="numBlocks" className="block text-sm font-medium text-gray-700">Number of Blocks:</label>
        <Input
          id="numBlocks"
          type="number"
          min="3"
          max="5"
          value={numBlocks}
          onChange={(e) => onNumBlocksChange(parseInt(e.target.value))}
          className="mt-1 block w-full"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {leadData.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-20 relative group cursor-pointer"
              onClick={() => setEditingIndex(index)}
            >
              {editingIndex === index ? (
                <Input
                  type="text"
                  value={item.label}
                  onChange={(e) => onInputChange(index, 'label', e.target.value)}
                  onBlur={() => setEditingIndex(null)}
                  autoFocus
                  className="w-full"
                />
              ) : (
                <>
                  <span>{item.label}</span>
                  <Pencil className="h-4 w-4 absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </>
              )}
            </div>
            <Input
              type="number"
              value={item.value}
              onChange={(e) => onInputChange(index, 'value', e.target.value)}
              className="w-24"
            />
            <Input
              type="color"
              value={item.color}
              onChange={(e) => onInputChange(index, 'color', e.target.value)}
              className="w-12 h-8 p-0 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadDataForm;