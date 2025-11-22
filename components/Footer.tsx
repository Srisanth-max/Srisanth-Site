import React from 'react';
import { PORTFOLIO_DATA } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-500 py-12 border-t border-white/5 pb-32 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-1">{PORTFOLIO_DATA.name}</h3>
            <p className="text-xs text-gray-600">{PORTFOLIO_DATA.tagline}</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
             <p className="text-xs opacity-50">
                Designed with ❤️. © {new Date().getFullYear()}
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;