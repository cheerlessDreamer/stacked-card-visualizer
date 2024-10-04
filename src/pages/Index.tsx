import React, { useState } from 'react';
import LeadsChart from '../components/LeadsChart';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Index = () => {
  const [cardSize, setCardSize] = useState({ width: 768, height: 400 });

  const handleSizeChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const width = Number(formData.get('width'));
    const height = Number(formData.get('height'));
    setCardSize({ width, height });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#2F5D63] p-4">
      <div style={{ width: `${cardSize.width}px`, height: `${cardSize.height}px` }}>
        <LeadsChart />
      </div>
      <form onSubmit={handleSizeChange} className="mt-4 flex space-x-2">
        <Input
          type="number"
          name="width"
          placeholder="Width (px)"
          defaultValue={cardSize.width}
          className="w-24"
        />
        <Input
          type="number"
          name="height"
          placeholder="Height (px)"
          defaultValue={cardSize.height}
          className="w-24"
        />
        <Button type="submit">Resize</Button>
      </form>
    </div>
  );
};

export default Index;