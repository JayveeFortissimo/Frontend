import { useState } from "react";
import { NavLink, Form, useNavigation } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ForgotPassword from "./ForgotPassword";
import OTPcode from "./OTPcode";
import ResetPassword from "./ResetPassword";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openOTP,setOtp] = useState(false);
  const [resetPass, setResetpass] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
   <>

      {resetPass &&  <ResetPassword setResetpass={setResetpass}/>}
  
       {openOTP && <OTPcode setOtp={setOtp} setResetpass={setResetpass}/>}
    {openModal && <ForgotPassword setOpenModal={setOpenModal} setOtp={setOtp}/>}
    
   <section className="min-h-[40rem] flex items-center justify-center bg-white p-4">
      {/* Background animation circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-black rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-gray-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      {/* Login Container */}
      <div className="relative w-full max-w-md p-8 backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl border border-white/20">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-black bg-clip-text">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-600">
            Enter your credentials to continue
          </p>
        </div>

        {/* Form */}
        <Form method="post" className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="block w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-400 backdrop-blur-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-20 transition-all duration-200"
              placeholder="name@example.com"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="block w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-400 backdrop-blur-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-20 transition-all duration-200 pr-12"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors duration-200"
              >
                {showPassword ? (
                  <MdVisibilityOff className="h-5 w-5" />
                ) : (
                  <MdVisibility className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="relative w-full rounded-2xl bg-gradient-to-r from-gray-600 to-gray-800 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:from-gray-700 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 group"
          >
            {isSubmitting ? (
              <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin mx-auto" />
            ) : (
              <span className="group-hover:scale-105 transition-transform duration-200 inline-block">
                Sign in
              </span>
            )}
          </button>


      <div  className="text-sm text-gray-600 hover:text-black font-medium transition-colors duration-200 cursor-pointer">
        <p className="underline" onClick={()=> setOpenModal(true)}>Forgot Password?</p>
      </div>
          {/* Sign Up Link */}
          <div className="text-center">
            
            <NavLink
              to="/Register"
              className="text-sm text-gray-600 hover:text-black font-medium transition-colors duration-200"
            >
              Don't have an account? <span className="underline">Sign up</span>
            </NavLink>
          </div>
        </Form>
      </div>
    </section>
   
   
   </>
  );
};

export default Login;