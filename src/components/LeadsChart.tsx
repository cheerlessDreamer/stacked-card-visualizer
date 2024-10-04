import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';
import { createChartConfig } from '../utils/chartConfig';
import { Download } from 'lucide-react';

interface LeadsChartProps {
  totalLeads: number;
  leadData: { label: string; value: number; color: string }[];
  chartTitle: string;
  cardWidth: string;
  chartHeight: string;
}

const LeadsChart: React.FC<LeadsChartProps> = ({ totalLeads, leadData, chartTitle, cardWidth, chartHeight }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (leadData && leadData.length > 0) {
      updateChart();
    }
  }, [totalLeads, leadData, chartTitle, cardWidth, chartHeight]);

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

  const captureChart = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // Increase resolution
        logging: false,
        useCORS: true
      });
      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement('a');
      link.download = 'lead-chart.png';
      link.href = image;
      link.click();
    }
  };

  const cardStyle = {
    width: cardWidth || '100%',
    maxWidth: '100%',
  };

  return (
    <Card className="mx-auto p-2 rounded-2xl flex flex-col" style={cardStyle} ref={cardRef}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
        <h2 className="text-2xl font-normal">{chartTitle}</h2>
        <Button onClick={captureChart} variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col pt-1">
        <div className="text-5xl font-extralight mb-5">{totalLeads.toLocaleString()}</div>
        <div style={{ height: chartHeight }}>
          <canvas ref={chartRef}></canvas>
        </div>
        <ul id="chart-legend" className="mt-6 justify-start"></ul>
      </CardContent>
    </Card>
  );
};

export default LeadsChart;
