
import React, { useRef } from 'react';
import { Heart, BrainCircuit } from 'lucide-react';

const Goals: React.FC = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    });
  };

  return (
    <section id="goals" className="py-24 relative overflow-hidden" onMouseMove={handleMouseMove}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">My Aspirations</h2>
          <p className="text-gray-400 text-xl font-light max-w-2xl mx-auto">The path I am walking towards, illuminated by purpose.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Goal 1: Good Person - Spotlight Card */}
          <div className="group spotlight-card relative rounded-[2.5rem] bg-[#1c1c1e] border border-white/5 transition-transform duration-500 hover:scale-[1.01] shadow-2xl">
             <div className="spotlight-border"></div>
             <div className="relative z-10 p-10 md:p-14 h-full flex flex-col">
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-all duration-500 group-hover:scale-110">
                    <Heart size={200} className="text-red-500 fill-red-500 blur-md" />
                </div>
             
                <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-red-500/20 to-pink-600/20 border border-red-500/30 flex items-center justify-center mb-10 w-fit p-4 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                    <Heart size={36} className="text-red-400" fill="currentColor" />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">To Be A Good Person</h3>
                <div className="space-y-5 text-gray-300 leading-relaxed text-lg font-light">
                    <p>
                        Before any title or achievement, I want Jesus to be first in my life. I believe true greatness begins with integrity, kindness, and empathy.
                    </p>
                    <p>
                        More than skills or success, how we treat others defines who we are. I strive to be helpful, honest, and someone who brings positive energy to everyone around me.
                    </p>
                </div>
             </div>
          </div>

          {/* Goal 2: AI Engineer - Spotlight Card */}
          <div className="group spotlight-card relative rounded-[2.5rem] bg-[#1c1c1e] border border-white/5 transition-transform duration-500 hover:scale-[1.01] shadow-2xl">
             <div className="spotlight-border"></div>
             <div className="relative z-10 p-10 md:p-14 h-full flex flex-col">
                 <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-all duration-500 group-hover:scale-110">
                    <BrainCircuit size={200} className="text-blue-500 blur-md" />
                 </div>
             
                <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border border-blue-500/30 flex items-center justify-center mb-10 w-fit p-4 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                    <BrainCircuit size={36} className="text-blue-400" />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">AI / ML Engineer</h3>
                <div className="space-y-5 text-gray-300 leading-relaxed text-lg font-light">
                    <p>
                        My professional dream is to dive deep into Artificial Intelligence and Machine Learning.
                    </p>
                    <p>
                        I want to build intelligent software that can solve complex problems and help people in their daily lives. Whether it's becoming an AI Software Engineer or a Machine Learning Specialist, I am committed to learning the math, code, and logic behind the magic.
                    </p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Goals;
