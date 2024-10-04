import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Pencil } from 'lucide-react';

interface LeadDataFormProps {
  leadData: { label: string; value: number }[];
  onInputChange: (index: number, field: 'label' | 'value', value: string) => void;
}

const LeadDataForm: React.FC<LeadDataFormProps> = ({ leadData, onInputChange }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">Update Lead Data</h3>
      <div className="grid grid-cols-2 gap-4">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadDataForm;