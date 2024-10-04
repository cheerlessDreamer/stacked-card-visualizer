import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Chart from 'chart.js/auto';
import { createChartData, getLighterColor } from '../utils/chartUtils';
import { renderChartLegend } from './ChartLegend';

interface LeadsChartProps {
  totalLeads: number;
  leadData: { label: string; value: number; color: string }[];
}

const LeadsChart: React.FC<LeadsChartProps> = ({ totalLeads, leadData }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (leadData && leadData.length > 0) {
      updateChart();
    }
  }, [totalLeads, leadData]);

  const updateChart = () => {
    if (chartRef.current && leadData && leadData.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        const percentages = createChartData(totalLeads, leadData);

        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: [''],
            datasets: percentages.map((item, index) => ({
              label: item.label,
              data: [item.percentage],
              backgroundColor: item.color,
              hoverBackgroundColor: getLighterColor(item.color, 15),
              borderColor: item.color,
              borderWidth: 0,
              borderRadius: {
                topLeft: index === 0 ? 8 : 0,
                topRight: index === percentages.length - 1 ? 8 : 0,
                bottomLeft: index === 0 ? 8 : 0,
                bottomRight: index === percentages.length - 1 ? 8 : 0
              },
              borderSkipped: false
            }))
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: 0
            },
            scales: {
              x: {
                stacked: true,
                beginAtZero: true,
                max: 100,
                display: false,
                grid: { display: false }
              },
              y: {
                stacked: true,
                display: false,
                grid: { display: false }
              }
            },
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                      label += ': ';
                    }
                    if (context.parsed.x !== null) {
                      label += percentages.find(item => item.label === context.dataset.label)?.value;
                    }
                    return label;
                  }
                }
              }
            }
          },
          plugins: [{
            id: 'htmlLegend',
            afterUpdate(chart) {
              renderChartLegend(chart, percentages);
            }
          }]
        });
      }
    }
  };

  if (!leadData || leadData.length === 0) {
    return <div>No lead data available</div>;
  }

  return (
    <Card className="w-full max-w-3xl mx-auto p-8 rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal text-1rem">All channels</CardTitle>
        <div className="flex items-center space-x-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Channels</SelectItem>
              <SelectItem value="calls">Calls</SelectItem>
              <SelectItem value="forms">Forms</SelectItem>
              <SelectItem value="emails">Emails</SelectItem>
              <SelectItem value="chats">Chats</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        <div className="text-2.5rem font-light mb-2">{totalLeads}</div>
        <div className="flex-grow relative">
          <canvas ref={chartRef}></canvas>
        </div>
        <ul id="chart-legend" className="mt-4 text-0.75rem"></ul>
      </CardContent>
    </Card>
  );
};

export default LeadsChart;