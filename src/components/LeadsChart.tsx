import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Chart from 'chart.js/auto';
import { createChartData, getBackgroundColor, getBorderColor, getLighterColor } from '../utils/chartUtils';

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
        const percentages = createChartData(totalLeads);

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

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <Card className="w-full h-full max-w-full mx-auto p-8 rounded-2xl flex flex-col">
      <CardHeader className="flex-shrink-0 flex flex-row items-center justify-between space-y-0 pb-2">
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
      <div className="text-5xl font-light mb-2 flex-shrink-0">192</div>
      <CardContent className="flex-grow flex flex-col">
        <div className="flex-grow relative">
          <canvas ref={chartRef} className="w-full h-full"></canvas>
        </div>
        <ul id="chart-legend" className="mt-4 flex-shrink-0"></ul>
      </CardContent>
    </Card>
  );
};

export default LeadsChart;