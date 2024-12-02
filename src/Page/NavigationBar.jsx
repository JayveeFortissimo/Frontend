import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Sidebars } from '../Store/Side.js';
import { BsCart3 } from "react-icons/bs";
import { 
  VscAccount,
  VscSearch,
  VscChevronDown,
  VscThreeBars,
  VscChromeClose
} from "react-icons/vsc";
import io from 'socket.io-client';

const NavigationBar = () => {
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categorys, setCategorys] = useState([]);
  
  const mergingig = [{category: 'ALL'}, ...categorys];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useRouteLoaderData("root");

  useEffect(() => {
    const socket = io('https://backend-production-d6a2.up.railway.app');
    const array = [];

    fetch(`https://backend-production-d6a2.up.railway.app/allCategorys`)
      .then(response => response.json())
      .then(data => {
        data.data.forEach(element => {
          if (element.category) {
            array.push({ category: element.category });
          }
        });
        setCategorys(array);
      });

    socket.on("newCategory", (newCategory) => {
      setCategorys(prevCategories => [...prevCategories, newCategory]);
    });

    socket.on("deleteCategory", (deletedCategory) => {
      setCategorys(prevCategories => 
        prevCategories.filter(cat => cat.category !== deletedCategory.category)
      );
    });

    return () => {
      socket.off("newCategory");
      socket.off("deleteCategory");
    };
  }, []);

  const handleCategoryClick = (category) => {
    navigate("Items");
    dispatch(Sidebars.setCategory(category));
    setIsCollectionOpen(false);
    setIsMobileMenuOpen(false);
  };


  const [openCollect, setOpenCollect] = useState(false);

  return (
    <header className="sticky w-full top-5 z-40">
      <div className="bg-white/70 backdrop-blur-md shadow-lg mx-4 my-4 rounded-2xl">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-1 lg:flex-none">
              <span className="xs:2xl md:text-lg font-bold bg-gradient-to-r from-violet-600 via-violet-500 to-violet-400 bg-clip-text text-transparent">
                Cristobal Collection
              </span>
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex flex-1 justify-center">
              <div className="flex space-x-1 bg-gray-100/50 rounded-xl p-1">
                <NavLink 
                  to="/" 
                  end
                  className={({isActive}) => 
                    `${isActive ? 'bg-white text-violet-600 shadow-sm' : 'text-gray-700'} px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium hover:text-violet-700`
                  }
                >
                  HOME
                </NavLink>

                {/* Collection Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsCollectionOpen(!isCollectionOpen)}
                    className="flex items-center space-x-1 px-4 py-2 rounded-lg text-gray-700 hover:text-violet-600 transition-all duration-200 text-sm font-medium"
                  >
                    <span>COLLECTION</span>
                    <VscChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCollectionOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isCollectionOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 rounded-xl shadow-lg bg-white/80 backdrop-blur-sm ring-1 ring-black/5">
                      <div className="py-1" role="menu">
                        {mergingig.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => handleCategoryClick(item.category)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-all duration-200"
                          >
                            {item.category}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* How It Works Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsHowItWorksOpen(!isHowItWorksOpen)}
                    className="flex items-center space-x-1 px-4 py-2 rounded-lg text-gray-700 hover:text-violet-600 transition-all duration-200 text-sm font-medium"
                  >
                    <span>HOW IT WORKS</span>
                    <VscChevronDown className={`w-4 h-4 transition-transform duration-200 ${isHowItWorksOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isHowItWorksOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 rounded-xl shadow-lg bg-white/80 backdrop-blur-sm ring-1 ring-black/5">
                      <NavLink
                        to="Faqs"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-all duration-200"
                        onClick={() => setIsHowItWorksOpen(false)}
                      >
                        FAQs
                      </NavLink>
                    </div>
                  )}
                </div>

                <NavLink
                  to="Inquire"
                  className={({isActive}) =>
                    `${isActive ? 'bg-white text-violet-600 shadow-sm' : 'text-gray-700'} px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium hover:text-violet-600`
                  }
                >
                  CONTACT
                </NavLink>

                <NavLink
                  to="Review"
                  className={({isActive}) =>
                    `${isActive ? 'bg-white text-violet-600 shadow-sm' : 'text-gray-700'} px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium hover:text-violet-600`
                  }
                >
                  REVIEWS
                </NavLink>
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex-1 lg:flex-none">
              <div className="hidden md:flex items-center justify-end space-x-2">
                <NavLink 
                  to={token ? "profile" : "Login"}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <VscAccount className="w-5 h-5 text-gray-700 hover:text-violet-600" />
                </NavLink>
                <button 
                  onClick={() => navigate('search')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <VscSearch className="w-5 h-5 text-gray-700 hover:text-violet-600" />
                </button>
                {token && (
                  <button 
                    onClick={() => navigate('cart')}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <BsCart3 className="w-5 h-5 text-gray-700 hover:text-violet-600" />
                  </button>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded hover:bg-gray-100 transition-colors duration-200"
                >
                  {isMobileMenuOpen ? (
                    <VscChromeClose className="w-6 h-6 text-gray-700 ml-28" />
                  ) : (
                    <VscThreeBars className="w-6 h-6 text-gray-700 ml-28" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
 
        {/* Mobile menu  openCollect, setOpenCollect*/}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-4 py-3 space-y-1">
              <NavLink
                to="/"
                end
                className={({isActive}) =>
                  `${isActive ? 'bg-amber-50 text-violet-600' : 'text-gray-700'} block px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-50 hover:text-violet-600 transition-all duration-200`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                HOME
              </NavLink>
              
 
               <div>

               <button onClick={()=> setOpenCollect(pro => !pro)} className='mt-3 block w-full text-left px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-amber-50 hover:text-violet-600 transition-all duration-200'>COLLECTIONS</button>
            
              {mergingig.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryClick(item.category)}
                  className={`${openCollect? "block":"hidden"}  block w-full text-left px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-amber-50 hover:text-violet-600 transition-all duration-200`}
                >
                  {item.category}
                </button>
              ))}

               </div>

              <NavLink
                to="Faqs"
                className={({isActive}) =>
                  `${isActive ? 'bg-amber-50 text-violet-600' : 'text-gray-700'} block px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-50 hover:text-violet-600 transition-all duration-200`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                HOW IT WORKS
              </NavLink>

              <NavLink
                to="Review"
                className={({isActive}) =>
                  `${isActive ? 'bg-amber-50 text-violet-600' : 'text-gray-700'} block px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-50 hover:text-violet-600 transition-all duration-200`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                REVIEWS
              </NavLink>

              <NavLink
                to="Inquire"
                className={({isActive}) =>
                  `${isActive ? 'bg-amber-50 text-violet-600' : 'text-gray-700'} block px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-50 hover:text-violet-600 transition-all duration-200`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CONTACT
              </NavLink>


              <NavLink
                to="profile"
                className={({isActive}) =>
                  `${isActive ? 'bg-amber-50 text-violet-600' : 'text-gray-700'} block px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-50 hover:text-violet-600 transition-all duration-200`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                PROFILE
              </NavLink>


              <NavLink
                to="search"
                className={({isActive}) =>
                  `${isActive ? 'bg-amber-50 text-violet-600' : 'text-gray-700'} block px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-50 hover:text-violet-600 transition-all duration-200`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                SEARCH
              </NavLink>

              {
                token &&   <NavLink
                to="cart"
                className={({isActive}) =>
                  `${isActive ? 'bg-amber-50 text-violet-600' : 'text-gray-700'} block px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-50 hover:text-violet-600 transition-all duration-200`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CART
              </NavLink>
              }


            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavigationBar;