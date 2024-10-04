import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Chart from 'chart.js/auto';
import { createChartConfig } from '../utils/chartConfig';
import { Camera } from 'lucide-react';

interface LeadsChartProps {
  totalLeads: number;
  leadData: { label: string; value: number; color: string }[];
  chartTitle: string;
  cardWidth: string;
  chartHeight: string;
}

const LeadsChart: React.FC<LeadsChartProps> = ({ totalLeads, leadData, chartTitle, cardWidth, chartHeight }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<Chart | null>(null);

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

  const captureScreenshot = async () => {
    if (!cardRef.current) return;

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTab: true });
      const track = stream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(track);
      const bitmap = await imageCapture.grabFrame();
      
      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const context = canvas.getContext('2d');
      context?.drawImage(bitmap, 0, 0);

      const link = document.createElement('a');
      link.download = 'leads-chart.png';
      link.href = canvas.toDataURL();
      link.click();

      track.stop();
    } catch (err) {
      console.error("Error capturing screenshot:", err);
    }
  };

  const cardStyle = {
    width: cardWidth || '100%',
    maxWidth: '100%',
  };

  return (
    <div className="relative">
      <Card ref={cardRef} className="mx-auto p-2 rounded-2xl flex flex-col" style={cardStyle}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <h2 className="text-2xl font-normal">{chartTitle}</h2>
        </CardHeader>
        <CardContent className="flex flex-col pt-1">
          <div className="text-5xl font-extralight mb-5">{totalLeads.toLocaleString()}</div>
          <div style={{ height: chartHeight }}>
            <canvas ref={chartRef}></canvas>
          </div>
          <ul id="chart-legend" className="mt-6 justify-start"></ul>
        </CardContent>
      </Card>
      <Button
        className="absolute bottom-4 right-4 rounded-full w-12 h-12 shadow-lg"
        onClick={captureScreenshot}
      >
        <Camera className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default LeadsChart;
