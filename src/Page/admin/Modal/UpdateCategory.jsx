import { VscChromeClose } from "react-icons/vsc";
import { MdCategory } from "react-icons/md";
import { IoColorPaletteSharp } from "react-icons/io5";
import { GiMaterialsScience } from "react-icons/gi";
import { useState } from "react";
import CategoryTable from "../../../Components/AdminComponents/CategoryTable";
import Color from "../../../Components/AdminComponents/Color";
import Material from "../../../Components/AdminComponents/Material";

const UpdateCategory = ({setOpenEdit}) => {

    const [activeTab, setActiveTab] = useState('category');

  let Element;

  if(activeTab === "category"){
    Element = <CategoryTable />
  }else if(activeTab === "colors"){
    Element = <Color />
  }else if(activeTab === "materials"){
    Element = <Material />
  }


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
    <div className="absolute inset-0 bg-black/40"  />
    <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">UPDATE Categories</h2>
        <button 
          onClick={() => setOpenEdit(false)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <VscChromeClose className="w-5 h-5" />
        </button>
      </div>

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

 
 <div className="mt-3">
     {Element}
 </div>

       
    </div>
  </div>
  )
}

export default UpdateCategory;