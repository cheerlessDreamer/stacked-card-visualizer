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
            labels: ['Calls', 'Forms', 'Emails', 'Other'],
            datasets: [{
              label: 'Leads',
              data: [101, 59, 21, 11],
              backgroundColor: [
                'rgba(31, 41, 55, 0.8)',
                'rgba(55, 65, 81, 0.8)',
                'rgba(167, 243, 208, 0.8)',
                'rgba(216, 180, 254, 0.8)'
              ],
              borderColor: [
                'rgba(31, 41, 55, 1)',
                'rgba(55, 65, 81, 1)',
                'rgba(167, 243, 208, 1)',
                'rgba(216, 180, 254, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
                beginAtZero: true
              }
            },
            plugins: {
              legend: {
                display: false
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
        <CardTitle className="text-2xl font-bold">All leads</CardTitle>
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
        <div className="w-full h-48">
          <canvas ref={chartRef}></canvas>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-gray-800 mr-2"></span>
            <span>Calls: 101</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-gray-600 mr-2"></span>
            <span>Forms: 59</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-200 mr-2"></span>
            <span>Emails: 21</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-purple-300 mr-2"></span>
            <span>Other: 11</span>
          </div>
        </div>
        <Button className="w-full mt-4 bg-green-400 hover:bg-green-500 text-white">Add WhatsApp</Button>
      </CardContent>
    </Card>
  );
};

export default LeadsChart;