import { useState } from 'react';
import { MdClose, MdArrowForward, MdEmail } from 'react-icons/md';
import toast from 'react-hot-toast';

const ForgotPassword = ({ setOpenModal,setOtp }) => {
  const [email, setEmail] = useState('');
  const [disable, setDisable] = useState(false);
  
  const handleSubmit = async(e) => {
    e.preventDefault();
      setDisable(true);
      
    try{
 const response  = await fetch(`https://backend-production-024f.up.railway.app/ForgotPassword`,{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({email})
 })

 const data = await response.json();

  if(data.message === "EMAIL NOT EXIST") {
    toast.error("EMAIL NOT EXIST");
    setDisable(false);
    setEmail('');
  }else{
    toast.success("Check Your Email Now");
    setDisable(false);
    setEmail('');
    setOpenModal(false)
    setOtp(true)
  }

    }catch(error){
        console.log(error);
    }
    
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn z-30">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl animate-slideIn ">
        <div className="p-6">
          {/* Header */}
          <div className="relative pb-6">
            <button 
              onClick={()=> setOpenModal(false)}
              className="absolute right-0 top-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <MdClose size={20} />
            </button>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Forgot Password?</h1>
              <p className="text-sm text-gray-500">
                No worries! Enter your email and we send you OTP code.
              </p>
            </div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <MdEmail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="
              w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                       rounded-xl font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl
                       hover:scale-[1.02] transition-all duration-200 disabled:opacity-50
                       disabled:cursor-not-allowed disabled:hover:scale-100 flex justify-center items-center gap-4
              "
            >
             {disable? "wait....":"Send"}
              <MdArrowForward size={16} />
            </button>

            <button 
              type="button"
              disabled={disable}
              onClick={() => setOpenModal(false)}
              className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Back to login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default ForgotPassword;