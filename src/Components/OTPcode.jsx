import  { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

const OTPcode = ({setOtp,setResetpass}) => {
  const [otp, setOtps] = useState(['', '', '', '', '']);
  const inputRefs = useRef([]);

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
    if (otpValue.length === 5) {

     try{
        const response = await fetch(`https://backend-production-d6a2.up.railway.app/OTP`,{
           method:'post',
           headers:{
               'Content-Type':'application/json'
           },
           body:JSON.stringify({otp:otp})
        })
       const data = await response.json();
    
    
       if(data.message === "NOT MATCHED"){
        toast.error(data.message)
       }else{

       localStorage.setItem("OTP",data.OTP);
        toast.success(data.message);
       setOtp(false);
       setResetpass(true);
       }

         }catch(error){
           console.log(error);
         }
    }

 

  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn z-30">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl animate-slideIn overflow-hidden">
        <div className="p-8 relative">
          {/* Header */}
    

          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Enter Your Code
              </h1>
              <p className="mt-2 text-gray-500">
                Please enter the 5-digit code sent to your Email
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
              Verify Code
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPcode;