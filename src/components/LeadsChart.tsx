import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Chart from 'chart.js/auto';

const LeadsChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        const totalLeads = 192;
        const data = [
          { label: 'Calls', value: 101 },
          { label: 'Forms', value: 59 },
          { label: 'Emails', value: 21 },
          { label: 'Other', value: 11 },
        ];

        const percentages = data.map(item => ({
          ...item,
          percentage: (item.value / totalLeads) * 100
        }));

        const legendMarker = (color: string) => {
          const canvas = document.createElement('canvas');
          canvas.width = 14;
          canvas.height = 14;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(7, 7, 5, 0, 2 * Math.PI);
            ctx.fill();
          }
          return canvas;
        };

        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: [''],
            datasets: percentages.map(item => ({
              label: item.label,
              data: [item.percentage],
              backgroundColor: getBackgroundColor(item.label),
              borderColor: getBorderColor(item.label),
              borderWidth: 1
            }))
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                stacked: true,
                beginAtZero: true,
                max: 100,
                display: false,
                grid: {
                  display: false
                }
              },
              y: {
                stacked: true,
                display: false,
                grid: {
                  display: false
                }
              }
            },
            plugins: {
              legend: {
                position: 'bottom',
                align: 'start',
                labels: {
                  usePointStyle: true,
                  pointStyle: 'circle',
                  generateLabels: (chart) => {
                    const datasets = chart.data.datasets;
                    return datasets.map((dataset, i) => ({
                      text: `${dataset.label}\n<span style="font-weight: bold;">${data[i].value}</span>`,
                      fillStyle: dataset.backgroundColor as string,
                      strokeStyle: dataset.borderColor as string,
                      lineWidth: 1,
                      hidden: false,
                      index: i
                    }));
                  },
                  font: {
                    size: 12
                  },
                  padding: 20,
                  boxWidth: 10,
                  boxHeight: 10,
                }
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                      label += ': ';
                    }
                    if (context.parsed.x !== null) {
                      label += data.find(item => item.label === context.dataset.label)?.value;
                    }
                    return label;
                  }
                }
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const getBackgroundColor = (label: string) => {
    switch (label) {
      case 'Calls': return 'rgba(31, 41, 55, 0.8)';
      case 'Forms': return 'rgba(55, 65, 81, 0.8)';
      case 'Emails': return 'rgba(167, 243, 208, 0.8)';
      case 'Other': return 'rgba(216, 180, 254, 0.8)';
      default: return 'rgba(107, 114, 128, 0.8)';
    }
  };

  const getBorderColor = (label: string) => {
    switch (label) {
      case 'Calls': return 'rgba(31, 41, 55, 1)';
      case 'Forms': return 'rgba(55, 65, 81, 1)';
      case 'Emails': return 'rgba(167, 243, 208, 1)';
      case 'Other': return 'rgba(216, 180, 254, 1)';
      default: return 'rgba(107, 114, 128, 1)';
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">All channels</CardTitle>
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
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-5xl font-bold mb-4">192</div>
        <div className="w-full h-64">
          <canvas ref={chartRef}></canvas>
        </div>
        <Button className="w-full mt-4 bg-green-400 hover:bg-green-500 text-white">Add WhatsApp</Button>
      </CardContent>
    </Card>
  );
};

export default LeadsChart;