
import React, { useState, useEffect } from 'react';
import { TrendingUp, Lock, X, Send, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';

const Income: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [incomeValue, setIncomeValue] = useState(0);

  // Constants for Income Dashboard
  const TARGET_INCOME = 182423;
  // Using the profile image from the metadata/Hero section
  const PROFILE_IMAGE = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgEmX4QstuIhvQf7W7aXw_cPjnx-F8bRbygS7Tt4YveFoWjsD74OAc86wB1nLQkSnQI2TFfH12THe2XtTqvIfpFhHnaWfToc36d7fUaW7XC1VFyDxAc7u3k9xx0uie8_hRYI6fGInEOcIjwAhxtCPOuRhgZN8iinlIHo2xTy7R3QLzTs7OdxLA1R0z4HO4/s1152/1763428929734.jpg";

  // Handle Modal Open/Close & Animations
  useEffect(() => {
    if (isModalOpen) {
      setIsUnlocked(true); // Mark as unlocked
      // Disable body scroll when modal is open
      document.body.style.overflow = 'hidden';

      let start = 0;
      const duration = 2500; // 2.5 seconds
      const startTime = performance.now();

      const animateCount = (currentTime: number) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          
          // Ease out exponential
          const easeOut = 1 - Math.pow(2, -10 * progress);
          
          const currentVal = Math.floor(easeOut * TARGET_INCOME);
          setIncomeValue(currentVal);

          if (progress < 1) {
              requestAnimationFrame(animateCount);
          }
      };

      requestAnimationFrame(animateCount);
    } else {
      document.body.style.overflow = 'unset';
      setIncomeValue(0);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      <section id="income" className="py-24 relative overflow-hidden bg-black/50">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Financial Milestones</h2>
              <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                  Beyond coding, I actively participate in financial markets.
              </p>
          </div>

          <div className="flex justify-center">
              {/* Trigger Card */}
              <div 
                  onClick={() => setIsModalOpen(true)}
                  className="relative cursor-pointer group flex flex-col items-center gap-6 px-10 py-10 rounded-[2.5rem] border border-white/5 bg-[#1c1c1e] hover:border-white/20 hover:bg-[#242426] hover:scale-105 transition-all duration-500 w-full md:w-auto min-w-[300px] shadow-2xl"
              >
                  {!isUnlocked ? (
                    <>
                        <div className="p-5 rounded-2xl bg-white/5 text-gray-400 group-hover:text-white group-hover:bg-white/10 transition-colors duration-300">
                            <Lock size={32} />
                        </div>
                        
                        <div className="flex flex-col items-center">
                            <span className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500 mb-2">
                                Trading Portfolio
                            </span>
                            <span className="text-2xl font-medium text-white blur-sm group-hover:blur-0 transition-all duration-300">
                                Tap to Reveal
                            </span>
                        </div>
                    </>
                  ) : (
                    <>
                        <div className="p-5 rounded-2xl bg-green-500/10 text-green-500 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                            <TrendingUp size={32} />
                        </div>
                        
                        <div className="flex flex-col items-center">
                            <span className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500 mb-2">
                                Total Income
                            </span>
                            <span className="text-3xl font-bold text-white tracking-tight animate-fade-in-up">
                                ${TARGET_INCOME.toLocaleString()}
                            </span>
                        </div>
                    </>
                  )}

                  <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-white/10 group-hover:ring-white/20 transition-all"></div>
              </div>
          </div>

        </div>
      </section>

      {/* Full Screen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
          {/* Backdrop with Blur */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-2xl transition-opacity duration-500 animate-in fade-in"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-[#1c1c1e] rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden animate-pop-in flex flex-col items-center text-center p-8 md:p-12">
             
             {/* Close Button */}
             <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors z-20"
             >
                <X size={24} />
             </button>

             {/* Background Effects */}
             <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-green-900/20 to-transparent pointer-events-none"></div>

             {/* Profile Image (The Throne) */}
             <div className="relative mb-6 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500 to-amber-700 rounded-full blur-md opacity-50 animate-pulse"></div>
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-[3px] bg-gradient-to-br from-yellow-400 via-yellow-600 to-yellow-800 shadow-xl relative z-10">
                    <img 
                        src={PROFILE_IMAGE} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover border-4 border-[#1c1c1e]"
                    />
                </div>
                {/* Verification Badge */}
                <div className="absolute bottom-0 right-0 md:bottom-1 md:right-1 bg-blue-500 text-white p-1.5 rounded-full border-4 border-[#1c1c1e] z-20">
                    <ShieldCheck size={16} fill="currentColor" className="text-white" />
                </div>
             </div>

             {/* Name & Title */}
             <h3 className="text-2xl font-bold text-white mb-1">{PORTFOLIO_DATA.name}</h3>
             <p className="text-sm text-gray-400 font-medium tracking-wide uppercase mb-8">Professional Trader</p>

             {/* The Money */}
             <div className="mb-8 relative">
                <span className="text-xs font-bold text-green-500 tracking-widest uppercase mb-1 block">Total Income</span>
                <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-green-100 to-green-200 font-mono tracking-tighter">
                    ${incomeValue.toLocaleString()}
                </div>
                {/* Floating Money Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-4 -right-8 text-2xl animate-bounce delay-100">💸</div>
                    <div className="absolute top-1/2 -left-8 text-2xl animate-bounce delay-700">💰</div>
                </div>
             </div>

             {/* Description */}
             <div className="bg-white/5 rounded-2xl p-5 mb-8 border border-white/5">
                <p className="text-gray-300 text-sm leading-relaxed">
                   "Mastering the psychology of the market. I combine technical analysis with disciplined risk management to generate consistent returns in the global financial markets."
                </p>
             </div>

             {/* Telegram Button */}
             <a 
                href="https://t.me/srisanthtradex_bot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl bg-[#229ED9] hover:bg-[#1e8ubc] text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
             >
                <Send size={20} /> Join My Telegram
             </a>

          </div>
        </div>
      )}
    </>
  );
};

export default Income;
