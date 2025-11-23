
import React, { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { X, ZoomIn } from 'lucide-react';

const Projects: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const projects = PORTFOLIO_DATA.projects;
  const total = projects.length;
  const anglePerItem = 360 / total;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="py-32 bg-black relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 shadow-lg animate-fade-in-up">
            <span className="text-blue-400 font-medium tracking-wider text-xs uppercase">Visual Portfolio</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            My Gallery
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-xl font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
             A collection of moments revolving around my journey.
          </p>
        </div>

        {/* 3D CSS Carousel - STABLE IMPLEMENTATION */}
        <div className={`perspective-2000 w-full h-[400px] md:h-[500px] flex items-center justify-center relative transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            
            {/* Carousel Container */}
            <div className="relative w-[200px] h-[280px] md:w-[260px] md:h-[360px] preserve-3d animate-spin-slow hover:[animation-play-state:paused]">
                
                {projects.map((item, index) => (
                    <div 
                        key={item.id}
                        className="absolute inset-0 rounded-2xl border border-white/10 bg-[#1c1c1e] shadow-[0_0_30px_rgba(0,0,0,0.8)] cursor-pointer group transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:scale-105"
                        style={{
                            transform: `rotateY(${index * anglePerItem}deg) translateZ(300px)`,
                            // Responsive radius (translateZ)
                            // On mobile we might want smaller, but CSS variable calc in JS is tricky, 
                            // so we stick to a safe 300px which works on most screens or use media query CSS class in global styles if needed.
                            // For strictly responsive Z, we'd use a wrapper scaling.
                        }}
                        onClick={() => setSelectedImage(item.imageUrl)}
                    >
                        <div className="w-full h-full overflow-hidden rounded-2xl relative">
                            {/* Image with Mask */}
                            <div 
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ 
                                    backgroundImage: `url(${item.imageUrl})`,
                                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
                                }}
                            />
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
                            
                            {/* Hover Content */}
                            <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 px-2">
                                <h3 className="text-white text-sm font-bold truncate drop-shadow-md">{item.title}</h3>
                                <div className="flex justify-center items-center gap-1 text-blue-400 text-xs mt-1 font-medium">
                                    <ZoomIn size={12} /> Click to Expand
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/* Floor Reflection */}
            <div className="absolute -bottom-24 w-[500px] h-[500px] bg-radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%) blur-3xl transform rotateX(90deg) pointer-events-none"></div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300"
            onClick={() => setSelectedImage(null)}
        >
            <button 
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
                onClick={() => setSelectedImage(null)}
            >
                <X size={32} />
            </button>
            
            <div className="relative max-w-[95vw] max-h-[90vh] p-2 animate-pop-in">
                <img 
                    src={selectedImage} 
                    alt="Full View" 
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10"
                    onClick={(e) => e.stopPropagation()} 
                />
            </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
