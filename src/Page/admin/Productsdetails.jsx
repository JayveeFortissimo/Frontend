import React from 'react';
import { useParams } from 'react-router-dom';
import EditItems from "../../hooks/AdminHooks/EditItems.js";
import { FiPackage, FiDollarSign, FiUsers, FiGrid, FiDroplet, FiLayers, FiList, FiPlusCircle, FiMinusCircle, FiMaximize2, FiMinimize2 } from 'react-icons/fi';

const ProductsDetails = () => {
  const { product_ID } = useParams();
  const {
    handleChange,
    handleForms,
    addSize,
    removeSize,
    handleSubmit,
    itemDetails,
    setItemDetails,
    isExpanded,
    toggleDetails,
    categorys,
    color,
    material
  } = EditItems(product_ID);

  return (
    <div className="bg-gradient-to-br from-[#1a2a36] via-[#172026] to-[#1a2a36] py-8 w-full">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto p-6 bg-[#1d2b37] rounded-2xl shadow-md">
        <div className='mb-8'>
          <h2 className="text-2xl font-bold text-gray-300 flex items-center gap-2">
            <FiPackage className="text-blue-500" />
            Edit Product Details
          </h2>
          <div className="h-1 w-20 bg-blue-500 mt-2 rounded-full"></div>
        </div>

        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-1">Product Name</label>
          <input
            type="text"
            value={itemDetails.product_Name}
            onChange={(e) => handleForms('product_Name', e.target.value)}
            className="w-full px-3 h-10 text-sm bg-[#172026] border border-[#131b23] rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300"
          />
        </div>

        {/* Price and Gender Row */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
              <FiDollarSign className="text-gray-500" />
              Price
            </label>
            <input
              type="number"
              value={itemDetails.price}
              onChange={(e) => handleForms('price', e.target.value)}
              className="w-full px-3 h-10 text-sm bg-[#172026] border border-[#131b23] rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300"
            />
          </div>
          <div>
            <label className=" text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
              <FiUsers className="text-gray-500" />
              Gender
            </label>
            <select
              value={itemDetails.gender}
              onChange={(e) => handleForms('gender', e.target.value)}
              className="w-full px-3 h-10 text-sm bg-[#172026] border border-[#131b23] rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        {/* Type, Color, Material Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className=" text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
              <FiGrid className="text-gray-500" />
              Type
            </label>
            <select
              value={itemDetails.type}
              onChange={(e) => handleForms('type', e.target.value)}
              className="w-full px-3 h-10 text-sm bg-[#172026] border border-[#131b23] rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300"
            >
              <option value="" disabled>Select Type</option>
              {categorys.map((cat, index) => (
                <option key={cat.id || index} value={cat.category}>{cat.category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className=" text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
              <FiDroplet className="text-gray-500" />
              Color
            </label>
            <select
              value={itemDetails.color}
              onChange={(e) => handleForms('color', e.target.value)}
              className="w-full px-3 h-10 text-sm bg-[#172026] border border-[#131b23] rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300"
            >
              <option value="" disabled>Select Color</option>
              {color.map((cat, index) => (
                <option key={cat.id || index} value={cat.color}>{cat.color}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
              <FiLayers className="text-gray-500" />
              Material
            </label>
            <select
              value={itemDetails.material}
              onChange={(e) => handleForms('material', e.target.value)}
              className="w-full px-3 h-10 text-sm bg-[#172026] border border-[#131b23] rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300"
            >
              <option value="" disabled>Select Material</option>
              {material.map((cat, index) => (
                <option key={cat.id || index} value={cat.material}>{cat.material}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
            <FiList className="text-gray-500" />
            Description
          </label>
          <textarea
            value={itemDetails.description}
            onChange={(e) => handleForms('description', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-[#172026] border border-[#131b23] rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300"
            rows={3}
          />
        </div>

        {/* Sizes and Quantities */}
        <div className="mb-6">
          <h4 className="text-md font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <FiGrid className="text-blue-500" />
            Sizes and Quantities
          </h4>
          
          {itemDetails.sizes.map((size, index) => (
            <div key={index} className="mb-4 p-4 border border-[#131b23] rounded-lg bg-[#172026]">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Size</label>
                  <input
                    type="text"
                    value={size.size}
                    onChange={(e) => handleChange(e, index, 'size')}
                    className="w-full px-3 h-10 text-sm bg-[#131b23] border border-[#0c1117] rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Quantity</label>
                  <input
                    type="number"
                    value={size.quantity}
                    onChange={(e) => handleChange(e, index, 'quantity')}
                    className="w-full px-3 h-10 text-sm bg-[#131b23] border border-[#0c1117] rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleDetails()}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#131b23] text-gray-400 rounded-lg hover:bg-[#0c1117] transition-colors"
              >
                {isExpanded ? (
                  <>
                    <FiMinimize2 /> Hide Measurements
                  </>
                ) : (
                  <>
                    <FiMaximize2 /> Show Measurements
                  </>
                )}
              </button>

              {isExpanded && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {['Bust', 'Waist', 'Hips', 'Height', 'Weight'].map((measurement) => (
                    <div key={measurement}>
                      <label className="block text-sm font-medium text-gray-400 mb-1">{measurement}</label>
                      <input
                        type="number"
                        value={size[measurement]}
                        required
                        onChange={(e) => handleChange(e, index, measurement)}
                        className="w-full px-3 h-10 text-sm bg-[#131b23] border border-[#0c1117] rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300"
                      />
                    </div>
                  ))}
                </div>
              )}

              {itemDetails.sizes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSize(index)}
                  className="mt-3 flex items-center gap-2 px-4 py-2 bg-red-600 text-red-200 rounded-lg hover:bg-red-500 transition-colors"
                >
                  <FiMinusCircle /> Remove Size
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addSize}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-blue-200 rounded-lg hover:bg-blue-500 transition-colors"
          >
            <FiPlusCircle /> Add Size
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <FiPackage /> Update Product
        </button>
      </form>
    </div>
  );
};

export default ProductsDetails;