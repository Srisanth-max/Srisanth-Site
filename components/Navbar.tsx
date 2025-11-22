
import React, { useState, useEffect } from 'react';
import { Home, User, Mail, Image as ImageIcon } from 'lucide-react';

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'gallery', 'contact'];
      // Offset allows switching active state slightly before the element hits the very top
      const scrollPosition = window.scrollY + 300;

      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          current = section;
        }
      }
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const navItems = [
    { name: 'Home', icon: Home, href: '#home', id: 'home' },
    { name: 'About', icon: User, href: '#about', id: 'about' },
    { name: 'Gallery', icon: ImageIcon, href: '#gallery', id: 'gallery' },
    { name: 'Contact', icon: Mail, href: '#contact', id: 'contact' },
  ];

  return (
    <>
      {/* Desktop Floating Navbar */}
      <nav className={`hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${isScrolled ? 'translate-y-0' : 'translate-y-2'}`}>
        <div className="glass-high rounded-full px-4 py-2 flex items-center gap-1 shadow-2xl shadow-black/50 border border-white/10 relative">
          
          {navItems.map((item) => {
             const isActive = activeSection === item.id;
             return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 z-10 flex flex-col items-center group ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.name}
                
                {/* Animated Active Indicator */}
                <span className={`absolute -bottom-1 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></span>
                
                {/* Hover Glow */}
                <span className="absolute inset-0 rounded-full bg-white/5 scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 -z-10"></span>
              </a>
             );
          })}
        </div>
      </nav>

      {/* Mobile Bottom Navigation (iOS Dynamic Island Style) */}
      <nav className="md:hidden fixed bottom-6 left-4 right-4 z-50 pb-[env(safe-area-inset-bottom)]">
        <div className="glass-high rounded-[2.5rem] px-6 py-5 flex justify-between items-center shadow-2xl border border-white/10 backdrop-blur-2xl bg-black/80">
          {navItems.map((item) => {
             const isActive = activeSection === item.id;
             return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative flex flex-col items-center justify-center w-12 h-12 transition-all duration-300`}
              >
                <div className={`transition-all duration-300 transform ${isActive ? '-translate-y-1 text-white' : 'text-gray-500'}`}>
                    <item.icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
                </div>
                
                {/* Active Dot Animation */}
                <div className={`absolute bottom-1 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white] transition-all duration-300 ${
                    isActive ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-0 translate-y-2'
                }`}></div>
              </a>
             );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
