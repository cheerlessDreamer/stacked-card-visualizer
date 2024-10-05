import React from 'react';
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { TemplateSelector } from './TemplateSelector';
import { ChartHeightSelector } from './ChartHeightSelector';

interface LeadDataFormProps {
  leadData: { label: string; value: number; color: string }[];
  onInputChange: (index: number, field: 'label' | 'value' | 'color', value: string) => void;
  numBlocks: number;
  onNumBlocksChange: (newNumBlocks: number) => void;
  onTemplateChange: (template: LeadDataTemplate) => void;
  chartTitle: string;
  onChartTitleChange: (newTitle: string) => void;
  cardWidth: string;
  onCardWidthChange: (newWidth: string) => void;
  chartHeight: string;
  onChartHeightChange: (newHeight: string) => void;
}

interface LeadDataTemplate {
  name: string;
  data: { label: string; value: number; color: string }[];
  chartTitle: string;
}

const LeadDataForm: React.FC<LeadDataFormProps> = ({ 
  leadData, 
  onInputChange, 
  numBlocks, 
  onNumBlocksChange, 
  onTemplateChange,
  chartTitle,
  onChartTitleChange,
  cardWidth,
  onCardWidthChange,
  chartHeight,
  onChartHeightChange
}) => {
  const handleCardWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      onCardWidthChange(value ? `${value}px` : '');
    }
  };

  return (
    <div className="mt-4 relative pb-16">
      <TemplateSelector onTemplateChange={onTemplateChange} />
      
      <h3 className="text-lg font-semibold mb-4">Update Data</h3>
      <div className="mb-4">
        <Label htmlFor="chart-title" className="block text-sm font-medium text-gray-700 mb-2">Chart Title:</Label>
        <Input
          id="chart-title"
          value={chartTitle}
          onChange={(e) => onChartTitleChange(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="card-width" className="block text-sm font-medium text-gray-700 mb-2">Card Width (px):</Label>
        <Input
          id="card-width"
          value={cardWidth.replace('px', '')}
          onChange={handleCardWidthChange}
          className="w-full"
          placeholder="e.g., 768"
          type="text"
          inputMode="numeric"
          pattern="\d*"
        />
      </div>

      <ChartHeightSelector chartHeight={chartHeight} onChartHeightChange={onChartHeightChange} />

      <div className="mb-4">
        <Label className="block text-sm font-medium text-gray-700 mb-2">Number of Blocks:</Label>
        <RadioGroup
          value={numBlocks.toString()}
          onValueChange={(value) => onNumBlocksChange(parseInt(value))}
          className="flex space-x-4"
        >
          {[3, 4, 5].map((num) => (
            <div key={num} className="flex items-center space-x-2">
              <RadioGroupItem value={num.toString()} id={`blocks-${num}`} />
              <Label htmlFor={`blocks-${num}`}>{num}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="space-y-4">
        {leadData.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Input
              id={`label-${index}`}
              type="text"
              value={item.label}
              onChange={(e) => onInputChange(index, 'label', e.target.value)}
              className="w-1/2"
              placeholder="Title"
            />
            <Input
              id={`value-${index}`}
              type="number"
              value={item.value}
              onChange={(e) => onInputChange(index, 'value', e.target.value)}
              className="w-1/4"
              placeholder="Number"
            />
            <Input
              id={`color-${index}`}
              type="color"
              value={item.color}
              onChange={(e) => onInputChange(index, 'color', e.target.value)}
              className="w-12 h-10 p-1 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadDataForm;
