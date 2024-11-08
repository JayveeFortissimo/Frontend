import { useMemo, useState } from 'react';
import { VscChromeClose, VscSearch } from "react-icons/vsc";
import jsPDF from "jspdf";


const TotalGowns = ({ setTotalReserve, DashInfo }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Group items by product name and merge their sizes
  const mergedGowns = useMemo(() => {
    const groupedItems = DashInfo.reduce((acc, item) => {
      const key = `${item.product_Name}-${item.type}-${item.gender}-${item.price}`;
      
      if (!acc[key]) {
        acc[key] = {
          ...item,
          allSizes: new Set([item.sizes]),
          totalQuantity: item.quantity,
          sizeQuantities: {
            [item.sizes]: item.quantity
          }
        };
      } else {
        acc[key].allSizes.add(item.sizes);
        acc[key].totalQuantity += item.quantity;
        acc[key].sizeQuantities[item.sizes] = item.quantity;
      }
      return acc;
    }, {});

    return Object.values(groupedItems).map(item => ({
      ...item,
      allSizes: Array.from(item.allSizes).sort()
    }));
  }, [DashInfo]);

  // Filter gowns based on search query
  const filteredGowns = useMemo(() => {
    return mergedGowns.filter(item =>
      item.product_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.gender.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [mergedGowns, searchQuery]);

  const generatePDF = () => {
    const doc = new jsPDF();
    let yPosition = 10;
    
    // Title
    doc.setFontSize(20);
    doc.text('General Total Gowns Report', 10, yPosition);
    
    // Summary section
    yPosition += 10;
    doc.setFontSize(14);
    doc.text('Summary:', 10, yPosition);
    
    yPosition += 5;
    doc.setFontSize(12);
    doc.text('---------------------------------', 10, yPosition);
    
    // Calculate totals
    const totalGowns = filteredGowns.length;
    const totalValue = filteredGowns.reduce((sum, gown) => sum + (gown.price * gown.totalQuantity), 0);
    
    // Summary statistics
    yPosition += 10;
    doc.text(`Total Gowns: ${totalGowns}`, 10, yPosition);
    yPosition += 7;
    doc.text(`Total Inventory Value: ₱${totalValue.toLocaleString()}`, 10, yPosition);
    
    // Gown Details
    filteredGowns.forEach((gown, index) => {
      yPosition += 15;
      
      // Add new page if content exceeds page height
      if (yPosition >= 280) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Gown header
      doc.setFont(undefined, 'bold');
      doc.text(`Gown ${index + 1}: ${gown.product_Name}`, 10, yPosition);
      doc.setFont(undefined, 'normal');
      
      // Basic details
      yPosition += 7;
      doc.text(`ID: ${gown.id}`, 20, yPosition);
      
      yPosition += 7;
      doc.text(`Type: ${gown.type}`, 20, yPosition);
      
      yPosition += 7;
      doc.text(`Gender: ${gown.gender}`, 20, yPosition);
      
      yPosition += 7;
      doc.text(`Price: ₱${gown.price.toLocaleString()}`, 20, yPosition);
      
      // Size and quantity information
      yPosition += 7;
      doc.text('Available Sizes & Quantities:', 20, yPosition);
      
      Object.entries(gown.sizeQuantities).forEach(([size, quantity]) => {
        yPosition += 7;
        doc.text(`  • Size ${size}: ${quantity} pieces`, 25, yPosition);
      });
      
      yPosition += 7;
      doc.text(`Total Quantity: ${gown.totalQuantity} pieces`, 20, yPosition);
      
      // Additional details
      yPosition += 7;
      doc.text(`Material: ${gown.material}`, 20, yPosition);
      
      yPosition += 7;
      doc.text(`Color: ${gown.color}`, 20, yPosition);
      
      // Description (with word wrap)
      yPosition += 7;
      const splitDescription = doc.splitTextToSize(`Description: ${gown.description}`, 180);
      doc.text(splitDescription, 20, yPosition);
      yPosition += (splitDescription.length * 7);
      
      // Separator between gowns
      yPosition += 3;
      doc.text('---------------------------------', 10, yPosition);
    });
    
    // End of report
    yPosition += 10;
    doc.text('End of Report', 10, yPosition);
    
    doc.save('gowns-report.pdf');
  };




  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop with stronger blur effect */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={() => setTotalReserve(prev => ({ ...prev, TotalGowns: false }))}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-7xl mx-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20">
        {/* Header */}
        <div className="flex flex-col gap-4 p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Total Gowns</h2>
            <button
              onClick={() => setTotalReserve(prev => ({ ...prev, TotalGowns: false }))}
              className="p-2 rounded-full hover:bg-gray-100/50 transition-colors"
            >
              <VscChromeClose className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <VscSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, type, or gender..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>
      

        <div className='ml-7'>
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
              Print Report
            </button>
     </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto h-[calc(100vh-15rem)]">
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredGowns.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  {/* Image Section */}
                  <div className="aspect-square w-full overflow-hidden relative">
                    <img
                      src={`http://localhost:8000/uploads/${item.image}`}
                      alt={item.product_Name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          item.totalQuantity === 0
                            ? "bg-red-100/90 text-red-600"
                            : "bg-green-100/90 text-green-600"
                        }`}
                      >
                        Total: {item.totalQuantity}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-3 space-y-2">
                    <div>
                      <h3 className="font-medium text-gray-900 truncate">
                        {item.product_Name}
                      </h3>
                      <p className="text-xs text-gray-500">₱{item.price}</p>
                    </div>

                    {/* Size Pills with Quantities */}
                    <div className="flex flex-wrap gap-1">
                      {item.allSizes.map((size, sizeIndex) => (
                        <div
                          key={sizeIndex}
                          className="px-2 py-0.5 text-xs rounded-full bg-gray-100/70 text-gray-700 flex items-center gap-1"
                        >
                          <span>{size}</span>
                          <span className="inline-flex items-center justify-center bg-gray-200/70 rounded-full w-4 h-4 text-[10px]">
                            {item.sizeQuantities[size]}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-xs text-gray-600">
                      <span className="bg-gray-100/70 px-2 py-0.5 rounded-full">{item.type}</span>
                      <span className="bg-gray-100/70 px-2 py-0.5 rounded-full">{item.gender}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalGowns;