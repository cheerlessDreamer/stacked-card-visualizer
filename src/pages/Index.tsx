import React, { useState } from 'react';
import LeadsChart from '../components/LeadsChart';
import LeadDataForm from '../components/LeadDataForm';
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Edit, Palette, HelpCircle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProTip from '../components/ProTip';

const defaultColors = ['#1F4447', '#2F5D63', '#97EA98', '#B8FFBA', '#E7B6F6'];
const backgroundColors = ['#F9F6F0', '#1F4447', '#F7F1E5', '#2F5D63', 'white', '#E7B6F6', '#B1F2B3'];

const Index = () => {
  const [leadData, setLeadData] = useState([
    { label: 'Calls', value: 80, color: defaultColors[0] },
    { label: 'Forms', value: 50, color: defaultColors[1] },
    { label: 'Emails', value: 30, color: defaultColors[2] },
    { label: 'Chats', value: 20, color: defaultColors[3] },
    { label: 'Other', value: 12, color: defaultColors[4] },
  ]);
  const [numBlocks, setNumBlocks] = useState(5);
  const [chartTitle, setChartTitle] = useState("Lead Sources");
  const [cardWidth, setCardWidth] = useState("768px");
  const [chartHeight, setChartHeight] = useState("24px");

  const totalLeads = leadData.reduce((sum, item) => sum + item.value, 0);

  const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0]);

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
    
    if (validNumBlocks < leadData.length) {
      const newLeadData = [
        leadData[0],
        ...leadData.slice(1, -1).slice(0, validNumBlocks - 2),
        leadData[leadData.length - 1]
      ];
      setLeadData(newLeadData);
    } else if (validNumBlocks > leadData.length) {
      const newBlocks = Array(validNumBlocks - leadData.length).fill(0).map((_, index) => ({
        label: 'New',
        value: 10,
        color: defaultColors[leadData.length + index]
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

  const handleTemplateChange = (template: { data: typeof leadData; chartTitle: string }) => {
    setLeadData(template.data);
    setNumBlocks(template.data.length);
    setChartTitle(template.chartTitle);
  };

  const handleCardWidthChange = (newWidth: string) => {
    setCardWidth(newWidth);
  };

  const handleChartHeightChange = (newHeight: string) => {
    setChartHeight(newHeight);
  };

  const handleBackgroundColorChange = (color: string) => {
    setBackgroundColor(color);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8 relative" style={{ backgroundColor }}>
      <LeadsChart 
        totalLeads={totalLeads} 
        leadData={leadData.slice(0, numBlocks)} 
        chartTitle={chartTitle}
        cardWidth={cardWidth}
        chartHeight={chartHeight}
      />
    
      <div className="fixed bottom-4 right-4 flex flex-col space-y-4">
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <Button className="rounded-full w-16 h-16 shadow-lg">
              <Edit className="w-6 h-6" />
            </Button>
          </DrawerTrigger>
          <DrawerContent side="left" className="w-[400px] sm:w-[540px] h-full">
            <div className="h-full p-6 bg-white">
              <LeadDataForm
                leadData={leadData.slice(0, numBlocks)}
                onInputChange={handleInputChange}
                numBlocks={numBlocks}
                onNumBlocksChange={handleNumBlocksChange}
                onTemplateChange={handleTemplateChange}
                chartTitle={chartTitle}
                onChartTitleChange={setChartTitle}
                cardWidth={cardWidth}
                onCardWidthChange={handleCardWidthChange}
                chartHeight={chartHeight}
                onChartHeightChange={handleChartHeightChange}
              />
            </div>
          </DrawerContent>
        </Drawer>

        <Popover>
          <PopoverTrigger asChild>
            <Button className="rounded-full w-16 h-16 shadow-lg">
              <Palette className="w-6 h-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="grid grid-cols-4 gap-2">
              {backgroundColors.map((color, index) => (
                <Button
                  key={index}
                  className="w-10 h-10 rounded-full"
                  style={{ backgroundColor: color }}
                  onClick={() => handleBackgroundColorChange(color)}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full w-16 h-16 shadow-lg">
              <HelpCircle className="w-6 h-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Kaisa Chart Creator Help</DialogTitle>
              <DialogDescription>
                This tool helps Kaisa staff create chart screenshots for customer presentations.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <h3 className="font-semibold mb-2">How to use:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Edit Button (Pencil):</strong> Customize chart data, title, and dimensions.</li>
                <li><strong>Color Button (Palette):</strong> Change the background color of the chart area.</li>
                <li><strong>Chart:</strong> Displays lead source data visually.</li>
                <li><strong>Templates:</strong> Quick-start with predefined chart configurations.</li>
              </ul>
              <p className="mt-4">Adjust values, colors, and layout to create the perfect chart for your presentation.</p>
              
              <div className="mt-6">
                <ProTip />
              </div>

              <div className="mt-6 p-4 bg-yellow-100 rounded-md">
                <h4 className="font-semibold text-yellow-800 mb-2">Warning: Image Download Unavailable</h4>
                <p className="text-yellow-700">
                  We attempted to implement a feature for downloading the chart as an image, but it proved more challenging than anticipated. Currently, this functionality is not available. We recommend using your device's screenshot feature to capture the chart instead.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;