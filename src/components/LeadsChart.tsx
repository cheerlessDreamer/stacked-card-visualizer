import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Chart from 'chart.js/auto';
import { createChartConfig } from '../utils/chartConfig';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';

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

  const handleDownload = () => {
    if (cardRef.current) {
      const scale = 2; // Increase resolution
      html2canvas(cardRef.current, {
        scale: scale,
        backgroundColor: null,
        logging: false,
        useCORS: true,
        allowTaint: true,
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'leads-chart.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  const cardStyle = {
    width: cardWidth || '100%',
    maxWidth: '100%',
  };

  return (
    <Card className="mx-auto p-6 rounded-2xl flex flex-col" style={cardStyle} ref={cardRef}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <h2 className="text-2xl font-normal">{chartTitle}</h2>
        <Button onClick={handleDownload} variant="outline" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col pt-2">
        <div className="text-5xl font-extralight mb-6">{totalLeads.toLocaleString()}</div>
        <div style={{ height: chartHeight, padding: '8px 0' }}>
          <canvas ref={chartRef}></canvas>
        </div>
        <ul id="chart-legend" className="mt-6 justify-start"></ul>
      </CardContent>
    </Card>
  );
};

export default LeadsChart;