import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { VscChromeClose } from "react-icons/vsc";

const PieCharts = ({ setTotalReserve, pieChart }) => {
 
  const transformedData = pieChart.map(item => ({
    name: item.type,
    value: item.count
  }));


  const generateColors = (numColors) => {
    const baseHue = Math.random() * 360; 
    return Array.from({ length: numColors }, (_, i) => {
      const hue = (baseHue + (i * 360 / numColors)) % 360; 
      return `hsl(${hue}, 70%, 60%)`; 
    });
  };


  const COLORS = generateColors(transformedData.length);

  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/20">
          <p className="text-white">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700/50">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={() => setTotalReserve(prev => ({ ...prev, Piechar: false }))}
      />
      
      <div className="relative w-[50rem] max-w-7xl mx-4 bg-gradient-to-br from-slate-900/70 to-white/50 backdrop-blur-sm rounded-lg">
        <div className="flex flex-col gap-4 p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Trending Gowns
            </h2>
            <button
              onClick={() => setTotalReserve(prev => ({ ...prev, Piechar: false }))}
              className="p-2 rounded-full hover:bg-gray-100/10 transition-colors"
            >
              <VscChromeClose className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
    
        <div className="mt-10 p-4">
          <div className="w-full h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={transformedData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value, percent }) => 
                    `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {transformedData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index]}
                      style={{ filter: 'brightness(1.1)' }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ color: 'white' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieCharts;