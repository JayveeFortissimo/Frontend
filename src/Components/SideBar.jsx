import React, { useEffect, useState } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Sidebars } from "../Store/Side.js";
import { MdOutlineKeyboardArrowDown, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [colors, setColors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const mergingig = [{ category: 'ALL' }, ...categorys];


  useEffect(()=>{

    const array = [];
    const material1 = [];
    const colors1 = [];

    const allFetched = async() =>{

      try{
   
        const Category = await fetch(`https://backend-production-d6a2.up.railway.app/allCategorys`);
        const Colors = await fetch(`https://backend-production-d6a2.up.railway.app/allColors`);
        const Materials = await fetch(`https://backend-production-d6a2.up.railway.app/allMaterials`);
   
       const data1 = await Category.json();
       const data2 = await Colors.json();
       const data3 = await Materials.json();
        
       data1.data.forEach(element => {
        if (!array.includes(element.category)) {
          array.push(element.category); 
        }
       });

       data3.data.forEach(element =>{
        if (!material1.includes(element.material)) {
          material1.push(element.material); 
        }
       })
         
       data2.data.forEach(element =>{
        if (!colors1.includes(element.color)) {
          colors1.push(element.color); 
        }
       })
      
        setCategorys(array.map(category => ({ category }))); 
        setMaterials(material1);
        setColors(colors1);
   
      }catch(error){
       console.log(error);
      }
   
   
     }
   
   allFetched();
  },[]);




  const browseOpen = useSelector(state => state.Side.browse);
  const colorOpen = useSelector(state => state.Side.color);

  const resetFilters = () => {
    dispatch(Sidebars.setPriceRange({ min: 0, max: Infinity }));
  };

  const FilterSection = ({ title, isOpen, onToggle, children }) => (
    <div className="mb-4">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-gray-50/50 to-gray-100/50 backdrop-blur-sm hover:from-gray-100/50 hover:to-gray-200/50 transition-all duration-300"
      >
        <span className="text-sm font-medium bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <MdOutlineKeyboardArrowDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 space-y-2 px-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const priceRanges = [
    { label: "Under ₱1,000", min: 0, max: 1000 },
    { label: "₱1,000 - ₱3,000", min: 1000, max: 3000 },
    { label: "₱3,000 - ₱5,000", min: 3000, max: 5000 },
    { label: "₱5,000 - ₱10,000", min: 5000, max: 10000 },
    { label: "Over ₱10,000", min: 10000, max: 15000 }
  ];

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/20"
        onClick={() => dispatch(Sidebars.sideModal(false))}
      />
      
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-96 bg-white/95 backdrop-blur-xl h-full shadow-2xl overflow-y-auto"
      >
        <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 p-6 border-b border-gray-200/50">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Filters
            </h2>
            <button
              onClick={() => {
                resetFilters();
                dispatch(Sidebars.sideModal(false));
              }}
              className="p-2 hover:bg-gray-100/80 rounded-full transition-colors duration-300"
            >
              <MdClose className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <FilterSection 
            title="BROWSE COLLECTIONS"
            isOpen={browseOpen}
            onToggle={() => dispatch(Sidebars.BrowseCollections(!browseOpen))}
          >
            {mergingig.map((category, index) => (
              <motion.button
                key={index}
                whileHover={{ x: 4 }}
                onClick={() => {
                  navigate('Items');
                  dispatch(Sidebars.ChangeCategory(category.category));
                }}
                className="block w-full text-left text-sm text-gray-600 hover:text-blue-600 py-2 transition-all duration-300"
              >
                {category.category}
              </motion.button>
            ))}
          </FilterSection>

          <FilterSection 
            title="PRICE RANGE"
            isOpen={true}
          >
            {priceRanges.map((range, index) => (
              <label
                key={index}
                className="flex items-center space-x-3 p-2 hover:bg-gray-50/50 rounded-lg transition-colors duration-300"
              >
                <input
                  type="radio"
                  name="price"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  onClick={() => dispatch(Sidebars.setPriceRange({ 
                    min: range.min, 
                    max: range.max 
                  }))}
                />
                <span className="text-sm text-gray-600">{range.label}</span>
              </label>
            ))}
          </FilterSection>

          <FilterSection 
            title="COLOR"
            isOpen={colorOpen}
            onToggle={() => dispatch(Sidebars.Colors(!colorOpen))}
          >
            <div className="grid grid-cols-2 gap-2">
              {colors.map((color, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    resetFilters();
                    dispatch(Sidebars.setSelectedColors(color));
                  }}
                  className="p-3 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 text-sm text-gray-600 hover:text-blue-600 transition-all duration-300"
                >
                  {color}
                </motion.button>
              ))}
            </div>
          </FilterSection>

          <FilterSection 
            title="MATERIAL"
            isOpen={true}
          >
            <div className="grid grid-cols-2 gap-2">
              {materials.map((material, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    resetFilters();
                    dispatch(Sidebars.setSelectedMaterials(material));
                  }}
                  className="p-3 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 text-sm text-gray-600 hover:text-blue-600 transition-all duration-300"
                >
                  {material}
                </motion.button>
              ))}
            </div>
          </FilterSection>
        </div>
      </motion.div>
    </div>
  );
};

export default SideBar;