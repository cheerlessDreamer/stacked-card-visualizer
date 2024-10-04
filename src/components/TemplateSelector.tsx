import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TemplateSelectorProps {
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
    chartTitle: "Lead Sources"
  },
  {
    name: "Leads - by assignee",
    data: [
      { label: 'Johan', value: 212, color: '#2FC9B7' },
      { label: 'Stefan', value: 200, color: '#32D7C3' },
      { label: 'Anna', value: 145, color: '#EEC843' },
      { label: 'Anders', value: 99, color: '#FFE381' },
      { label: 'Jörgen', value: 61, color: '#E7B6F6' },
    ],
    chartTitle: "Leads by Assignee"
  },
  {
    name: "Leads - by source",
    data: [
      { label: 'Blocket', value: 8901, color: '#1F4447' },
      { label: 'Finance', value: 5199, color: '#2F5D63' },
      { label: 'OEM', value: 877, color: '#97EA98' },
      { label: 'Direct', value: 801, color: '#B8FFBA' },
      { label: 'Other', value: 404, color: '#EEC843' },
    ],
    chartTitle: "Leads by Source"
  },
  {
    name: "Calls - by quality",
    data: [
      { label: 'Qualified', value: 30, color: '#335797' },
      { label: 'Unqualified', value: 25, color: '#94BAFA' },
      { label: 'Dropped', value: 20, color: '#EEC843' },
      { label: 'Missed', value: 15, color: '#E87C69' },
    ],
    chartTitle: "Calls by Quality"
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
    chartTitle: "Leads by Channel"
  },
  {
    name: "Core audiences",
    data: [
      { label: 'Comparison buyers', value: 8199, color: '#2EBFAE' },
      { label: 'Returning buyers', value: 2818, color: '#314C8A' },
      { label: 'One-shot buyers', value: 994, color: '#E4AEF2' },
    ],
    chartTitle: "Core Audiences"
  },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onTemplateChange }) => {
  const handleTemplateChange = (templateName: string) => {
    const selectedTemplate = templates.find(t => t.name === templateName);
    if (selectedTemplate) {
      onTemplateChange(selectedTemplate);
    }
  };

  return (
    <div className="absolute top-0 right-0 w-48">
      <Select onValueChange={handleTemplateChange}>
        <SelectTrigger>
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
  );
};
