import { motion } from 'framer-motion';
import { BsArrowRight, BsInstagram, BsPinterest, BsFacebook } from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';
import MostPicked from '../hooks/MostPicked.js';

const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0" style={{ 
      backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.15) 1px, transparent 1px), 
                       linear-gradient(to bottom, rgba(0, 0, 0, 0.15) 1px, transparent 1px)`,
      backgroundSize: '50px 50px',
    }}>
      <motion.div 
        className="absolute inset-0"
        animate={{
          x: [0, -50],
          y: [0, -50]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  </div>
);

// Large, prominent particles
const Particle = ({ size, initialPosition }) => (
  <motion.div
    className={`absolute ${size} rounded-full bg-gradient-to-r from-black/30 to-black/10`}
    style={{
      ...initialPosition,
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)"
    }}
    animate={{
      y: [initialPosition.top, initialPosition.top - 200],
      opacity: [0, 1, 0],
      scale: [0.5, 1.5, 0.5]
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

const ParticlesEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    {Array.from({ length: 25 }).map((_, i) => (
      <Particle
        key={i}
        size={`w-${Math.floor(Math.random() * 6 + 4)} h-${Math.floor(Math.random() * 6 + 4)}`}
        initialPosition={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100 + 100}%`
        }}
      />
    ))}
  </div>
);

// Bold animated lines
const FloatingLines = () => (
  <div className="absolute inset-0 overflow-hidden">
    {Array.from({ length: 12 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-1 bg-gradient-to-r from-transparent via-black/30 to-transparent"
        style={{
          width: `${Math.random() * 40 + 30}%`,
          left: `${Math.random() * 60}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          opacity: [0, 0.9, 0],
          scale: [0.8, 1.2, 0.8],
          x: [-100, 100, -100]
        }}
        transition={{
          duration: Math.random() * 7 + 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 2
        }}
      />
    ))}
  </div>
);

// Larger floating elements with stronger effects
const FloatingElement = ({ delay, duration, x, y, size = "w-32 h-32" }) => (
  <motion.div
    className={`absolute ${size} rounded-full bg-gradient-to-r from-white to-gray-200 border-2 border-black/10`}
    animate={{
      y: [y, y + 60, y],
      x: [x, x + 50, x],
      scale: [1, 1.2, 1],
      rotate: [0, 180, 0],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
    style={{
      backdropFilter: "blur(12px)",
      boxShadow: "0 16px 48px rgba(0, 0, 0, 0.2)"
    }}
  />
);

// Enhanced background pattern
const BackgroundPattern = () => (
  <div className="absolute inset-0 overflow-hidden">
    {Array.from({ length: 15 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-gradient-to-r from-white to-gray-200"
        style={{
          width: Math.random() * 300 + 150,
          height: Math.random() * 300 + 150,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          border: "2px solid rgba(0, 0, 0, 0.15)",
          backdropFilter: "blur(8px)"
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: Math.random() * 5 + 5,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
);
const HomePage = () => {

    const navigate = useNavigate();
    const { mostPicked } = MostPicked();

  return (
    <div className="min-h-screen bg-white text-gray-800">

    <div className="min-h-screen bg-white text-gray-800">

{/* Hero Section */}
<section className="relative h-screen overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white">
      <GridBackground />
      <ParticlesEffect />
      <FloatingLines />
      <BackgroundPattern />
      
      <FloatingElement delay={0} duration={8} x={100} y={100} size="w-48 h-48" />
      <FloatingElement delay={1} duration={9} x={400} y={200} size="w-56 h-56" />
      <FloatingElement delay={2} duration={10} x={200} y={400} size="w-64 h-64" />
      <FloatingElement delay={3} duration={7} x={600} y={300} size="w-40 h-40" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-white/30 backdrop-blur-[2px]" />
      </motion.div>
      
      <div className="relative h-full flex items-center justify-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center z-10"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              delay: 0.3,
              type: "spring",
              stiffness: 100
            }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-800">
              Cristobal Collections
            </h2>
            <p className="text-2xl md:text-3xl mb-8 text-gray-800">
              Best Gown rental Located at Santa Maria
            </p>
          </motion.div>
          
          <motion.button
            className="px-10 py-4 bg-black hover:bg-gray-900 text-white rounded-full transition-colors flex items-center mx-auto space-x-3 shadow-xl"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={()=> navigate('/Items')}
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
            src={`https://backend-production-024f.up.railway.app/uploads/${gown.picture}`}
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


      {/* Appointment Section */}
      <section className="py-24 bg-gradient-to-t from-purple-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h3 className="text-4xl font-bold">Fitting Appointment</h3>
            <p className="text-lg text-gray-600">
             This is not required but this is for the assurance of the size of yours
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-black hover:bg-gray-900 text-white rounded-full transition-colors inline-flex items-center space-x-2"
            >
              <span>Schedule Appointment</span>
              <BsArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

     
    </div>
  );
};

export default HomePage;