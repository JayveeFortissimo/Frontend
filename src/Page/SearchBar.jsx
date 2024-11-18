import { useState, useEffect } from "react";
import { VscChromeClose, VscSearch } from "react-icons/vsc";
import { MdSort, MdOutlinePriceChange } from "react-icons/md";
import { useNavigate, useRouteLoaderData } from "react-router-dom";

const SearchBar = () => {
  const items = useRouteLoaderData("search");
  const navigate = useNavigate();

  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const debounceSearch = setTimeout(() => {
      if (searchQuery === "") {
        setFilteredItems([]);
        setIsLoading(false);
        return;
      }

      const search = searchQuery.toLowerCase();
      let filtered = [...items.data].filter((product) =>
        product.product_Name.toLowerCase().includes(search)
      );

      if (searchQuery === "High") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (searchQuery === "Low") {
        filtered.sort((a, b) => a.price - b.price);
      }

      setFilteredItems(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(debounceSearch);
  }, [searchQuery, items]);

  const ProductCard = ({ product }) => (
    <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={`http://localhost:8000/uploads/${product.image}`}
          alt={product.product_Name}
          className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
              {product.product_Name}
            </h3>
            <p className="text-violet-600 font-medium">
              ₱{product.price.toLocaleString()}
            </p>
          </div>
          <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
            {product.type} gown
          </span>
        </div>
        
        <button
          onClick={() => navigate(`/Items/${product.id}`)}
          className="w-full py-2 px-4 bg-neutral-700 text-white rounded-md 
                   transition-colors duration-300 hover:bg-violet-600 
                   focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
        >
          View Details
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <VscSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for dresses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 
                         focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
                         text-lg transition-all duration-300"
              />
            </div>
            <button
              onClick={() => navigate("..")}
              className="p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <VscChromeClose className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 px-4 pb-8 max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600" />
          </div>
        ) : (
          <>
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : searchQuery && (
              <div className="text-center py-16">
                <VscSearch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">No results found</h3>
                <p className="text-gray-500">Try adjusting your search to find what you're looking for.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

// API function with error handling
export const itemSearch = async () => {
  try {
    const response = await fetch("http://localhost:8000/Items", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Failed to fetch items:", error);
    throw error; // Re-throw to handle in the component
  }
};