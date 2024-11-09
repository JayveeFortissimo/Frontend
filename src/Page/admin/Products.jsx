import { useRouteLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiPlus, 
  FiPackage, 
  FiTrash2, 
  FiEdit3, 
  FiFilter,
  FiGrid,
  FiList,
  FiSettings,
  FiSearch,
  FiX
} from 'react-icons/fi';
import deleteItems from '../../hooks/AdminHooks/Delete.js';
import AddCategory from './Modal/AddCategory.jsx';
import UpdateCategory from './Modal/UpdateCategory.jsx';

const Products = () => {
  const allProduct = useRouteLoaderData("product");
  const navigate = useNavigate();
  const [openCateg, setOpenCateg] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [allData, setData] = useState([]);
  const [select, setSelect] = useState("all");
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { deletes } = deleteItems(allData, setData);

  const [categorys, setCategorys] = useState([]);
  const mergingig = [{ category: 'all' }, ...categorys];

  useEffect(() => {
    const array = [];
    fetch(`https://backend-production-024f.up.railway.app/allCategorys`)
      .then(response => response.json())
      .then(data => {
        data.data.forEach(element => {
          if (element.category) {
            array.push({ category: element.category })
          }
        });
        setCategorys(array)
      })
  }, [])

  useEffect(() => {
    let array = [];
    allProduct.filter(pro => {
      const matchesSearch = pro.product_Name.toLowerCase().includes(searchTerm.toLowerCase());
      if (matchesSearch && (pro.type === select || select === 'all')) {
        array.push(pro)
      }
    });
    setData(array)
  }, [allProduct, select, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 w-full">
      {openCateg && <AddCategory setOpenCateg={setOpenCateg} />}
      {openEdit && <UpdateCategory setOpenEdit={setOpenEdit}/>}
      
      {/* Header */}
      <div className="backdrop-blur-xl bg-gray-900/60 sticky top-0 z-10 border-b border-gray-700/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <FiPackage className="h-6 w-6 text-blue-400" />
              <h1 className="ml-3 text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Products Management
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className={`relative transition-all duration-300 ${
                isSearchFocused ? 'scale-105' : 'scale-100'
              }`}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-10 pr-10 py-2 rounded-xl bg-gray-800/80 backdrop-blur-sm border border-gray-700 
                    focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 text-gray-200 placeholder-gray-400"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    <FiX />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3 xs:hidden md:flex">
              <button 
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 rounded-lg hover:bg-gray-800/80 transition-colors text-gray-400 hover:text-gray-200"
              >
                {viewMode === 'grid' ? <FiList className="w-5 h-5" /> : <FiGrid className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Bar */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select 
                onChange={e => setSelect(e.target.value)}
                className="appearance-none bg-gray-800/80 backdrop-blur-sm text-gray-200 pl-3 pr-10 py-2 rounded-xl border border-gray-700 
                  focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 text-sm"
              >
                {mergingig.map((pro, index) => (
                  <option key={index} value={pro.category} className="bg-gray-800">
                    {pro.category.charAt(0).toUpperCase() + pro.category.slice(1)}
                  </option>
                ))}
              </select>
              <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {searchTerm && (
              <div className="text-sm text-gray-400">
                Found {allData.length} results
              </div>
            )}
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setOpenCateg(true)}
              className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-green-500/80 to-green-600/80 text-white 
                hover:from-green-500 hover:to-green-600 transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/40 backdrop-blur-sm"
            >
              <FiPlus className="mr-2" />
              Add Category
            </button>

            <button
              onClick={()=> setOpenEdit(true)}
              className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-red-500/80 to-red-600/80 text-white 
                hover:from-red-500 hover:to-red-600 transition-all shadow-lg shadow-red-500/20 hover:shadow-red-500/40 backdrop-blur-sm"
            >
              <FiSettings className="mr-2" />
              Update Category
            </button>

            <button
              onClick={() => navigate('/admin/addItems')}
              className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/80 to-blue-600/80 text-white 
                hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 backdrop-blur-sm"
            >
              <FiPlus className="mr-2" />
              Add Product
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {allData.map(pro => (
            <div key={pro.id} className="group bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 
              hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="relative aspect-square overflow-hidden rounded-t-xl">
                <img 
                  src={`https://backend-production-024f.up.railway.app/uploads/${pro.image}`}
                  alt={pro.product_Name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="p-4">
                <div className="mb-4">
                  <h2 className="text-lg font-medium text-gray-200">{pro.product_Name}</h2>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      ₱{pro.price}
                    </p>
                    <span className="px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm" 
                      style={{
                        backgroundColor: pro.totalQuantity === 0 ? 'rgb(220, 38, 38, 0.1)' : 'rgb(22, 163, 74, 0.1)',
                        color: pro.totalQuantity === 0 ? '#FCA5A5' : '#86EFAC'
                      }}
                    >
                      {pro.totalQuantity === 0 ? 'Out of Stock' : `${pro.totalQuantity} in Stock`}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-400">{pro.type} gown</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`${pro.id}`);
                    }}
                    className="flex-1 inline-flex justify-center items-center px-3 py-2 rounded-lg bg-gray-700/50 text-gray-200 
                      hover:bg-gray-700 transition-all hover:shadow-lg hover:shadow-blue-500/10"
                  >
                    <FiEdit3 className="mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={e => deletes(e, pro.id)}
                    className="flex-1 inline-flex justify-center items-center px-3 py-2 rounded-lg bg-red-500/10 text-red-400 
                      hover:bg-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/10"
                  >
                    <FiTrash2 className="mr-2" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {allData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No products found {searchTerm ? `for "${searchTerm}"` : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;

// Loader function remains unchanged
export const itemsProduct = async () => {
  try {
    const response = await fetch(`https://backend-production-024f.up.railway.app/Items`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch data");
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data.data;  
  } catch (error) {
    console.error("Error fetching items:", error);
    return { error: "Failed to load items" };
  }
};