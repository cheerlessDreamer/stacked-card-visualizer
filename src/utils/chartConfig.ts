import { createChartData, getLighterColor } from './chartUtils';

export const createChartConfig = (totalLeads: number, leadData: { label: string; value: number; color: string }[]) => {
  const percentages = createChartData(totalLeads, leadData);

  return {
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
        borderSkipped: false,
        borderRadius: {
          topLeft: index === 0 ? 8 : 0,
          topRight: index === percentages.length - 1 ? 8 : 0,
          bottomLeft: index === 0 ? 8 : 0,
          bottomRight: index === percentages.length - 1 ? 8 : 0,
        },
        barPercentage: 1.0,
        categoryPercentage: 1.0,
      }))
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          bottom: 16 // Add padding to the bottom of the chart
        }
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
                const value = percentages.find(item => item.label === context.dataset.label)?.value;
                label += value ? value.toLocaleString() : '';
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
          ul.style.justifyContent = 'flex-start';
          ul.style.gap = '16px';
          ul.style.padding = '0';
          ul.style.margin = '0'; // Remove the negative margin
          ul.style.listStyle = 'none';

          items.forEach(item => {
            const li = document.createElement('li');
            li.style.display = 'flex';
            li.style.alignItems = 'flex-start';
            li.style.cursor = 'pointer';
            li.style.marginBottom = '8px';

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
            circleSpan.style.width = '8px';
            circleSpan.style.height = '8px';
            circleSpan.style.borderRadius = '50%';
            circleSpan.style.marginRight = '8px';
            circleSpan.style.marginTop = '6px';

            // Text container
            const textContainer = document.createElement('div');
            textContainer.style.display = 'flex';
            textContainer.style.flexDirection = 'column';
            textContainer.style.alignItems = 'flex-start';

            // Label
            const labelSpan = document.createElement('span');
            labelSpan.textContent = item.text;
            labelSpan.style.color = item.hidden ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 1)';
            labelSpan.style.textDecoration = item.hidden ? 'line-through' : '';
            labelSpan.style.fontSize = '0.875rem';

            // Value
            const valueSpan = document.createElement('span');
            const value = percentages.find(p => p.label === item.text)?.value;
            valueSpan.textContent = value ? value.toLocaleString() : '';
            valueSpan.style.fontWeight = 'bold';
            valueSpan.style.fontSize = '0.875rem';

            textContainer.appendChild(labelSpan);
            textContainer.appendChild(valueSpan);

            li.appendChild(circleSpan);
            li.appendChild(textContainer);
            ul.appendChild(li);
          });
        }
      }
    }]
  };
};