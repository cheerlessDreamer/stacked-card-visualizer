import React, { useState } from 'react';
import LeadsChart from '../components/LeadsChart';
import LeadDataForm from '../components/LeadDataForm';

const Index = () => {
  const [leadData, setLeadData] = useState([
    { label: 'Calls', value: 80 },
    { label: 'Forms', value: 50 },
    { label: 'Emails', value: 30 },
    { label: 'Chats', value: 20 },
    { label: 'Other', value: 12 },
  ]);

  const totalLeads = leadData.reduce((sum, item) => sum + item.value, 0);

  const handleInputChange = (index: number, value: string) => {
    const newLeadData = [...leadData];
    newLeadData[index].value = parseInt(value) || 0;
    setLeadData(newLeadData);
  };

  const handleUpdateChart = () => {
    // The chart will update automatically due to state changes
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#2F5D63] p-4 space-y-8">
      <LeadsChart totalLeads={totalLeads} leadData={leadData} />
      <LeadDataForm
        leadData={leadData}
        onInputChange={handleInputChange}
        onUpdateChart={handleUpdateChart}
      />
    </div>
  );
};

export default Index;