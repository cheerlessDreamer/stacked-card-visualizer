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
    name: "Leads - alternative colours",
    data: [
      { label: 'Calls', value: 30, color: '#1FE6CE' },
      { label: 'Forms', value: 25, color: '#335797' },
      { label: 'Emails', value: 20, color: '#587DBD' },
      { label: 'WhatsApp', value: 15, color: '#94BAFA' },
      { label: 'Other', value: 10, color: '#E7B6F6' },
    ],
    chartTitle: "Leads"
  },
  {
    name: "Leads - by assignee",
    data: [
      { label: 'Blocket', value: 24011, color: '#2FC9B7' },
      { label: 'Finance', value: 5199, color: '#32D7C3' },
      { label: 'OEM', value: 877, color: '#EEC843' },
      { label: 'Direct', value: 801, color: '#FFE381' },
      { label: 'Other', value: 77, color: '#E7B6F6' },
    ],
    chartTitle: "Leads"
  },
  {
    name: "Leads - by source",
    data: [
      { label: 'Blocket', value: 24011, color: '#1F4447' },
      { label: 'Finance', value: 5199, color: '#2F5D63' },
      { label: 'OEM', value: 877, color: '#97EA98' },
      { label: 'Direct', value: 801, color: '#B8FFBA' },
      { label: 'Other', value: 77, color: '#EEC843' },
    ],
    chartTitle: "Leads"
  },
  {
    name: "Calls - by quality",
    data: [
      { label: 'Qualified', value: 30, color: '#335797' },
      { label: 'Unqualified', value: 25, color: '#94BAFA' },
      { label: 'Dropped', value: 20, color: '#97EA98' },
      { label: 'Missed', value: 15, color: '#E87C69' },
    ],
    chartTitle: "Calls"
  },
  {
    name: "Leads - by channel",
    data: [
      { label: 'Calls', value: 30, color: '#1F4447' },
      { label: 'Forms', value: 25, color: '#2F5D63' },
      { label: 'Emails', value: 20, color: '#97EA98' },
      { label: 'WhatsApp', value: 15, color: '#B8FFBA' },
      { label: 'Other', value: 10, color: '#E7B6F6' },
    ],
    chartTitle: "Leads"
  },
  {
    name: "Core audiences",
    data: [
      { label: 'Comparison buyers', value: 8199, color: '#2EBFAE' },
      { label: 'Returning buyers', value: 2818, color: '#314C8A' },
      { label: 'One-shot buyers', value: 994, color: '#E4AEF2' },
    ],
    chartTitle: "Leads"
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