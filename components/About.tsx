import React from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { Cpu, Globe, Zap, Database } from 'lucide-react';

const About: React.FC = () => {
  const items = [
    { icon: Globe, label: 'Web Architecture', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
    { icon: Zap, label: 'Performance', color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' },
    { icon: Cpu, label: 'AI Integration', color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
    { icon: Database, label: 'Backend Systems', color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
  ];

  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] overflow-hidden group">
            {/* Background with Blur */}
            <div className="absolute inset-0 bg-[#1c1c1e] opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 opacity-50"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] group-hover:bg-blue-500/30 transition-colors duration-700"></div>
            
            <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white tracking-tight">About Me</h2>
              <div className="space-y-6 text-gray-300 leading-relaxed text-lg md:text-xl font-light opacity-90">
                {PORTFOLIO_DATA.about.split('\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
            
            <div className="w-full md:w-1/3 grid grid-cols-1 gap-4">
                {items.map((item, idx) => (
                    <div key={idx} className="group/item bg-black/20 backdrop-blur-xl p-5 rounded-2xl border border-white/5 flex items-center gap-5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-white/10 cursor-default">
                        <div className={`p-3.5 rounded-xl ${item.bg} ${item.color} border ${item.border} group-hover/item:scale-110 transition-transform duration-300`}>
                            <item.icon size={24} />
                        </div>
                        <span className="text-gray-200 font-medium text-lg">{item.label}</span>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;