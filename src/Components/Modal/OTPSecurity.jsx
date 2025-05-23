import  { useState, useRef, useEffect } from 'react';
import { VscChromeClose } from "react-icons/vsc";
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const OTPSecurity = ({setConfirm, setOpenFitting, ConfirmationReserve}) => {

    const [otp, setOtps] = useState(['', '', '', '', '']);
    const inputRefs = useRef([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Focus first input on mount
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, []);
    
      const handleChange = (index, value) => {
        // Only allow numbers
        if (!/^\d*$/.test(value)) return;
    
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtps(newOtp);
    
        // Move to next input if value is entered
        if (value !== '' && index < 4) {
          inputRefs.current[index + 1].focus();
        }
      };
    
      const handleKeyDown = (index, e) => {
        // Move to previous input on backspace if current input is empty
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
          inputRefs.current[index - 1].focus();
        }
      };
    
      const handleSubmit = async() => {
        const otpValue = otp.join('');

        setLoading(true);

        if (otpValue.length === 5) {
          
            try{
                const response = await fetch(`https://backend-production-62ff.up.railway.app/OTP`,{
                   method:'post',
                   headers:{
                       'Content-Type':'application/json'
                   },
                   body:JSON.stringify({otp:otp})
                })
               const data = await response.json();
            
               if(data.message === "NOT MATCHED"){

                setTimeout(() =>{
                    setLoading(false);
                    toast.error(data.message);
                },2000);
               }else{
            

                setTimeout(()=>{
                    setLoading(false);
                    localStorage.setItem("OTP",data.OTP);
                    toast.success(data.message);
                    setOpenFitting(true);
                     setConfirm(false);
                },2000);
               
               }
        
                 }catch(error){
                   console.log(error);
                 }

        }
    
      };

      
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 backdrop-blur-sm animate-fadeIn z-30">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl animate-slideIn overflow-hidden">
      <div className="p-5 relative">
        {/* Header */}


            <div className='w-[100%] flex justify-end'>
            <VscChromeClose
            onClick={() => setConfirm(false)}
            size={20} 
            className='cursor-pointer'
            />
            </div>

        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Enter  Code
            </h1>
            <p className="mt-2 text-gray-500">
              Please enter the 5-digit code sent to your email
            </p>
          </div>

          {/* OTP Input Group */}
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                className="w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 border-gray-200 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none
                         transition-all duration-200 bg-gray-50"
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={otp.some(digit => digit === '')}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                     rounded-xl font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl
                     hover:scale-[1.02] transition-all duration-200 disabled:opacity-50
                     disabled:cursor-not-allowed disabled:hover:scale-100"
          >
         {loading? (<AiOutlineLoading3Quarters className="h-5 w-5 animate-spin mx-auto" />):(<p>Verify Code</p>)}   
          </button>

          {/* Resend Option */}
          <button 
          onClick={(e)=> ConfirmationReserve(e)}
          className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors">
            Didn't receive code? Resend
          </button>
        </div>
      </div>
    </div>
  </div>

  )
}

export default OTPSecurity;