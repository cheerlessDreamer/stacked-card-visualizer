import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Pencil } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LeadDataFormProps {
  leadData: { label: string; value: number; color: string }[];
  onInputChange: (index: number, field: 'label' | 'value' | 'color', value: string) => void;
  numBlocks: number;
  onNumBlocksChange: (newNumBlocks: number) => void;
  onTemplateChange: (template: LeadDataTemplate) => void;
}

interface LeadDataTemplate {
  name: string;
  data: { label: string; value: number; color: string }[];
  chartTitle: string;
}

const templates: LeadDataTemplate[] = [
  {
    name: "Default",
    data: [
      { label: 'Calls', value: 80, color: '#1F4447' },
      { label: 'Forms', value: 50, color: '#2F5D63' },
      { label: 'Emails', value: 30, color: '#97EA98' },
      { label: 'Chats', value: 20, color: '#B8FFBA' },
      { label: 'Other', value: 12, color: '#E7B6F6' },
    ],
    chartTitle: "Lead Sources"
  },
  {
    name: "Sales Funnel",
    data: [
      { label: 'Awareness', value: 100, color: '#FF6B6B' },
      { label: 'Interest', value: 70, color: '#4ECDC4' },
      { label: 'Desire', value: 40, color: '#45B7D1' },
      { label: 'Action', value: 20, color: '#1A535C' },
    ],
    chartTitle: "Sales Funnel Stages"
  },
  {
    name: "Customer Segments",
    data: [
      { label: 'Enterprise', value: 45, color: '#5D001E' },
      { label: 'SMB', value: 30, color: '#E3AFBC' },
      { label: 'Startup', value: 15, color: '#EE4C7C' },
      { label: 'Individual', value: 10, color: '#9C89B8' },
    ],
    chartTitle: "Customer Segments"
  },
  {
    name: "Marketing Channels",
    data: [
      { label: 'Social Media', value: 35, color: '#114B5F' },
      { label: 'SEO', value: 25, color: '#1A936F' },
      { label: 'PPC', value: 20, color: '#88D498' },
      { label: 'Email', value: 15, color: '#C6DABF' },
      { label: 'Referral', value: 5, color: '#F3E9D2' },
    ],
    chartTitle: "Marketing Channel Performance"
  },
  {
    name: "Product Usage",
    data: [
      { label: 'Feature A', value: 40, color: '#540D6E' },
      { label: 'Feature B', value: 30, color: '#EE4266' },
      { label: 'Feature C', value: 20, color: '#FFD23F' },
      { label: 'Feature D', value: 10, color: '#3BCEAC' },
    ],
    chartTitle: "Product Feature Usage"
  },
];

const LeadDataForm: React.FC<LeadDataFormProps> = ({ leadData, onInputChange, numBlocks, onNumBlocksChange, onTemplateChange }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleTemplateChange = (templateName: string) => {
    const selectedTemplate = templates.find(t => t.name === templateName);
    if (selectedTemplate) {
      onTemplateChange(selectedTemplate);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-4">Update Data</h3>
      <div className="mb-4">
        <Label className="block text-sm font-medium text-gray-700 mb-2">Select Template:</Label>
        <Select onValueChange={handleTemplateChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a template" />
          </SelectTrigger>
          <SelectContent>
            {templates.map((template) => (
              <SelectItem key={template.name} value={template.name}>
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
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