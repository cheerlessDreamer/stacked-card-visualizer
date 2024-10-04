import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Chart from 'chart.js/auto';
import { createChartData, getBackgroundColor, getBorderColor, getLighterColor } from '../utils/chartUtils';

const LeadsChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [totalLeads, setTotalLeads] = useState(192);
  const [leadData, setLeadData] = useState([
    { label: 'Calls', value: 80 },
    { label: 'Forms', value: 50 },
    { label: 'Emails', value: 30 },
    { label: 'Chats', value: 20 },
    { label: 'Other', value: 12 },
  ]);

  const updateChart = () => {
    if (chartRef.current) {
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
              backgroundColor: getBackgroundColor(item.label),
              hoverBackgroundColor: getLighterColor(getBackgroundColor(item.label) || '#2F5D63', 15),
              borderColor: getBorderColor(item.label),
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
            afterUpdate(chart, args, options) {
              const ul = document.getElementById('chart-legend');
              if (ul) {
                // Clear existing legend items
                while (ul.firstChild) {
                  ul.firstChild.remove();
                }

                // Recreate legend items
                const items = chart.data.datasets.map((dataset, index) => ({
                  text: dataset.label,
                  fillStyle: dataset.backgroundColor as string,
                  strokeStyle: dataset.borderColor as string,
                  lineWidth: dataset.borderWidth,
                  hidden: !chart.isDatasetVisible(index),
                  index: index
                }));

                ul.style.display = 'flex';
                ul.style.flexWrap = 'wrap';
                ul.style.gap = '16px';
                ul.style.padding = '0';
                ul.style.margin = '16px 0 0 0';
                ul.style.listStyle = 'none';

                items.forEach(item => {
                  const li = document.createElement('li');
                  li.style.alignItems = 'flex-start';
                  li.style.cursor = 'pointer';
                  li.style.display = 'flex';
                  li.style.flexDirection = 'row';
                  li.style.width = 'auto';

                  li.onclick = () => {
                    chart.setDatasetVisibility(item.index, !chart.isDatasetVisible(item.index));
                    chart.update();
                  };

                  // Color circle
                  const circleSpan = document.createElement('span');
                  circleSpan.style.background = item.fillStyle;
                  circleSpan.style.borderColor = item.strokeStyle;
                  circleSpan.style.borderWidth = item.lineWidth + 'px';
                  circleSpan.style.display = 'inline-block';
                  circleSpan.style.width = '12px';
                  circleSpan.style.height = '12px';
                  circleSpan.style.borderRadius = '50%';
                  circleSpan.style.marginRight = '8px';
                  circleSpan.style.marginTop = '4px';

                  // Text
                  const textContainer = document.createElement('p');
                  textContainer.style.color = item.hidden ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 1)';
                  textContainer.style.margin = '0';
                  textContainer.style.padding = '0';
                  textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

                  const labelText = document.createTextNode(item.text);
                  textContainer.appendChild(labelText);
                  textContainer.appendChild(document.createElement('br'));

                  const strong = document.createElement('strong');
                  strong.textContent = percentages.find(p => p.label === item.text)?.value.toString() || '';
                  textContainer.appendChild(strong);

                  li.appendChild(circleSpan);
                  li.appendChild(textContainer);
                  ul.appendChild(li);
                });
              }
            }
          }]
        });
      }
    }
  };

  useEffect(() => {
    updateChart();
  }, [totalLeads, leadData]);

  const handleInputChange = (index: number, value: string) => {
    const newLeadData = [...leadData];
    newLeadData[index].value = parseInt(value) || 0;
    setLeadData(newLeadData);
    setTotalLeads(newLeadData.reduce((sum, item) => sum + item.value, 0));
  };

  return (
    <Card className="w-full max-w-3xl mx-auto p-8 rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-normal">All channels</CardTitle>
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
        <div className="text-5xl font-light mb-2">{totalLeads}</div>
        <div className="flex-grow relative">
          <canvas ref={chartRef}></canvas>
        </div>
        <ul id="chart-legend" className="mt-4"></ul>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Update Lead Data</h3>
          <div className="grid grid-cols-2 gap-4">
            {leadData.map((item, index) => (
              <div key={item.label} className="flex items-center space-x-2">
                <label className="w-20">{item.label}:</label>
                <Input
                  type="number"
                  value={item.value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="w-24"
                />
              </div>
            ))}
          </div>
          <Button className="mt-4" onClick={updateChart}>Update Chart</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsChart;