export const getBackgroundColor = (label: string) => {
  const colors = {
    'Calls': '#1F4447',
    'Forms': '#2F5D63',
    'Emails': '#97EA98',
    'Chats': '#B8FFBA',
    'Other': '#E7B6F6'
  };
  return colors[label] || '#2F5D63';
};

export const getBorderColor = (label: string) => {
  const colors = {
    'Calls': '#1F4447',
    'Forms': '#2F5D63',
    'Emails': '#97EA98',
    'Chats': '#B8FFBA',
    'Other': '#E7B6F6'
  };
  return colors[label] || '#2F5D63';
};

export const createChartData = (totalLeads: number, leadData: { label: string; value: number }[]) => {
  return leadData.map(item => ({
    ...item,
    percentage: (item.value / totalLeads) * 100
  }));
};

export const getLighterColor = (hex: string, percent: number): string => {
  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  // Increase each component by the given percentage
  r = Math.min(255, Math.round(r * (1 + percent / 100)));
  g = Math.min(255, Math.round(g * (1 + percent / 100)));
  b = Math.min(255, Math.round(b * (1 + percent / 100)));

  // Convert back to hex
  const lighterHex = `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  return lighterHex;
};