import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Chart from 'chart.js/auto';
import { createChartData, getBackgroundColor, getBorderColor } from '../utils/chartUtils';

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
              borderColor: getBorderColor(item.label),
              borderWidth: 1,
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
              const ul = chart.canvas.parentNode?.querySelector('ul');
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
                ul.style.justifyContent = 'space-around';
                ul.style.flexWrap = 'wrap';

                items.forEach(item => {
                  const li = document.createElement('li');
                  li.style.alignItems = 'center';
                  li.style.cursor = 'pointer';
                  li.style.display = 'flex';
                  li.style.flexDirection = 'row';
                  li.style.marginRight = '10px';

                  li.onclick = () => {
                    chart.setDatasetVisibility(item.index, !chart.isDatasetVisible(item.index));
                    chart.update();
                  };

                  // Color box
                  const boxSpan = document.createElement('span');
                  boxSpan.style.background = item.fillStyle;
                  boxSpan.style.borderColor = item.strokeStyle;
                  boxSpan.style.borderWidth = item.lineWidth + 'px';
                  boxSpan.style.display = 'inline-block';
                  boxSpan.style.height = '20px';
                  boxSpan.style.marginRight = '10px';
                  boxSpan.style.width = '20px';

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

                  li.appendChild(boxSpan);
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
    <Card className="w-full max-w-3xl mx-auto">
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
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-5xl font-light mb-4">192</div>
        <div className="w-full h-64 relative">
          <canvas ref={chartRef}></canvas>
          <ul className="mt-4 list-none p-0"></ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsChart;