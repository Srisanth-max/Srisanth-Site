
import React, { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { X, ZoomIn } from 'lucide-react';

const Projects: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Refs for interaction and animation
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const lastRotationRef = useRef(0);
  const isHoveredRef = useRef(false);
  const animationFrameRef = useRef<number>(0);

  // Determine carousel configuration
  const projects = PORTFOLIO_DATA.projects;
  const total = projects.length;
  const anglePerItem = 360 / total;
  
  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target); // Animate only once
            }
        },
        { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (sectionRef.current) {
        observer.observe(sectionRef.current);
    }

    return () => {
        if (sectionRef.current) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            observer.unobserve(sectionRef.current);
        }
    };
  }, []);


  useEffect(() => {
    const animate = () => {
      // Auto-rotate if not interacting
      if (!isDraggingRef.current && !isHoveredRef.current) {
         rotationRef.current -= 0.1; // Slow auto-rotation speed
      }
      
      // Apply rotation
      if (carouselRef.current) {
         carouselRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, []);

  // Handler for Mouse Wheel
  const handleWheel = (e: React.WheelEvent) => {
    // Add deltaY to rotation (scroll down = rotate left)
    rotationRef.current += e.deltaY * 0.05;
  };

  // Handlers for Touch Gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].clientX;
    lastRotationRef.current = rotationRef.current;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startXRef.current;
    // Map horizontal swipe distance to rotation angle
    rotationRef.current = lastRotationRef.current + (deltaX * 0.5);
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  // Handlers for Mouse Hover
  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };
  
  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    isDraggingRef.current = false;
  };

  return (
    <section id="gallery" ref={sectionRef} className="py-32 bg-black relative overflow-hidden">
        {/* Background aesthetic elements */}
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        <div className="mb-12 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 shadow-lg animate-fade-in-up">
            <span className="text-blue-400 font-medium tracking-wider text-xs uppercase">Visual Portfolio</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            My Gallery
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-xl font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
             A collection of moments revolving around my journey. <br/>
             <span className="text-sm opacity-50">(Drag, Scroll, or Hover to interact)</span>
          </p>
        </div>

        {/* 3D Circular Gallery Container */}
        {/* We use CSS Variables for the Radius to easily switch between mobile and desktop sizes via media queries */}
        <style>{`
          :root {
            --carousel-radius: 240px;
          }
          @media (min-width: 768px) {
            :root {
              --carousel-radius: 450px;
            }
          }
        `}</style>

        <div className="perspective-2000 w-full h-[500px] md:h-[600px] flex items-center justify-center relative mt-10 md:mt-0">
            <div 
                ref={carouselRef}
                className="relative w-[200px] h-[280px] md:w-[280px] md:h-[380px] preserve-3d cursor-grab active:cursor-grabbing touch-pan-y"
                style={{ 
                    transformStyle: 'preserve-3d',
                }}
                onWheel={handleWheel}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {projects.map((item, index) => (
                    <div 
                        key={item.id}
                        className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-[#1c1c1e] shadow-[0_0_30px_rgba(0,0,0,0.8)] cursor-pointer group transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]"
                        style={{
                            transform: `rotateY(${index * anglePerItem}deg) translateZ(var(--carousel-radius)) scale(0.9)`, 
                        }}
                        onClick={() => setSelectedImage(item.imageUrl)}
                    >
                        {/* Inner Container for Animation & Masking */}
                        <div 
                            className={`w-full h-full relative opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
                            style={{
                                animationDelay: `${index * 0.15 + 0.3}s`, // Staggered delay
                                animationFillMode: 'forwards',
                                // CSS Mask for Top/Bottom Fade
                                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
                            }}
                        >
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                            <img 
                                src={item.imageUrl} 
                                alt={item.title} 
                                className="w-full h-full object-cover select-none pointer-events-none md:pointer-events-auto transition-transform duration-300 group-hover:scale-105"
                                loading="lazy" 
                            />
                            <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 px-2">
                                <h3 className="text-white text-sm font-bold truncate">{item.title}</h3>
                                <div className="flex justify-center items-center gap-1 text-blue-400 text-xs mt-1">
                                    <ZoomIn size={12} /> View
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Floor Reflection/Shadow */}
            <div className="absolute -bottom-20 w-[600px] h-[600px] bg-radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%) blur-3xl transform rotateX(90deg) pointer-events-none"></div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl transition-all duration-500 animate-in fade-in perspective-1000"
            onClick={() => setSelectedImage(null)}
        >
            <button 
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
                onClick={() => setSelectedImage(null)}
            >
                <X size={32} />
            </button>
            
            <div className="relative max-w-[95vw] max-h-[90vh] transform-style-3d animate-pop-in p-2">
                <img 
                    src={selectedImage} 
                    alt="Full screen view" 
                    className="w-full h-full object-contain rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
                    onClick={(e) => e.stopPropagation()} 
                />
            </div>
        </div>
      )}
    </section>
  );
};

export default Projects;