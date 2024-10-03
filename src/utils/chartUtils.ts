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

export const createChartData = (totalLeads: number) => {
  const data = [
    { label: 'Calls', value: 80 },
    { label: 'Forms', value: 50 },
    { label: 'Emails', value: 30 },
    { label: 'Chats', value: 20 },
    { label: 'Other', value: 12 },
  ];

  return data.map(item => ({
    ...item,
    percentage: (item.value / totalLeads) * 100
  }));
};