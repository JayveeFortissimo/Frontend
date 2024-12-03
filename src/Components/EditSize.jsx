import React from 'react';
import { VscChromeClose } from "react-icons/vsc";
import Sizeuser from '../hooks/EditSize.js';
import { useNavigate } from 'react-router-dom';
import { FaRulerCombined } from "react-icons/fa";

const EditSize = ({ dispatch, Sidebars }) => {
  const navigate = useNavigate();
  const { measurements2, handleEdit, setMeasurements2 } = Sizeuser(navigate);

  const InputField = ({ label, value, onChange, unit }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          value={value || ''} 
          onChange={(e) => {
            
            const numericValue = e.target.value.replace(/[^0-9]/g, '');
            onChange(e);
          }}
          onFocus={(e) => e.target.select()} 
          required
          className="w-full p-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          {unit}
        </span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
      
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
               
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Edit Your Measurements
              </h2>
            </div>
            <button
              onClick={() => dispatch(Sidebars.EditSize(false))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <VscChromeClose className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleEdit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Bust"
                value={measurements2.bust}
                onChange={(e) => setMeasurements2({...measurements2, bust: e.target.value})}
                unit="cm"
              />
              
              <InputField
                label="Waist"
                value={measurements2.waist}
                onChange={(e) => setMeasurements2({...measurements2, waist: e.target.value})}
                unit="cm"
              />
              
              <InputField
                label="Hips"
                value={measurements2.hips}
                onChange={(e) => setMeasurements2({...measurements2, hips: e.target.value})}
                unit="cm"
              />
              
              <InputField
                label="Height"
                value={measurements2.height}
                onChange={(e) => setMeasurements2({...measurements2, height: e.target.value})}
                unit="cm"
              />
              
              <InputField
                label="Weight"
                value={measurements2.weight}
                onChange={(e) => setMeasurements2({...measurements2, weight: e.target.value})}
                unit="kg"
              />

              
              <div className='mt-10'>
              <a href="https://ibb.co/1mJvLSP" target="_blank" className='flex gap-2 items-center'><span className='underline'>Size Guide</span>  <FaRulerCombined /> </a>
              </div>
            
            </div>

            <div className="pt-4 border-t">
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(Sidebars.EditSize(false))}
                  className="flex-1 p-3 border border-gray-200 hover:bg-gray-50 rounded-lg font-medium transition-colors"
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