import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ChartHeightSelectorProps {
  chartHeight: string;
  onChartHeightChange: (newHeight: string) => void;
}

export const ChartHeightSelector: React.FC<ChartHeightSelectorProps> = ({ chartHeight, onChartHeightChange }) => {
  const heightOptions = [
    { label: 'Small', value: '24px' },
    { label: 'Medium', value: '80px' },
    { label: 'Large', value: '240px' },
    { label: 'Size queen', value: '400px' }, // Changed 'Sassy' to 'Size queen'
  ];

  return (
    <div className="mb-4">
      <Label className="block text-sm font-medium text-gray-700 mb-2">Chart Height:</Label>
      <RadioGroup
        value={chartHeight}
        onValueChange={onChartHeightChange}
        className="flex flex-wrap gap-4"
      >
        {heightOptions.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={`height-${option.value}`} />
            <Label htmlFor={`height-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};