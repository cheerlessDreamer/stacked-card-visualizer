import React, { useState } from 'react';
import LeadsChart from '../components/LeadsChart';
import LeadDataForm from '../components/LeadDataForm';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from 'lucide-react';

const Index = () => {
  const [leadData, setLeadData] = useState([
    { label: 'Calls', value: 80, color: '#1F4447' },
    { label: 'Forms', value: 50, color: '#2F5D63' },
    { label: 'Emails', value: 30, color: '#97EA98' },
    { label: 'Chats', value: 20, color: '#B8FFBA' },
    { label: 'Other', value: 12, color: '#E7B6F6' },
  ]);
  const [numBlocks, setNumBlocks] = useState(5);

  const totalLeads = leadData.reduce((sum, item) => sum + item.value, 0);

  const handleInputChange = (index: number, field: 'label' | 'value' | 'color', value: string) => {
    const newLeadData = [...leadData];
    if (field === 'value') {
      newLeadData[index][field] = parseInt(value) || 0;
    } else {
      newLeadData[index][field] = value;
    }
    setLeadData(newLeadData);
  };

  const handleNumBlocksChange = (newNumBlocks: number) => {
    const validNumBlocks = Math.max(3, Math.min(5, newNumBlocks));
    setNumBlocks(validNumBlocks);
    
    // Adjust leadData based on the new number of blocks
    if (validNumBlocks < leadData.length) {
      // Remove blocks from the middle, keeping first and last
      const newLeadData = [
        leadData[0],
        ...leadData.slice(1, -1).slice(0, validNumBlocks - 2),
        leadData[leadData.length - 1]
      ];
      setLeadData(newLeadData);
    } else if (validNumBlocks > leadData.length) {
      // Add new blocks with default values
      const newBlocks = Array(validNumBlocks - leadData.length).fill(0).map(() => ({
        label: 'New',
        value: 10, // Changed initial value from 0 to 10
        color: '#' + Math.floor(Math.random()*16777215).toString(16) // Random color
      }));
      const newLeadData = [
        leadData[0],
        ...leadData.slice(1, -1),
        ...newBlocks,
        leadData[leadData.length - 1]
      ];
      setLeadData(newLeadData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#2F5D63] p-4 space-y-8 relative">
      <LeadsChart totalLeads={totalLeads} leadData={leadData.slice(0, numBlocks)} />
      
      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-8 right-8 rounded-full w-16 h-16 shadow-lg">
            <Plus className="w-8 h-8" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <LeadDataForm
            leadData={leadData.slice(0, numBlocks)}
            onInputChange={handleInputChange}
            numBlocks={numBlocks}
            onNumBlocksChange={handleNumBlocksChange}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;