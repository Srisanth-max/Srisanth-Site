
import React, { useEffect, useState } from 'react';
import { ArrowRight, Code2, Brain, Sparkles, BrainCircuit } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';

const Hero: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const PROFILE_IMAGE = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgEmX4QstuIhvQf7W7aXw_cPjnx-F8bRbygS7Tt4YveFoWjsD74OAc86wB1nLQkSnQI2TFfH12THe2XtTqvIfpFhHnaWfToc36d7fUaW7XC1VFyDxAc7u3k9xx0uie8_hRYI6fGInEOcIjwAhxtCPOuRhgZN8iinlIHo2xTy7R3QLzTs7OdxLA1R0z4HO4/s1152/1763428929734.jpg";

  const handleScrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Typewriter Effect Logic
  useEffect(() => {
    const text = PORTFOLIO_DATA.tagline;
    let index = 0;
    
    const startDelay = setTimeout(() => {
        const typeInterval = setInterval(() => {
            if (index <= text.length) {
                setDisplayedText(text.slice(0, index));
                index++;
            } else {
                clearInterval(typeInterval);
            }
        }, 50); 
        
        return () => clearInterval(typeInterval);
    }, 1500);

    return () => clearTimeout(startDelay);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden perspective-1000">
      
      {/* CSS Starfield Background */}
      <div className="absolute inset-0 bg-black z-0">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
         {[...Array(20)].map((_, i) => (
             <div 
                key={i}
                className="absolute bg-white rounded-full opacity-0 animate-pulse"
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 2 + 1}px`,
                    height: `${Math.random() * 2 + 1}px`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${Math.random() * 3 + 2}s`
                }}
             ></div>
         ))}
      </div>

      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-blue-900/20 rounded-full blur-[100px] animate-blob will-change-transform"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-purple-900/20 rounded-full blur-[100px] animate-blob animation-delay-2000 will-change-transform"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 mb-8 animate-fade-in-up opacity-0 hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              <span className="text-xs font-semibold text-gray-300 tracking-wide uppercase">Class 11 Student</span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              <span className="inline-block animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                Hello,
              </span>{' '}
              <span className="inline-block animate-fade-in-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                I'm
              </span>
              <br />
              <span className="inline-block animate-fade-in-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-shimmer bg-[length:200%_auto]">
                  {PORTFOLIO_DATA.name}
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <div className="min-h-[3.5rem] md:min-h-[4rem] mb-10 max-w-2xl mx-auto md:mx-0">
                <p className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                <span className="typing-cursor">{displayedText}</span>
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-center md:items-start gap-8 animate-fade-in-up opacity-0" style={{ animationDelay: '1.0s', animationFillMode: 'forwards' }}>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <a 
                    href="#about" 
                    onClick={handleScrollToAbout}
                    className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 w-full sm:w-auto overflow-hidden flex items-center justify-center gap-2 shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
                >
                    <span className="relative z-10 flex items-center gap-2">
                    About Me <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </a>
              </div>

            </div>
          </div>

          {/* Visual Area - 3D Profile with Separate Float & Flip */}
          <div className="flex-1 flex justify-center relative order-1 md:order-2 animate-pop-in opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
             {/* Glowing Effect */}
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 rounded-full blur-[60px] transform scale-90 animate-pulse"></div>
             
             {/* FLOAT WRAPPER - Handles Up/Down Motion Only */}
             <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 animate-float z-10">
                
                {/* FLIP WRAPPER - Handles 3D Rotation on Hover */}
                <div className="w-full h-full relative preserve-3d transition-transform duration-700 hover:[transform:rotateY(180deg)] cursor-pointer group perspective-1000">
                    
                    {/* FRONT FACE */}
                    <div className="absolute inset-0 preserve-3d backface-hidden">
                        {/* Orbiting Icons */}
                        <div className="absolute inset-[-50px] md:inset-[-60px] rounded-full animate-[spin_50s_linear_infinite] preserve-3d">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transform-style-3d">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#1c1c1e]/80 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.5)] animate-[spin_50s_linear_infinite_reverse]">
                                    <Code2 className="text-blue-400 w-6 h-6 md:w-8 md:h-8" />
                                </div>
                            </div>
                            <div className="absolute bottom-[15%] left-[5%] -translate-x-1/2 transform-style-3d">
                                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1c1c1e]/80 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.5)] animate-[spin_50s_linear_infinite_reverse]">
                                    <Brain className="text-purple-400 w-6 h-6 md:w-7 md:h-7" />
                                </div>
                            </div>
                            <div className="absolute bottom-[15%] right-[5%] translate-x-1/2 transform-style-3d">
                                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1c1c1e]/80 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.5)] animate-[spin_50s_linear_infinite_reverse]">
                                    <Sparkles className="text-yellow-400 w-6 h-6 md:w-7 md:h-7" />
                                </div>
                            </div>
                        </div>

                        {/* Spinning Ring */}
                        <div className="absolute inset-[-20px] rounded-full border border-white/5 animate-[spin_40s_linear_infinite_reverse]"></div>
                        
                        {/* Profile Image */}
                        <div className="absolute inset-0 rounded-full overflow-hidden border-[6px] border-white/10 glass shadow-2xl z-10">
                            <div className="absolute inset-0 bg-black/20"></div>
                            <img 
                                src={PROFILE_IMAGE} 
                                alt={PORTFOLIO_DATA.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-50 pointer-events-none"></div>
                        </div>
                    </div>

                    {/* BACK FACE (Revealed on Hover) */}
                    <div className="absolute inset-0 rounded-full overflow-hidden border-[6px] border-white/10 glass shadow-2xl z-10 [transform:rotateY(180deg)] backface-hidden bg-[#1c1c1e] flex items-center justify-center">
                        <div className="text-center p-6 flex flex-col items-center">
                            <div className="w-16 h-16 mb-3 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                                <BrainCircuit className="text-white w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">{PORTFOLIO_DATA.name}</h3>
                            <p className="text-blue-400 font-medium text-sm uppercase tracking-wide">Class 11 Student</p>
                            <p className="text-gray-500 text-xs mt-2">Trader & Developer</p>
                        </div>
                    </div>

                </div>
             </div>
          </div>

        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce md:flex hidden">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent"></div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
