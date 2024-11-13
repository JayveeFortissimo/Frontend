import { useNavigate, useLoaderData, useRouteLoaderData } from "react-router-dom";
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, format, differenceInDays } from 'date-fns';
import { useState, useRef, useEffect } from "react";
import Tocart from '../../hooks/Tocart_check.js';
import ProfileDetails from '../../hooks/ProfileDetails.js';
import { FaRulerCombined } from "react-icons/fa";
import { 
  FiCalendar, 
  FiShoppingCart, 
  FiArrowLeft,
  FiPlus,
  FiMinus,
  FiBox
} from 'react-icons/fi';

const ItemDetails = () => {
  const Token = useRouteLoaderData('root');
  const itemsDetails = useLoaderData();
  const navigate = useNavigate();


console.log(itemsDetails)

  const { toCart } = Tocart();
  const { allSize } = ProfileDetails(itemsDetails[0]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [additionalFee, setAdditionalFee] = useState(0);
  const maxQuantityPerSize = useRef({});

  const EXTRA_DAY_FEE = 150; 
  const BASE_RENTAL_DAYS = 3; 

  useEffect(() => {
    allSize.forEach(pro => {
      maxQuantityPerSize.current[pro.sizes] = pro.quantity;
    });
  }, [allSize, itemsDetails]);

  const calculateAdditionalFee = (start, end) => {
    if (!start || !end) return 0;
    const days = differenceInDays(end, start);
    const extraDays = Math.max(0, days - BASE_RENTAL_DAYS);
    return extraDays * EXTRA_DAY_FEE;
  };

  const handleStartDateChange = (date) => {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    setStartDate(utcDate);
    setEndDate(addDays(utcDate, BASE_RENTAL_DAYS));
    setReturnDate(addDays(utcDate, BASE_RENTAL_DAYS));
    setAdditionalFee(0); // Reset additional fee when start date changes
  };

  const handleEndDateChange = (date) => {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    setEndDate(utcDate);
    setReturnDate(utcDate);
    const fee = calculateAdditionalFee(startDate, utcDate);
    setAdditionalFee(fee);
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => {
      const newSizes = { ...prev };
      if (newSizes[size]) {
        delete newSizes[size];
      } else {
        const selectedSize = allSize.find(pro => pro.sizes === size);
        newSizes[size] = { ...selectedSize, quantity: 1 };
      }
      return newSizes;
    });
  };

  const handleQuantityChange = (size, change) => {
    setSelectedSizes(prev => {
      const newQuantity = (prev[size]?.quantity || 0) + change;
      if (newQuantity >= 1 && newQuantity <= maxQuantityPerSize.current[size]) {
        return { ...prev, [size]: { ...prev[size], quantity: newQuantity } };
      } else {
        toast.error(`Quantity must be between 1 and ${maxQuantityPerSize.current[size]} for ${size}`);
        return prev;
      }
    });
  };

  const handleAddToCart = (e, pro) => {
    e.preventDefault();
    if (Object.keys(selectedSizes).length === 0) {
      toast.error("Please select at least one size.");
      return;
    }
    if (!startDate || !endDate) {
      toast.error("Please select rental dates.");
      return;
    }
    Object.entries(selectedSizes).forEach(([size, { quantity }]) => {
      // Pass additional fee to toCart function
      toCart(e, pro, startDate, endDate, size, quantity, additionalFee);
    });
  };


  const fullImages = itemsDetails[0].images.map(img => `${'https://backend-production-024f.up.railway.app/uploads/'}${img}`);
console.log(fullImages)
  const [selectedImage, setSelectedImage] = useState(fullImages[0]);


  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
  };


  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    const currentIndex = fullImages.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % fullImages.length;
    setSelectedImage(fullImages[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = fullImages.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + fullImages.length) % fullImages.length;
    setSelectedImage(fullImages[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {itemsDetails.map((pro, index) => (
          <div key={index} className="flex flex-col lg:flex-row gap-8 bg-white rounded-3xl overflow-hidden shadow-lg">
            {/* Image Section */}
            <div className="lg:w-1/2">
              <div className="sticky top-0">
                <div className="relative overflow-hidden rounded-3xl">
                
          
                <div className="gallery">

                {isMobile ? (
        <div className="carousel">
          <div className="carousel-buttons">
            <button onClick={handlePrev}>&lt;</button>
            <button onClick={handleNext}>&gt;</button>
          </div>
          {fullImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Carousel Image ${index + 1}`}
              style={{ display: selectedImage === img ? 'block' : 'none' }}
            />
          ))}
        </div>
      ) : (
        <div className="thumbnails">
          {fullImages.map((img, index) => (
            <div key={index} className={`thumbnail ${selectedImage === img ? 'active' : ''}`}>
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(img)}
              />
            </div>
          ))}
        </div>
      )}

  <div className="main-image"   onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 50, y: 50 })}
      
      >
    <img src={selectedImage} alt="Selected" className="large-image" />
  </div>
</div>




                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="lg:w-1/2 p-8 lg:p-12 space-y-8">
              {/* Product Header */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium">
                    {pro.type}
                  </span>
                  <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium">
                    {pro.color}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{pro.product_Name}</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-emerald-600">
                    ₱{(pro.price + additionalFee).toLocaleString('en-US')}
                  </span>
                </div>
                {additionalFee > 0 && (
                  <p className="text-sm text-gray-500 flex items-center space-x-1">
                    <span>Includes</span>
                    <span className="font-semibold text-emerald-600">₱{additionalFee.toLocaleString('en-US')}</span>
                    <span>additional fee for extended rental</span>
                  </p>
                )}
              </div>

              {/* Sizes Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <FiBox className="w-5 h-5 text-gray-600" />
                  <h3 className="text-[1rem] font-semibold text-gray-900">Available Sizes</h3>
                  
                </div>
                {allSize.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {allSize.map(size =>{
                      return (
                        <button
                          key={size.id}
                          disabled={size.quantity <= 0}
                          onClick={() => handleSizeToggle(size.sizes)}
                          className={`px-4 py-2 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 flex items-center
                            ${selectedSizes[size.sizes]
                              ? 'border-emerald-600 bg-emerald-600 text-white shadow-lg'
                              : 'border-gray-200 hover:border-emerald-600 text-gray-700 hover:shadow-md'
                            }
                             ${
                              size.quantity <= 0? "bg-gray-600 text-white":undefined
                             }
                            `}
                        >
                          {size.sizes}
                           {size.quantity <=0 && <p className="ml-3 text-[0.9rem]">0</p>}
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No sizes available</p>
                )}
              </div>

              {/* Selected Sizes Section */}
              {Object.entries(selectedSizes).map(([size, { quantity, Bust, Waist, Hips }]) => (
                <div key={size} className="bg-gray-50 p-6 rounded-2xl space-y-4 transform transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">Size {size}</span>
                    <span className="text-sm text-emerald-600 font-medium">
                      {maxQuantityPerSize.current[size]} available
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                      <span className="px-3 py-1 bg-white rounded-full">Bust: {Bust}"</span>
                      <span className="px-3 py-1 bg-white rounded-full">Waist: {Waist}"</span>
                      <span className="px-3 py-1 bg-white rounded-full">Hips: {Hips}"</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={() => handleQuantityChange(size, -1)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors"
                        disabled={quantity <= 1}
                      >
                        <FiMinus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(size, 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Date Selection */}
              <div className="space-y-6">
                 
              <div className='mt-10'>
              <a href="https://ibb.co/1mJvLSP" target="_blank" className='flex gap-2 items-center'><span className="underline">Size Guide </span> <FaRulerCombined /> </a>
              </div>
              
                <div className="flex items-center space-x-2">
                  <FiCalendar className="w-5 h-5 text-gray-600" />
                  <h3 className="text-[1rem] font-semibold text-gray-900">Rental Period</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Start Date</label>
                    <DatePicker
                      selected={startDate}
                      onChange={handleStartDateChange}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      minDate={new Date()}
                      dateFormat="MMMM d, yyyy"
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholderText="Select start date"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">End Date</label>
                    <DatePicker
                      selected={endDate}
                      onChange={handleEndDateChange}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      dateFormat="MMMM d, yyyy"
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholderText="Select end date"
                    />
                  </div>
                </div>

                {startDate && (
                  <div className="bg-emerald-50 p-6 rounded-xl space-y-3">
                    <div className="space-y-2 text-emerald-700">
                      <p className="text-sm font-medium">
                        Rental period: {format(startDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')}
                      </p>
                      <p className="text-sm font-medium">
                        Duration: {differenceInDays(endDate, startDate)} days
                      </p>
                      <p className="text-sm font-medium">
                        Return by: {format(returnDate, 'MMMM d, yyyy')}
                      </p>
                      <p className="text-sm font-bold">
                      An additional 150 per extra day of rental
                      </p>
                      {additionalFee > 0 && (
                        <p className="text-sm font-medium">
                          Additional fee: ₱{additionalFee.toLocaleString('en-US')}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-4 pt-6">
                <button
                  onClick={(e) => Token ? handleAddToCart(e, pro) : navigate('/login')}
                  className={`w-full py-3 px-6 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-102 flex items-center justify-center space-x-2
                    ${Token && startDate && endDate
                      ? 'bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  disabled={!Token || !startDate || !endDate}
                >
                  <FiShoppingCart className="w-5 h-5" />
                  <span>{Token ? 'Add to Cart' : 'Sign in to Add to Cart'}</span>
                </button>

                <button 
                  onClick={() => navigate('..')}
                  className="w-full py-3 px-6 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-102 flex items-center justify-center space-x-2"
                >
                  <FiArrowLeft className="w-5 h-5" />
                  <span>Back to Products</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemDetails;

// Keep the existing loader function
export const itemsInfos = async ({ params }) => {
  const id = params.Items_ID;
  try {
    const response = await fetch(`https://backend-production-024f.up.railway.app/weddingItems/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch item details');
    }
    const datas = await response.json();
    return datas.data;
  } catch (err) {
    console.error(err);
    return { error: "Failed to load item details." };
  }
};