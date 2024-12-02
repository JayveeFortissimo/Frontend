import { useState } from "react";
import {  Form, useNavigation, useSearchParams, redirect } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";

const ReferalRegister = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
  
    const [searchParams] = useSearchParams();
    const referralCode = searchParams.get('ref'); 


    const [contact, setContact] = useState("");

    const handleContactChange = (e) => {
      let value = e.target.value;
  
      if (value.startsWith("0")) {
        value = value.slice(1);
      }

      if (value.length > 11) {
        value = value.slice(0, 11);
      }
  
      setContact(value);
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-white p-4">
      {/* Background animation circles (hidden on small screens) */}
      <div className="absolute inset-0 overflow-hidden hidden md:flex">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-black rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-gray-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      {/* Register Container */}
      <div className="relative w-full max-w-md p-8 backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl border border-white/20">
        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-black">
            Create Account
          </h1>
          <p className="text-sm text-gray-600">
            Please fill in your information to register
          </p>
        </div>

        {/* Form */}
        <Form method="post" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                className="block w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-400 backdrop-blur-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-20 transition-all duration-200"
                placeholder="Enter your name"
              />
            </div>

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
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="contact" className="block text-sm font-medium text-gray-600">
              Contact Number
            </label>
            <input
              id="contact"
              type="number"
              name="contact"
              onChange={handleContactChange}
              value={contact}
              required
              className="block w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-400 backdrop-blur-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-20 transition-all duration-200"
              placeholder="Enter your contact number"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-600">
              Address
            </label>
            <input
              id="address"
              type="text"
              name="address"
              required
              className="block w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-400 backdrop-blur-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-20 transition-all duration-200"
              placeholder="Enter your address"
            />
          </div>

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
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {showPassword ? (
                  <MdVisibilityOff className="h-5 w-5" />
                ) : (
                  <MdVisibility className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                required
                name="confirm"
                className="block w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-black placeholder-gray-400 backdrop-blur-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-20 transition-all duration-200 pr-12"
                placeholder="Confirm your password"
              />
            </div>
          </div>


          {!referralCode ? (
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Referral Code (Optional)"
                                name="referral"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    ) : (
                        <input type="hidden" name="referral" value={referralCode} />
            )}


          <button
            type="submit"
            disabled={isSubmitting}
            className="relative w-full rounded-2xl bg-gradient-to-r from-gray-600 to-gray-800 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:from-gray-700 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 group"
          >
            {isSubmitting ? (
              <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin mx-auto" />
            ) : (
              <span className="group-hover:scale-105 transition-transform duration-200 inline-block">
                Create Account
              </span>
            )}
          </button>

        </Form>
      </div>
    </section>
    );
};

export default ReferalRegister;

export const registas = async ({ request, params }) => {
    const data = await request.formData();
    const confirmation = data.get("confirm");
    const Alldatas = {
        name: data.get("name"),
        email: data.get("email"),
        address: data.get("address"),
        contact: data.get("contact"),
        password: data.get("password"),
        referralCodeUsed: data.get("referral"),
    };

    if(Alldatas.password !== confirmation){
      toast.error("Password and Confirm are not Matched");
      return null;
    }else if (Alldatas.password.length < 6 || !/^[a-zA-Z0-9]+$/.test(Alldatas.password)) {
      toast.error("Password must be at least 6 characters long and contain only alphanumeric characters.");
      return null;
    }else{

      try {
        const response = await fetch(`https://backend-production-d6a2.up.railway.app/register`, {
            method: "POST",
            body: JSON.stringify(Alldatas),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.log("Cannot Submit:", responseData.message || "Unknown error");
            toast.error("Registration failed: " + (responseData.message || "Unknown error"));
            return null;
        }

        if (!responseData || typeof responseData.id === 'undefined') {
            throw new Error("Invalid response data: No ID returned");
        }

        if(responseData.message === "Account already exists") return toast.error("ACCOUNT ALREADY EXIST");
  

        localStorage.setItem("ID", JSON.stringify(responseData.id));
        localStorage.setItem("SID",JSON.stringify("SIZE FORMAT"));
        toast.success("Registered Successfully");
        return redirect('/sizing_Form');
    } catch (error) {
        console.error("Error during registration:", error);
        toast.error("An error occurred while registering. Please try again.");
        return null;
    }


    }

    
};