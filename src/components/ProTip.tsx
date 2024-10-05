import React from 'react';
import { Stars } from 'lucide-react';

const ProTip = () => {
  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 rounded-lg shadow-lg">
      <div className="flex items-center mb-2">
        <Stars className="w-6 h-6 text-yellow-300 mr-2" />
        <h3 className="text-xl font-bold text-white">Pro Tip: Taking Screenshots on Mac</h3>
      </div>
      <ul className="list-disc pl-5 space-y-2 text-white">
        <li><strong>Cmd + Shift + 4:</strong> Take a screenshot of a selected area and save it as a file.</li>
        <li><strong>Cmd + Ctrl + Shift + 4:</strong> Take a screenshot of a selected area and save it to the clipboard.</li>
      </ul>
      <p className="mt-2 text-yellow-100 italic">Use these shortcuts to capture your chart for easy sharing in presentations!</p>
    </div>
  );
};

export default ProTip;