import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Chart from 'chart.js/auto';
import { createChartConfig } from '../utils/chartConfig';

interface LeadsChartProps {
  totalLeads: number;
  leadData: { label: string; value: number; color: string }[];
  chartTitle: string;
  cardWidth: string;
}

const LeadsChart: React.FC<LeadsChartProps> = ({ totalLeads, leadData, chartTitle, cardWidth }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (leadData && leadData.length > 0) {
      updateChart();
    }
  }, [totalLeads, leadData, chartTitle, cardWidth]);

  const updateChart = () => {
    if (chartRef.current && leadData && leadData.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        const config = createChartConfig(totalLeads, leadData);
        chartInstance.current = new Chart(ctx, config as any);
      }
    }
  };

  const cardStyle = {
    width: cardWidth || '100%',
    maxWidth: '100%',
    height: '240px'  // Changed from 'minHeight: '800px', height: 'auto'' to 'height: '240px''
  };

  return (
    <Card className="mx-auto p-2 rounded-2xl flex flex-col" style={cardStyle}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
        <h2 className="text-2xl font-normal">{chartTitle}</h2>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow pt-1">
        <div className="text-5xl font-extralight mb-5">{totalLeads.toLocaleString()}</div>
        <div className="flex-grow relative">
          <canvas ref={chartRef}></canvas>
        </div>
        <ul id="chart-legend" className="mt-6 flex-shrink-0 justify-start"></ul>
      </CardContent>
    </Card>
  );
};

export default LeadsChart;