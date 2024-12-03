import { useNavigate } from 'react-router-dom';
import { FaRuler, FaWeight, FaRulerVertical, FaUserAlt } from 'react-icons/fa';
import { GiBodyHeight } from 'react-icons/gi';
import SizeUser from "../hooks/Sizeuser.js";
import { FaRulerCombined } from "react-icons/fa";

const SizingForm = () => {
  const navigate = useNavigate();
  const { handleChange, measurements, handleSubmit, handleSubmitLater } = SizeUser(navigate);

  const inputFields = [
    { name: "bust", label: "Bust Size", icon: <FaRuler />, unit: "cm" },
    { name: "waist", label: "Waist Size", icon: <FaRulerVertical />, unit: "cm" },
    { name: "hips", label: "Hips Size", icon: <FaUserAlt />, unit: "cm" },
    { name: "height", label: "Height", icon: <GiBodyHeight />, unit: "cm" },
    { name: "weight", label: "Weight", icon: <FaWeight />, unit: "kg" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Cristobal Collections
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {inputFields.map((field) => (
            <div key={field.name} className="relative">
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  {field.icon}
                </div>
                <input
                  type="number"
                  name={field.name}
                  id={field.name}
                  required
                  value={measurements[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">{field.unit}</span>
                </div>
              </div>
            </div>
          ))}


   
<div className='mt-10'>
              <a href="https://ibb.co/1mJvLSP" target="_blank" className='flex gap-2 items-center'><span className='underline'>Size Guide</span>  <FaRulerCombined /> </a>
 </div>
            

<div className='flex gap-3'>
<button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
          >
            Get My Size
          </button>

          <button
            type="button" // Change type to "button" to prevent form submission
            onClick={handleSubmitLater} // Attach handleSubmitLater to onClick
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
          >
            Maybe Later
          </button>
</div>
         
        </form>
      </div>
    </div>
  );
};

export default SizingForm;
