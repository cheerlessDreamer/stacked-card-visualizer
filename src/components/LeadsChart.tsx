import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Chart from 'chart.js/auto';
import { createChartConfig } from '../utils/chartConfig';
import domtoimage from 'dom-to-image';

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

  const captureChart = () => {
    if (cardRef.current) {
      const scale = 2; // Increase resolution
      const style = {
        transform: 'scale(' + scale + ')',
        transformOrigin: 'top left',
        width: cardRef.current.offsetWidth + "px",
        height: cardRef.current.offsetHeight + "px"
      };

      domtoimage.toPng(cardRef.current, { 
        quality: 1,
        width: cardRef.current.offsetWidth * scale,
        height: cardRef.current.offsetHeight * scale,
        style: style
      })
      .then(function (dataUrl) {
        const link = document.createElement('a');
        link.download = 'leads-chart.png';
        link.href = dataUrl;
        link.click();
      })
      .catch(function (error) {
        console.error('Error capturing chart:', error);
      });
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
