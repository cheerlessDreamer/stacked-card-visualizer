import React, { useState } from 'react';
import LeadsChart from '../components/LeadsChart';
import LeadDataForm from '../components/LeadDataForm';

const Index = () => {
  const [leadData, setLeadData] = useState([
    { label: 'Calls', value: 80, color: '#1F4447' },
    { label: 'Forms', value: 50, color: '#2F5D63' },
    { label: 'Emails', value: 30, color: '#97EA98' },
    { label: 'Chats', value: 20, color: '#B8FFBA' },
    { label: 'Other', value: 12, color: '#E7B6F6' },
  ]);

  const totalLeads = leadData.reduce((sum, item) => sum + item.value, 0);

  const handleInputChange = (index: number, field: 'label' | 'value' | 'color', value: string) => {
    const newLeadData = [...leadData];
    if (field === 'value') {
      newLeadData[index][field] = parseInt(value) || 0;
    } else {
      newLeadData[index][field] = value;
    }
    setLeadData(newLeadData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#2F5D63] p-4 space-y-8">
      <LeadsChart totalLeads={totalLeads} leadData={leadData} />
      <LeadDataForm
        leadData={leadData}
        onInputChange={handleInputChange}
      />
    </div>
  );
};

export default Index;