import React from 'react';

export const renderChartLegend = (chart, percentages) => {
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
      textContainer.style.fontSize = '0.75rem';

      const labelText = document.createTextNode(item.text);
      textContainer.appendChild(labelText);
      textContainer.appendChild(document.createElement('br'));

      const strong = document.createElement('strong');
      strong.textContent = percentages.find(p => p.label === item.text)?.value.toString() || '';
      strong.style.marginTop = '8px';
      strong.style.display = 'inline-block';
      textContainer.appendChild(strong);

      li.appendChild(circleSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
    });
  }
};