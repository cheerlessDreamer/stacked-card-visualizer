import React, { useState, useRef } from 'react';
import LeadsChart from '../components/LeadsChart';
import LeadDataForm from '../components/LeadDataForm';
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Edit, Download } from 'lucide-react';
import domtoimage from 'dom-to-image';
import { toast } from 'sonner';

const defaultColors = ['#1F4447', '#2F5D63', '#97EA98', '#B8FFBA', '#E7B6F6'];

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

  const chartRef = useRef<HTMLDivElement>(null);

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

  const saveCardAsImage = async () => {
    if (chartRef.current) {
      try {
        // Wait for fonts to load
        await document.fonts.ready;
        
        const dataUrl = await domtoimage.toPng(chartRef.current, {
          quality: 0.95,
          bgcolor: '#fff'
        });
        
        const link = document.createElement('a');
        link.download = 'lead-sources-chart.png';
        link.href = dataUrl;
        link.click();
        toast.success('Chart saved as image!');
      } catch (error) {
        console.error('Error saving chart:', error);
        toast.error('Failed to save chart. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#2F5D63] p-4 space-y-8 relative">
      <div ref={chartRef}>
        <LeadsChart 
          totalLeads={totalLeads} 
          leadData={leadData.slice(0, numBlocks)} 
          chartTitle={chartTitle}
          cardWidth={cardWidth}
          chartHeight={chartHeight}
        />
      </div>
      
      <Button
        onClick={saveCardAsImage}
        className="fixed bottom-24 right-4 rounded-full w-16 h-16 shadow-lg bg-white text-[#2F5D63]"
      >
        <Download className="w-6 h-6" />
      </Button>

      <Drawer>
        <DrawerTrigger asChild>
          <Button className="fixed bottom-4 right-4 rounded-full w-16 h-16 shadow-lg">
            <Edit className="w-6 h-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="p-6 bg-white rounded-t-xl">
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
    </div>
  );
};

export default Index;
