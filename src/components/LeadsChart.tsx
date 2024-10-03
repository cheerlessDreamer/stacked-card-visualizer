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

        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Total'],
            datasets: [
              {
                label: 'Calls',
                data: [101],
                backgroundColor: 'rgba(31, 41, 55, 0.8)',
                borderColor: 'rgba(31, 41, 55, 1)',
                borderWidth: 1
              },
              {
                label: 'Forms',
                data: [59],
                backgroundColor: 'rgba(55, 65, 81, 0.8)',
                borderColor: 'rgba(55, 65, 81, 1)',
                borderWidth: 1
              },
              {
                label: 'Emails',
                data: [21],
                backgroundColor: 'rgba(167, 243, 208, 0.8)',
                borderColor: 'rgba(167, 243, 208, 1)',
                borderWidth: 1
              },
              {
                label: 'Other',
                data: [11],
                backgroundColor: 'rgba(216, 180, 254, 0.8)',
                borderColor: 'rgba(216, 180, 254, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                stacked: true,
                beginAtZero: true
              },
              y: {
                stacked: true
              }
            },
            plugins: {
              legend: {
                position: 'bottom'
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