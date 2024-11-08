import { useState, useEffect } from 'react';
import { 
  FiCopy, 
  FiCheck,
  FiX
} from 'react-icons/fi';
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaWhatsapp,
  FaTelegramPlane
} from 'react-icons/fa';

const ReferralCode = ({referralLink, setRefferal}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);



  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareButtons = [
    {
      icon: <FaFacebook size={20} />,
      label: "Facebook",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      icon: <FaTwitter size={20} />,
      label: "Twitter",
      color: "bg-sky-500 hover:bg-sky-600"
    },
    {
      icon: <FaLinkedin size={20} />,
      label: "LinkedIn",
      color: "bg-blue-700 hover:bg-blue-800"
    },
    {
      icon: <FaWhatsapp size={20} />,
      label: "WhatsApp",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: <FaTelegramPlane size={20} />,
      label: "Telegram",
      color: "bg-blue-400 hover:bg-blue-500"
    }
  ];

  return (
    <div className="font-sans">


        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-2xl shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setRefferal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
            >
              <FiX size={24} />
            </button>

            <div className="space-y-8 p-6">
              {/* Header Section */}
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  Share the love
                </h2>
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-xl p-6 mt-4 backdrop-blur-xl">
                    <span className="text-4xl font-bold text-white">5% Discount</span>
                    <p className="text-gray-300 mt-2">For 5 referrals</p>
                  </div>
                </div>
              </div>

              {/* Referral Code Section */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Your Referral Code</label>
                <div className="flex items-center gap-2 p-4 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-xl">
                  <span className="flex-1 font-mono text-[0.8rem] font-bold text-center tracking-wider text-indigo-400 ">
                    {referralLink}
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {copied ? (
                      <FiCheck className="w-5 h-5 text-green-400" />
                    ) : (
                      <FiCopy className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Share Options */}
              <div className="space-y-4">
                <p className="text-sm font-medium text-center text-gray-400">Share via</p>
                <div className="grid grid-cols-5 gap-2">
                  {shareButtons.map((button) => (
                    <button
                      key={button.label}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl ${button.color} transition-all duration-300 hover:scale-105`}
                    >
                      {button.icon}
                      <span className="text-xs">{button.label}</span>
                    </button>
                  ))}
                </div>
              </div>

             
            </div>
          </div>
        </div>

    </div>
  );
};

export default ReferralCode;