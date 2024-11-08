import { useState } from 'react';
import { VscChromeClose } from "react-icons/vsc";
import { IoMdAddCircle } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import { IoColorPaletteSharp } from "react-icons/io5";
import { GiMaterialsScience } from "react-icons/gi";
import Categorys from "../../../hooks/AdminHooks/Categorys.js";

const AddCategory = ({ setOpenCateg }) => {
  const { handleChange, handleSubmitCategory, allData, handleSubmitColors, handleSubmitMaterials } = Categorys();
  const [activeTab, setActiveTab] = useState('category');

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black/40" onClick={() => setOpenCateg(false)} />
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Manage Categories</h2>
          <button 
            onClick={() => setOpenCateg(false)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <VscChromeClose className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          <button
            onClick={() => setActiveTab('category')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'category' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <MdCategory className="mr-2" />
            Categories
          </button>
          <button
            onClick={() => setActiveTab('colors')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'colors' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <IoColorPaletteSharp className="mr-2" />
            Colors
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'materials' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <GiMaterialsScience className="mr-2" />
            Materials
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'category' && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Category Name</label>
              <input
                type="text"
                placeholder="Enter category name"
                value={allData.category}
                onChange={(e) => handleChange("category", e.target.value.toUpperCase())}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <button
                onClick={(e) => handleSubmitCategory(e)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <IoMdAddCircle className="w-5 h-5" />
                Add Category
              </button>
            </div>
          )}

          {activeTab === 'colors' && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Color Name</label>
              <input
                type="text"
                placeholder="Enter color name"
                value={allData.colors}
                onChange={(e) => handleChange("colors", e.target.value.toUpperCase())}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <button
                onClick={(e) => handleSubmitColors(e)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <IoMdAddCircle className="w-5 h-5" />
                Add Color
              </button>
            </div>
          )}

          {activeTab === 'materials' && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Material Name</label>
              <input
                type="text"
                placeholder="Enter material name"
                value={allData.materials}
                onChange={(e) => handleChange("materials", e.target.value.toUpperCase())}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <button
                onClick={(e) => handleSubmitMaterials(e)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <IoMdAddCircle className="w-5 h-5" />
                Add Material
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCategory;