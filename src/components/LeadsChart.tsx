import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Chart from 'chart.js/auto';
import { createChartConfig } from '../utils/chartConfig';

interface LeadsChartProps {
  totalLeads: number;
  leadData: { label: string; value: number; color: string }[];
}

const LeadsChart: React.FC<LeadsChartProps> = ({ totalLeads, leadData }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [selectedOption, setSelectedOption] = useState("Channel");

  useEffect(() => {
    if (leadData && leadData.length > 0) {
      updateChart();
    }
  }, [totalLeads, leadData, selectedOption]);

  const updateChart = () => {
    if (chartRef.current && leadData && leadData.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        const config = createChartConfig(totalLeads, leadData);
        chartInstance.current = new Chart(ctx, config);
      }
    }
  };

  if (!leadData || leadData.length === 0) {
    return <div>No lead data available</div>;
  }

  return (
    <Card className="w-full max-w-3xl mx-auto p-8 rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">All channels</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={selectedOption} onValueChange={setSelectedOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Channel">Channel</SelectItem>
              <SelectItem value="Source">Source</SelectItem>
              <SelectItem value="Assignee">Assignee</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        <div className="text-[2.5rem] font-light mb-2">{totalLeads}</div>
        <div className="flex-grow relative">
          <canvas ref={chartRef}></canvas>
        </div>
        <ul id="chart-legend" className="mt-4"></ul>
      </CardContent>
    </Card>
  );
};

export default LeadsChart;