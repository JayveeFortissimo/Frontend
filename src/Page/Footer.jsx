import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

      <div className="relative min-h-[15rem] px-6 md:px-10 py-8 flex flex-col md:flex-row justify-between gap-10 md:gap-4 items-center md:items-start">
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
            Cristobal Collection
          </h2>
          <p className="text-sm text-slate-400 max-w-[200px]">
            © {currentYear} Bagbaguin Santa Maria Bulacan Inc.
          </p>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
        </div>

        {/* Info Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
          <div className="flex flex-col gap-3">
            {[
              'HOW IT WORKS',
              'LOCATION',
              'INQUIRE',
              'LOGIN',
              'REGISTER'
            ].map((text, index) => (
              <button
                key={index}
                className="group relative text-sm text-slate-400 hover:text-white transition-colors"
              >
                <span>{text}</span>
                <span className="absolute inset-x-0 -bottom-1 h-px transform scale-x-0 group-hover:scale-x-100 transition-transform bg-gradient-to-r from-blue-400 to-cyan-300" />
              </button>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
          <div className="relative">
            <p className="text-slate-400 max-w-[250px] text-sm leading-relaxed">
              Cristobal Collection represents excellence in fashion and style, 
              bringing you curated pieces that define modern elegance.
            </p>
          </div>
          
          {/* Decorative Element */}
          <div className="mt-6 grid grid-cols-3 gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-1 w-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 opacity-70"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
    </footer>
  );
};

export default Footer;