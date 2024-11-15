import { useState } from 'react';
import { MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import toast from 'react-hot-toast';

const ResetPassword = ({   setResetpass }) => {
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false
  });
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setPasswords(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const otp = JSON.parse(localStorage.getItem("OTP"))

    if (passwords.password !== passwords.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (passwords.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try{
   const resposnse = await fetch(`http://localhost:8000//resetPassword`,{
    method:"put",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({password: passwords.password, otp:otp})
   })

   if(!resposnse.ok) return toast.error("Cannot Reset Password");
   toast.success("SUCCESS RESET");
   localStorage.clear();
   setResetpass(false);
    }catch(error){
        console.log(error)
    }
 
    
  };


  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn z-30">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl animate-slideIn">
        <div className="p-6">
          {/* Header */}
          <div className="relative pb-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Reset Password
              </h1>
              <p className="text-sm text-gray-500">
                Please enter your new password below
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <MdLock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPasswords.password ? "text" : "password"}
                  value={passwords.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                           focus:border-blue-500 transition-all"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('password')}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.password ? (
                    <MdVisibilityOff size={20} />
                  ) : (
                    <MdVisibility size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <MdLock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPasswords.confirmPassword ? "text" : "password"}
                  value={passwords.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                           focus:border-blue-500 transition-all"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.confirmPassword ? (
                    <MdVisibilityOff size={20} />
                  ) : (
                    <MdVisibility size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 
                       text-white rounded-lg font-semibold shadow-lg 
                       shadow-blue-500/20 hover:shadow-xl hover:scale-[1.02] 
                       transition-all duration-200"
            >
              Reset Password
            </button>

            {/* Cancel Button */}
            <button
              type="button"
              onClick={()=>  setResetpass(false)}
              className="w-full text-sm text-gray-500 hover:text-gray-700 
                       transition-colors"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;