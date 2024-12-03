import React from 'react';
import { VscChromeClose } from "react-icons/vsc";
import Sizeuser from '../hooks/EditSize.js';
import { useNavigate } from 'react-router-dom';
import { FaRulerCombined } from "react-icons/fa";

const EditSize = ({ dispatch, Sidebars }) => {
  const navigate = useNavigate();
  const { measurements2, handleEdit, setMeasurements2 } = Sizeuser(navigate);

  const updateMeasurement = (field, value) => {
    setMeasurements2(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
      
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              Edit Your Measurements
            </h2>
            <button
              onClick={() => dispatch(Sidebars.EditSize(false))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <VscChromeClose className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleEdit} className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { 
                  label: 'Bust', 
                  name: 'bust', 
                  unit: 'cm',
                  placeholder: 'Enter bust measurement'
                },
                { 
                  label: 'Waist', 
                  name: 'waist', 
                  unit: 'cm',
                  placeholder: 'Enter waist measurement'
                },
                { 
                  label: 'Hips', 
                  name: 'hips', 
                  unit: 'cm',
                  placeholder: 'Enter hips measurement'
                },
                { 
                  label: 'Height', 
                  name: 'height', 
                  unit: 'cm',
                  placeholder: 'Enter height'
                },
                { 
                  label: 'Weight', 
                  name: 'weight', 
                  unit: 'kg',
                  placeholder: 'Enter weight'
                }
              ].map(({ label, name, unit, placeholder }) => (
                <div key={name} className="space-y-2">
                  <label 
                    htmlFor={name} 
                    className="block text-sm font-medium text-gray-700"
                  >
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      id={name}
                      type="number"
                      name={name}
                      value={measurements2[name] || ''}
                      onChange={(e) => updateMeasurement(name, e.target.value)}
                      placeholder={placeholder}
                      className="w-full p-3 pr-12 border border-gray-200 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      step="0.1"
                      min="0"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      {unit}
                    </span>
                  </div>
                </div>
              ))}

              <div className='mt-4'>
                <a 
                  href="https://ibb.co/1mJvLSP" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className='flex gap-2 items-center text-blue-600 hover:text-blue-800'
                >
                  <span className='underline'>Size Guide</span>  
                  <FaRulerCombined /> 
                </a>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 p-3 bg-blue-600 text-white rounded-lg 
                    hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(Sidebars.EditSize(false))}
                  className="flex-1 p-3 border border-gray-200 
                    hover:bg-gray-50 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSize;