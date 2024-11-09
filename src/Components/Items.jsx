import React, { useEffect, useState } from 'react';
import { useRouteLoaderData, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Sidebars } from '../Store/Side.js';
import io from 'socket.io-client';
import { VscChromeClose } from "react-icons/vsc";
import { BsFilter, BsSliders } from "react-icons/bs";
import { motion } from 'framer-motion';

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-w-3 aspect-h-4 bg-gray-100 rounded-2xl mb-4" />
    <div className="space-y-3">
      <div className="h-4 bg-gray-100 rounded-full w-3/4" />
      <div className="h-4 bg-gray-100 rounded-full w-1/2" />
      <div className="h-10 bg-gray-100 rounded-xl" />
    </div>
  </div>
);

const Items = () => {
  const allDatas = useRouteLoaderData("Items");
  const token = useRouteLoaderData("root");
  
  const [recomended, setRecomended] = useState(false);
  const [allItems, setAllItems] = useState(allDatas);
  const [filtered, setFiltered] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  
  const category = useSelector(state => state.Side.category);
  const openSidebar = useDispatch();
  const details = useNavigate();

  const priceMinRange = useSelector(state => state.Side.priceMinRange);
  const priceMaxRange = useSelector(state => state.Side.priceMaxRange);
  const selectedColors = useSelector(state => state.Side.selectedColors);
  const selectedMaterials = useSelector(state => state.Side.selectedMaterials);


  const handleRemoveColorFilter = (color) => {
    openSidebar(Sidebars.removeColorFilter(color));
  };
  
  const handleRemoveMaterialFilter = (material) => {
    openSidebar(Sidebars.removeMaterialFilter(material));
  };

  // WebSocket connection effect
  useEffect(() => {
    const socket = io('https://backend-production-024f.up.railway.app');
    
    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    socket.on('newProduct', (newProduct) => {
      setAllItems(prevItems => [...prevItems, newProduct]);
    });

    socket.on('deleteProduct', (deletedItem) => {
      setAllItems(prevItems => prevItems.filter(item => item.id !== deletedItem.id));
    });

    socket.on('updateProduct', (updatedItem) => {
      console.log(updatedItem)
      setAllItems(prevItems => prevItems.map(item =>
        item.id === updatedItem.id ? updatedItem : item
      ));
    });

    return () => socket.disconnect();
  }, []);


  // Filtering effect
  useEffect(() => {
    const applyFilters = async () => {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        
        let array = [];
        let filteredItems = [...allDatas];
      
        if (filtered === "High") {
          filteredItems.sort((a, b) => a.price - b.price);
        } else if (filtered === "Low") {
          filteredItems.sort((a, b) => b.price - a.price);
        }
      
        filteredItems.forEach(prod => {
          if ((category === "ALL" || prod.type === category) &&
              (genderFilter === "All" || prod.gender === genderFilter) &&
              (prod.price >= priceMinRange && prod.price <= priceMaxRange) &&
              (selectedColors.length === 0 || selectedColors.includes(prod.color)) &&
              (selectedMaterials.length === 0 || selectedMaterials.includes(prod.material))) {
            array.push(prod);
          }
        });
      
        setAllItems(array);
      } finally {
        setIsLoading(false);
      }
    };

    applyFilters();
  }, [filtered, category, genderFilter, allDatas, priceMinRange, priceMaxRange, selectedColors, selectedMaterials]);

  const filterByRecommendedSize = async () => {
    const userId = JSON.parse(localStorage.getItem('ID'));
    if (!userId) {
      console.error("User ID not found");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`https://backend-production-024f.up.railway.app/getUserSize`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
      });
  
      if (!response.ok) throw new Error("Failed to fetch user size");
  
      const userSizeData = await response.json();
      const userSize = userSizeData.data;
  
      if (!userSize) {
        console.error("User size not found");
        return;
      }
  
      let recommendedItems = [];
  
      allDatas.forEach(item => {
        if (item.type === category || category === "ALL") {
          if (item.sizes && item.sizes.length > 0) {
            const matchingSizes = item.sizes.filter(size => {
              const tolerance = {
                Bust: 2, Waist: 2, Hips: 2, Height: 3, Weight: 2,
              };
  
              return (
                Math.abs(size.Bust - userSize.Bust) <= tolerance.Bust &&
                Math.abs(size.Waist - userSize.Waist) <= tolerance.Waist &&
                Math.abs(size.Hips - userSize.Hips) <= tolerance.Hips &&
                Math.abs(size.Height - userSize.Height) <= tolerance.Height &&
                Math.abs(size.Weight - userSize.Weight) <= tolerance.Weight
              );
            });
  
            if (matchingSizes.length > 0) {
              recommendedItems.push(item);
            }
          }
        }
      });
  
      if (recomended) {
        setAllItems(allDatas);
      } else {
        setAllItems(recommendedItems);
      }
      
      setRecomended(!recomended);
    } catch (error) {
      console.error("Error fetching user size:", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-12 space-y-8">
        {/* Filter Controls */}
        <div className="backdrop-blur-md bg-white/80 border border-gray-200 rounded-3xl p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openSidebar(Sidebars.sideModal(true))}
                className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-gray-50 rounded-2xl text-sm font-medium text-gray-700 border border-gray-200 transition-all shadow-md inline-flex items-center justify-center gap-2"
              >
                <BsFilter className="w-4 h-4" />
                <span>Filters</span>
              </motion.button>

              <select
                className="form-select w-48 rounded-2xl border-gray-200 text-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 bg-white text-gray-700 shadow-md transition-all hover:border-gray-300"
                onChange={e => setGenderFilter(e.target.value)}
                defaultValue="All"
              >
                <option value="All">All Genders</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              {token && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={filterByRecommendedSize}
                  className={`${
                    recomended
                      ? "bg-emerald-500 text-white hover:bg-emerald-600"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  } px-6 py-3 rounded-2xl text-sm font-medium shadow-md border border-gray-200 transition-all w-full sm:w-auto inline-flex items-center justify-center gap-2`}
                >
                  <BsSliders className="w-4 h-4" />
                  <span>Recommended Size</span>
                </motion.button>
              )}

              <select
                className="form-select w-48 rounded-2xl border-gray-200 text-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 bg-white text-gray-700 shadow-md transition-all hover:border-gray-300"
                onChange={e => setFiltered(e.target.value)}
                defaultValue="All"
              >
                <option value="All">Sort by</option>
                <option value="High">Price: Low to High</option>
                <option value="Low">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedColors.length > 0 || selectedMaterials.length > 0) && (
          <div className="flex flex-wrap gap-3">
            {selectedColors.map((color, index) => (
              <motion.button
                key={`color-${index}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRemoveColorFilter(color)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-xl text-sm hover:bg-gray-50 transition-all shadow-md border border-gray-200"
              >
                {color}
                <VscChromeClose className="w-4 h-4" />
              </motion.button>
            ))}

            {selectedMaterials.map((material, index) => (
              <motion.button
                key={`material-${index}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRemoveMaterialFilter(material)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-xl text-sm hover:bg-gray-50 transition-all shadow-md border border-gray-200"
              >
                {material}
                <VscChromeClose className="w-4 h-4" />
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </div>
        ) : allItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allItems.map(pro => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                key={pro.id}
                className="group bg-white border border-gray-200 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative w-full pt-[100%]">
                  <img
                    src={`https://backend-production-024f.up.railway.app/uploads/${pro.image}`}
                    alt={pro.product_Name}
                    className="absolute top-0 left-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-1">
                        {pro.product_Name}
                      </h3>
                      <p className="text-lg font-semibold text-gray-900">
                        ₱{pro.price}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm ${pro.sizes.length === 0 || pro.totalQuantity === 0 ? 'text-rose-500' : 'text-emerald-500'} font-medium`}>
                        {pro.sizes.length === 0 || pro.totalQuantity === 0 ? 'Not Available' : 'Available'}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Stock: <span className={pro.totalQuantity === 0 ? 'text-rose-500' : 'text-gray-900'}>
                          {pro.totalQuantity}
                        </span>
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => details(`${pro.id}`)}
                    disabled={pro.sizes.length <= 0 || pro.totalQuantity === 0}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                      pro.sizes.length === 0 || pro.totalQuantity === 0 
                        ? 'bg-rose-500 text-white cursor-not-allowed opacity-75'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {pro.sizes.length > 0 ? 'View Details' : 'NOT AVAILABLE'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Items;