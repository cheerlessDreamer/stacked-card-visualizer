import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LeadDataFormProps {
  leadData: { label: string; value: number }[];
  onInputChange: (index: number, value: string) => void;
  onUpdateChart: () => void;
}

const LeadDataForm: React.FC<LeadDataFormProps> = ({ leadData, onInputChange, onUpdateChart }) => {
  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">Update Lead Data</h3>
      <div className="grid grid-cols-2 gap-4">
        {leadData.map((item, index) => (
          <div key={item.label} className="flex items-center space-x-2">
            <label className="w-20">{item.label}:</label>
            <Input
              type="number"
              value={item.value}
              onChange={(e) => onInputChange(index, e.target.value)}
              className="w-24"
            />
          </div>
        ))}
      </div>
      <Button className="mt-4" onClick={onUpdateChart}>Update Chart</Button>
    </div>
  );
};

export default LeadDataForm;