import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Chart from 'chart.js/auto';
import { createChartConfig } from '../utils/chartConfig';
import EditableTitle from './EditableTitle';

interface LeadsChartProps {
  totalLeads: number;
  leadData: { label: string; value: number; color: string }[];
}

const LeadsChart: React.FC<LeadsChartProps> = ({ totalLeads, leadData }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [chartTitle, setChartTitle] = useState('All leads');

  useEffect(() => {
    if (leadData && leadData.length > 0) {
      updateChart();
    }
  }, [totalLeads, leadData, chartTitle]);

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

  return (
    <Card className="w-full max-w-3xl mx-auto p-8 rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <EditableTitle initialTitle={chartTitle} onTitleChange={setChartTitle} />
        <div className="flex items-center space-x-2">
          <Select defaultValue="channel">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="channel">Channel</SelectItem>
              <SelectItem value="source">Source</SelectItem>
              <SelectItem value="assignee">Assignee</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        <div className="text-5xl font-light mb-2">{totalLeads}</div>
        <div className="flex-grow relative">
          <canvas ref={chartRef}></canvas>
        </div>
        <ul id="chart-legend" className="mt-4"></ul>
      </CardContent>
    </Card>
  );
};

export default LeadsChart;