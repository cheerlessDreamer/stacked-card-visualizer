export const getBackgroundColor = (label: string) => {
  const colors = {
    'Calls': 'rgba(31, 41, 55, 0.8)',
    'Forms': 'rgba(55, 65, 81, 0.8)',
    'Emails': 'rgba(167, 243, 208, 0.8)',
    'Other': 'rgba(216, 180, 254, 0.8)'
  };
  return colors[label] || 'rgba(107, 114, 128, 0.8)';
};

export const getBorderColor = (label: string) => {
  const colors = {
    'Calls': 'rgba(31, 41, 55, 1)',
    'Forms': 'rgba(55, 65, 81, 1)',
    'Emails': 'rgba(167, 243, 208, 1)',
    'Other': 'rgba(216, 180, 254, 1)'
  };
  return colors[label] || 'rgba(107, 114, 128, 1)';
};

export const createChartData = (totalLeads: number) => {
  const data = [
    { label: 'Calls', value: 101 },
    { label: 'Forms', value: 59 },
    { label: 'Emails', value: 21 },
    { label: 'Other', value: 11 },
  ];

  return data.map(item => ({
    ...item,
    percentage: (item.value / totalLeads) * 100
  }));
};