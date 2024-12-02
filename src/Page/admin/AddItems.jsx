import { useState, useEffect } from 'react';
import AddItemsy from '../../hooks/AdminHooks/AddItems.js';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';
import { MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md';
import { BiImageAdd } from 'react-icons/bi';

const AddItems = () => {
  const { handlePicture, handleForms, handleDatas, formData, addSizeField, removeSizeField, handleSizeChange, sizes } = AddItemsy(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [categorys, setCategorys] = useState([]);
  const [colors, setColors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    const allFetched = async() => {
      try {
        const Category = await fetch(`https://backend-production-d6a2.up.railway.app/allCategorys`);
        const Colors = await fetch(`https://backend-production-d6a2.up.railway.app/allColors`);
        const Materials = await fetch(`https://backend-production-d6a2.up.railway.app/allMaterials`);

        const [data1, data2, data3] = await Promise.all([
          Category.json(),
          Colors.json(),
          Materials.json()
        ]);

        setCategorys(data1.data);
        setColors(data2.data);
        setMaterials(data3.data);
      } catch(error) {
        console.log(error);
      }
    };
    allFetched();
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  return (
    <div className="min-h-screen w-[100%] bg-gradient-to-br from-[#1a2a36] via-[#172026] to-[#1a2a36] p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto bg-[#1d2b37] rounded-2xl shadow-md">
        <form onSubmit={handleDatas} className="p-6">
          <h2 className="text-2xl font-bold text-gray-300 mb-6">Add New Item</h2>
          
          {/* Basic Info Section */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Product Name"
              value={formData.product_Name}
              onChange={(e) => handleForms('product_Name', e.target.value)}
              className="w-full px-3 h-10 text-sm bg-[#172026] border border-[#131b23] rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300 outline-none"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => handleForms('price', e.target.value)}
                className="px-3 h-10 text-sm bg-[#172026] border border-[#131b23] rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300 outline-none"
              />
              <select
                value={formData.gender}
                onChange={(e) => handleForms('gender', e.target.value)}
                className="px-3 h-10 text-sm bg-[#172026] border border-[#131b23] rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300 outline-none"
              >
                <option value="Select" disabled>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <select
                value={formData.type}
                onChange={(e) => handleForms('type', e.target.value)}
                className="px-3 h-10 text-sm bg-[#172026] border border-[#131b23] rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300 outline-none"
              >
                <option value="" disabled>Category</option>
                {categorys.map((pro, index) => (
                  <option key={pro.id || index} value={pro.category}>{pro.category}</option>
                ))}
              </select>

              <select
                value={formData.color}
                onChange={(e) => handleForms('color', e.target.value)}
                className="px-3 h-10 text-sm bg-[#172026] border border-[#131b23] rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300 outline-none"
              >
                <option value="" disabled>Color</option>
                {colors.map((pro, index) => (
                  <option key={pro.id || index} value={pro.color}>{pro.color}</option>
                ))}
              </select>

              <select
                value={formData.material}
                onChange={(e) => handleForms('material', e.target.value)}
                className="px-3 h-10 text-sm bg-[#172026] border border-[#131b23] rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300 outline-none"
              >
                <option value="" disabled>Material</option>
                {materials.map((pro, index) => (
                  <option key={pro.id || index} value={pro.material}>{pro.material}</option>
                ))}
              </select>
            </div>

            <textarea
              placeholder="Product Description"
              value={formData.description}
              onChange={(e) => handleForms('description', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[#172026] border border-[#131b23] rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300 outline-none h-24"
            />
          </div>

          {/* Sizes Section */}
          <div className="mt-6">
            <h3 className="text-md font-semibold text-gray-300 mb-4 flex items-center gap-2">
              <IoAddCircleOutline className="text-blue-500" />
              Sizes and Quantities
            </h3>

            <div className="space-y-3">
              {sizes.map((sizeField, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <input
                    type="text"
                    placeholder="Size"
                    value={sizeField.size}
                    onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                    className="w-1/3 px-3 h-10 text-sm bg-[#131b23] border border-[#0c1117] rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300 outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Qty"
                    value={sizeField.quantity}
                    onChange={(e) => handleSizeChange(index, 'quantity', e.target.value)}
                    className="w-1/3 px-3 h-10 text-sm bg-[#131b23] border border-[#0c1117] rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300 outline-none"
                  />
                  {sizes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSizeField(index)}
                      className="text-red-400 hover:text-red-500"
                    >
                      <IoRemoveCircleOutline className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addSizeField}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-blue-200 rounded-lg hover:bg-blue-500 transition-colors"
            >
              <IoAddCircleOutline className="w-4 h-4" /> Add Size
            </button>
          </div>

          {/* Measurements Section */}
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-between w-full px-4 py-2 text-sm bg-[#131b23] text-gray-400 rounded-lg hover:bg-[#0c1117] transition-colors"
            >
              <span>Measurements</span>
              {isExpanded ? (
                <MdOutlineExpandLess className="w-5 h-5" />
              ) : (
                <MdOutlineExpandMore className="w-5 h-5" />
              )}
            </button>

            {isExpanded && (
              <div className="mt-4 space-y-4">
                {sizes.map((sizeField, index) => (
                  <div key={index} className="grid grid-cols-5 gap-3">
                    {['bust', 'waist', 'hips', 'height', 'weight'].map((measure) => (
                      <input
                        key={measure}
                        type="number"
                        placeholder={measure.charAt(0).toUpperCase() + measure.slice(1)}
                        value={sizeField[measure]}
                        onChange={(e) => handleSizeChange(index, measure, e.target.value)}
                        className="px-3 h-10 text-sm bg-[#131b23] border border-[#0c1117] rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-300 outline-none"
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div className="mt-6">
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-[#131b23] hover:border-[#0c1117]'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
            >
              <input
                type="file"
                name="pictures"
                multiple
                onChange={handlePicture}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-center">
                <BiImageAdd className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-400">
                  Drag and drop your image here, or click to select
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <IoAddCircleOutline className="w-5 h-5" /> Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;