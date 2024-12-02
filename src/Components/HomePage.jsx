import { motion } from 'framer-motion';
import { BsArrowRight, BsInstagram, BsPinterest, BsFacebook } from 'react-icons/bs';
import {useNavigate, useRouteLoaderData} from 'react-router-dom';
import MostPicked from '../hooks/MostPicked.js';


const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-gray-100 to-white opacity-80" />
);

const Particle = ({ size, initialPosition }) => (
  <div
    className={`absolute ${size} rounded-full bg-gradient-to-r from-black/30 to-black/10 opacity-0 animate-fade`}
    style={{
      ...initialPosition,
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)", // Lighter shadow
    }}
  />
);

const ParticlesEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    {Array.from({ length: 8 }).map((_, i) => (
      <Particle
        key={i}
        size={`w-${Math.floor(Math.random() * 4 + 4)} h-${Math.floor(Math.random() * 4 + 4)}`}
        initialPosition={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100 + 50}%`, // Keep particles lower for less effect
        }}
      />
    ))}
  </div>
);


const FloatingElement = ({ delay, duration, x, y, size = "w-32 h-32" }) => (
  <motion.div
    className={`absolute ${size} rounded-full bg-gradient-to-r from-white to-gray-200 border border-gray-300`}
    style={{ top: `${y}px`, left: `${x}px`, backdropFilter: "blur(8px)" }}
    animate={{
      y: [y, y + 30, y], // Reduced movement range
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    }}
  />
);

const HomePage = () => {
    const isLogin = useRouteLoaderData('root');
    
    const navigate = useNavigate();
    const { mostPicked } = MostPicked();

  return (
    <div className="min-h-screen bg-white text-gray-800">

    <div className="min-h-screen bg-white text-gray-800">

{/* Hero Section */}
<section className="relative h-[40rem] overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white">
      <GridBackground />

      <ParticlesEffect />

      {/* Reduce Floating Elements */}
      <FloatingElement delay={0} duration={8} x={100} y={100} size="w-32 h-32" />
      <FloatingElement delay={1} duration={9} x={400} y={200} size="w-40 h-40" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-b from-white/70 to-white/30 backdrop-blur-[2px]"
      />

      <div className="relative h-full flex items-center justify-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center z-10"
        >
          <h2 className="text-4xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-800">
            Cristobal Collections
          </h2>
          <p className="text-2xl md:text-3xl mb-8 text-gray-800">
            Best Gown Rental Located at Santa Maria
          </p>
          <motion.button
            className="px-10 py-4 bg-black hover:bg-gray-900 text-white rounded-full transition-colors flex items-center mx-auto space-x-3 shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)", // Reduced shadow
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/Items')}
          >
            <span className="text-lg">Explore Collection</span>
            <BsArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>

{/* Featured Gowns */}
{/* Featured Gowns */}
<section className="py-20 px-4 bg-gray-50">
  <h3 className="text-3xl font-bold text-center mb-12">MOST PICKED ITEMS</h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
    {Array.isArray(mostPicked) && mostPicked.length > 0 ? (
      mostPicked.map((gown, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="group relative overflow-hidden rounded-lg shadow-lg bg-white"
        >
          <img 
            src={`https://backend-production-d6a2.up.railway.app/uploads/${gown.picture}`}
            alt={gown.product_Name}
            className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h4 className="text-xl font-bold text-gray-800">{gown.product_Name}</h4>
            </div>
          </div>
        </motion.div>
      ))
    ) : (
      // Loading state or no items message
      <div className="col-span-3 text-center py-10">
        <p className="text-gray-500">Loading most picked items...</p>
      </div>
    )}
  </div>
</section>

{/* About Us */}
<section className="py-20 px-4 bg-white">
  <div className="max-w-4xl mx-auto text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <h3 className="text-3xl font-bold mb-6">About Us</h3>
      <p className="text-lg text-gray-600 leading-relaxed">
        Cristobal Collection represents the pinnacle of modern bridal fashion. 
        Our designs blend timeless elegance with futuristic elements, creating 
        pieces that are both innovative and classically beautiful. Each gown 
        is crafted with meticulous attention to detail, ensuring that every 
        bride feels extraordinary on her special day.
      </p>
      {/* Social Links */}
      <div className="flex justify-center space-x-6 pt-6">
        <BsInstagram className="w-6 h-6 hover:text-purple-600 cursor-pointer text-gray-600" />
        <BsPinterest className="w-6 h-6 hover:text-purple-600 cursor-pointer text-gray-600" />
        <BsFacebook className="w-6 h-6 hover:text-purple-600 cursor-pointer text-gray-600" />
      </div>
    </motion.div>
  </div>
</section>
</div>

     
    </div>
  );
};

export default HomePage;