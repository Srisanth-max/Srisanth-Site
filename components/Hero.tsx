
import React, { useEffect, useRef } from 'react';
import { ArrowRight, Code2, Brain, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleScrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Spider Web / Network Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    let particles: {x: number, y: number, dx: number, dy: number, r: number}[] = [];

    const initParticles = () => {
      particles = [];
      // Number of particles based on width
      const particleCount = window.innerWidth < 768 ? 40 : 70;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          dx: (Math.random() - 0.5) * 0.3, // Very slow drift
          dy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.5 + 1 // size
        });
      }
    };

    initParticles();

    const drawLine = (p1: any, p2: any) => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 120; // Max distance to form a web line

      if (dist < maxDist) {
        ctx.beginPath();
        // Opacity inversely proportional to distance
        const opacity = (1 - dist / maxDist) * 0.15;
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p, index) => {
        // Move particle
        p.x += p.dx;
        p.y += p.dy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fill();

        // Connect to other particles
        for (let j = index + 1; j < particles.length; j++) {
          drawLine(p, particles[j]);
        }
      });
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
        initParticles();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden perspective-1000">
      
      {/* Canvas for Spider Web Animation */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-blue-900/20 rounded-full blur-[100px] animate-blob will-change-transform"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-purple-900/20 rounded-full blur-[100px] animate-blob animation-delay-2000 will-change-transform"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            
            {/* Status Badge - Starts at 0.1s */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 mb-8 animate-fade-in-up opacity-0 hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              <span className="text-xs font-semibold text-gray-300 tracking-wide uppercase">Class 11 Student</span>
            </div>

            {/* Main Title - Starts at 0.4s (Delayed for effect) */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.1] animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              Hello, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-shimmer bg-[length:200%_auto]">
                {PORTFOLIO_DATA.name}
              </span>
            </h1>

            {/* Subtitle - Starts at 0.6s */}
            <p className="text-lg md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto md:mx-0 font-light leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              {PORTFOLIO_DATA.tagline}
            </p>

            {/* Action Buttons - Starts at 0.8s */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start animate-fade-in-up opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
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

          {/* Visual Area - 3D Circle Flip Popup */}
          <div className="flex-1 flex justify-center relative order-1 md:order-2 animate-pop-in opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
             {/* Glowing Effect behind image */}
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 rounded-full blur-[60px] transform scale-90 animate-pulse will-change-transform"></div>
             
             <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 animate-float preserve-3d will-change-transform">
                
                {/* Orbiting Icons Animation Container */}
                <div className="absolute inset-[-50px] md:inset-[-60px] rounded-full animate-[spin_50s_linear_infinite] preserve-3d will-change-transform">
                    
                    {/* Icon 1: React/Code */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transform-style-3d">
                       <div className="w-12 h-12 md:w-16 md:h-16 bg-[#1c1c1e]/80 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.5)] animate-[spin_50s_linear_infinite_reverse]">
                          <Code2 className="text-blue-400 w-6 h-6 md:w-8 md:h-8" />
                       </div>
                    </div>

                    {/* Icon 2: Brain/AI */}
                    <div className="absolute bottom-[15%] left-[5%] -translate-x-1/2 transform-style-3d">
                       <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1c1c1e]/80 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.5)] animate-[spin_50s_linear_infinite_reverse]">
                          <Brain className="text-purple-400 w-6 h-6 md:w-7 md:h-7" />
                       </div>
                    </div>

                    {/* Icon 3: Sparkles */}
                    <div className="absolute bottom-[15%] right-[5%] translate-x-1/2 transform-style-3d">
                       <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1c1c1e]/80 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.5)] animate-[spin_50s_linear_infinite_reverse]">
                          <Sparkles className="text-yellow-400 w-6 h-6 md:w-7 md:h-7" />
                       </div>
                    </div>
                </div>

                {/* Inner Spinning Ring */}
                <div className="absolute inset-[-20px] rounded-full border border-white/5 animate-[spin_40s_linear_infinite_reverse] will-change-transform"></div>
                
                {/* Profile Image Container with 3D Effect */}
                <div className="absolute inset-0 rounded-full overflow-hidden border-[6px] border-white/10 glass shadow-2xl z-10 group cursor-pointer transform transition-transform duration-700 hover:scale-105 hover:rotate-y-12 hover:shadow-blue-500/20 preserve-3d">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <img 
                        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgEmX4QstuIhvQf7W7aXw_cPjnx-F8bRbygS7Tt4YveFoWjsD74OAc86wB1nLQkSnQI2TFfH12THe2XtTqvIfpFhHnaWfToc36d7fUaW7XC1VFyDxAc7u3k9xx0uie8_hRYI6fGInEOcIjwAhxtCPOuRhgZN8iinlIHo2xTy7R3QLzTs7OdxLA1R0z4HO4/s1152/1763428929734.jpg" 
                        alt={PORTFOLIO_DATA.name}
                        className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Glossy reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-50 pointer-events-none"></div>
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
