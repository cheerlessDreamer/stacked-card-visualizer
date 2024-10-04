import { createChartData, getLighterColor } from './chartUtils';

const createLegendPlugin = (percentages) => ({
  id: 'htmlLegend',
  afterUpdate(chart, args, options) {
    const ul = document.getElementById('chart-legend');
    if (!ul) return;

    // Clear existing legend items
    ul.innerHTML = '';

    // Set legend styles
    Object.assign(ul.style, {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      gap: '16px',
      padding: '0',
      margin: '0', // Changed from '16px 0 0 0' to '0'
      listStyle: 'none',
    });

    // Create legend items
    chart.data.datasets.forEach((dataset, index) => {
      const li = document.createElement('li');
      Object.assign(li.style, {
        display: 'flex',
        alignItems: 'flex-start',
        cursor: 'pointer',
        marginBottom: '8px',
      });

      li.onclick = () => {
        chart.setDatasetVisibility(index, !chart.isDatasetVisible(index));
        chart.update();
      };

      // Color circle
      const circleSpan = document.createElement('span');
      Object.assign(circleSpan.style, {
        background: dataset.backgroundColor,
        borderColor: dataset.borderColor,
        borderWidth: `${dataset.borderWidth}px`,
        display: 'inline-block',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        marginRight: '8px',
        marginTop: '6px',
      });

      // Text container
      const textContainer = document.createElement('div');
      textContainer.style.display = 'flex';
      textContainer.style.flexDirection = 'column';
      textContainer.style.alignItems = 'flex-start';

      // Label
      const labelSpan = document.createElement('span');
      labelSpan.textContent = dataset.label;
      Object.assign(labelSpan.style, {
        color: chart.isDatasetVisible(index) ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.5)',
        textDecoration: chart.isDatasetVisible(index) ? '' : 'line-through',
        fontSize: '0.875rem',
      });

      // Value
      const valueSpan = document.createElement('span');
      const value = percentages.find(p => p.label === dataset.label)?.value;
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
});

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
      layout: { padding: 0 },
      scales: {
        x: { stacked: true, beginAtZero: true, max: 100, display: false, grid: { display: false } },
        y: { stacked: true, display: false, grid: { display: false } }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => {
              const value = percentages.find(item => item.label === context.dataset.label)?.value;
              return `${context.dataset.label}: ${value ? value.toLocaleString() : ''}`;
            }
          }
        }
      }
    },
    plugins: [createLegendPlugin(percentages)]
  };
};