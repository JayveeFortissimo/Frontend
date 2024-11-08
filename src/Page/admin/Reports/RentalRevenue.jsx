import { useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import jsPDF from "jspdf";

const parseDate = (dateStr) => {
  const date = new Date(dateStr);
  return {
    fullDate: dateStr,
    year: date.getFullYear(),
    month: date.toLocaleString('default', { month: 'long' }),
    day: date.getDate(),
  };
};

const RentalRevenue = ({ setTotalReserve, DashInfo }) => {
  
  const processData = (data) => {
    return data.map((item) => ({
      ...parseDate(item.month),
      totalIncome: Number(item.totalIncome),
    }));
  };

  const [filter, setFilter] = useState("daily");
  const [filteredData, setFilteredData] = useState(processData(DashInfo));

  const calculateSummaries = (processedData) => {
    // Daily summary
    const dailySummary = processedData.reduce((acc, item) => {
      const dateKey = `${item.year}-${item.month}-${item.day}`;
      acc[dateKey] = (acc[dateKey] || 0) + item.totalIncome;
      return acc;
    }, {});

    // Monthly summary
    const monthlySummary = processedData.reduce((acc, item) => {
      const monthKey = `${item.year}-${item.month}`;
      acc[monthKey] = (acc[monthKey] || 0) + item.totalIncome;
      return acc;
    }, {});

    // Yearly summary
    const yearlySummary = processedData.reduce((acc, item) => {
      acc[item.year] = (acc[item.year] || 0) + item.totalIncome;
      return acc;
    }, {});

    return { dailySummary, monthlySummary, yearlySummary };
  };

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);

    const processedData = processData(DashInfo);

    let newData;
    if (selectedFilter === "yearly") {
      newData = processedData.reduce((acc, item) => {
        const found = acc.find((el) => el.year === item.year);
        if (found) {
          found.totalIncome += item.totalIncome;
        } else {
          acc.push({ year: item.year, totalIncome: item.totalIncome });
        }
        return acc;
      }, []);
    } else if (selectedFilter === "monthly") {
      newData = processedData.reduce((acc, item) => {
        const found = acc.find(
          (el) => el.year === item.year && el.month === item.month
        );
        if (found) {
          found.totalIncome += item.totalIncome;
        } else {
          acc.push({
            year: item.year,
            month: item.month,
            totalIncome: item.totalIncome,
          });
        }
        return acc;
      }, []);
    } else {
      newData = processedData;
    }

    setFilteredData(newData);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const processedData = processData(DashInfo);
    const { dailySummary, monthlySummary, yearlySummary } = calculateSummaries(processedData);

    // Title
    doc.setFontSize(20);
    doc.text('GENERAL REPORTS INCOME', 10, 10);

    // Summary section
    doc.setFontSize(12);
    doc.text('Summary:', 10, 20);
    doc.text('---------------------------------', 10, 25);

    // Daily Summary
    let yPos = 40;
    doc.text('Daily Totals:', 10, yPos);
    Object.entries(dailySummary).forEach(([date, total], index) => {
      if (index < 5) { // Limit to first 5 days to avoid overcrowding
        yPos += 10;
        doc.text(`${date}: $${total.toFixed(2)}`, 20, yPos);
      }
    });

    // Monthly Summary
    yPos += 20;
    doc.text('Monthly Totals:', 10, yPos);
    Object.entries(monthlySummary).forEach(([month, total], index) => {
      if (index < 5) { // Limit to first 5 months
        yPos += 10;
        doc.text(`${month}: $${total.toFixed(2)}`, 20, yPos);
      }
    });

    // Yearly Summary
    yPos += 20;
    doc.text('Yearly Totals:', 10, yPos);
    Object.entries(yearlySummary).forEach(([year, total], index) => {
      yPos += 10;
      doc.text(`${year}: $${total.toFixed(2)}`, 20, yPos);
    });

    // Filtered Data Section
    yPos += 20;
    doc.text('Filtered Data:', 10, yPos);
    filteredData.forEach((item, index) => {
      if (index < 10) { // Limit to first 10 entries
        yPos += 10;
        const displayText = filter === 'yearly' 
          ? `${item.year}: $${item.totalIncome.toFixed(2)}`
          : `${item.month} ${item.year}: $${item.totalIncome.toFixed(2)}`;
        doc.text(displayText, 20, yPos);
      }
    });

    doc.save('reservation-report.pdf');
  };

  const totalRevenue = filteredData.reduce((sum, item) => sum + item.totalIncome, 0);

  return (

   <>
   
   <div className="fixed inset-0 flex justify-center items-center z-10 px-5">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 to-black/50 backdrop-blur-sm" />
      <div className="relative w-full max-w-4xl h-[35rem] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 shadow-2xl">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        <div className="absolute -left-24 -top-24 w-48 h-48 bg-blue-500 rounded-full blur-[100px] opacity-20" />
        <div className="absolute -right-24 -bottom-24 w-48 h-48 bg-purple-500 rounded-full blur-[100px] opacity-20" />
        
        <div className="relative p-6 h-full overflow-auto">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Rental Income
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Total Income: ₱{totalRevenue.toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => setTotalReserve((prev) => ({ ...prev, RentalRevenue: false }))}
              className="p-2 rounded-full hover:bg-slate-700/50 transition-colors"
            >
              <VscChromeClose className="text-slate-400 hover:text-white" size={20} />
            </button>
          </div>

          <div className="mt-6 mb-3">
            <button
              onClick={generatePDF}
              className="
                px-5 py-1 rounded-lg
                bg-gradient-to-r from-blue-500 to-purple-500
                text-white font-medium
                hover:shadow-lg hover:shadow-blue-500/25
                transition-all duration-200
                flex items-center gap-2
              "
            >
              Generate Report
            </button>
          </div>

          {/* Filter */}
          <div className="flex gap-2 mb-6">
            {['daily', 'monthly', 'yearly'].map((option) => (
              <button
                key={option}
                onClick={() => handleFilterChange({ target: { value: option }})}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${filter === option
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }
                `}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={filteredData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey={filter === "yearly" ? "year" : "month"}
                  stroke="#94a3b8"
                  tick={{ fill: '#94a3b8' }}
                />
                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '0.5rem',
                    color: '#e2e8f0'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="totalIncome"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                  fill="url(#colorIncome)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>


        </div>
      </div>
    </div>
   </>

   
  );
};

export default RentalRevenue;