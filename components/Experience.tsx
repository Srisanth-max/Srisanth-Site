import React from 'react';
import { PORTFOLIO_DATA } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Career Path</h2>
        </div>

        <div className="relative">
           {/* Vertical Line */}
           <div className="absolute left-0 md:left-1/2 top-4 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-transparent md:-translate-x-1/2 ml-4 md:ml-0 opacity-30"></div>

           <div className="space-y-16">
            {PORTFOLIO_DATA.experience.map((job, index) => (
                <div key={job.id} className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Timeline Dot */}
                    <div className="absolute left-4 md:left-1/2 top-0 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] md:-translate-x-1.5 z-10"></div>

                    {/* Content */}
                    <div className="ml-12 md:ml-0 md:w-1/2 px-0 md:px-12">
                        <div className="text-gray-500 text-sm font-mono mb-2">{job.period}</div>
                        <div className="group p-6 rounded-2xl bg-[#1c1c1e] border border-white/5 hover:border-white/20 transition-all duration-300 hover:bg-[#242426]">
                            <h3 className="text-xl font-bold text-white mb-1">{job.role}</h3>
                            <div className="text-blue-400 font-medium mb-4">{job.company}</div>
                            <ul className="space-y-3">
                                {job.description.map((desc, i) => (
                                    <li key={i} className="text-gray-400 text-sm leading-relaxed flex items-start">
                                        <span className="mr-2 mt-1.5 block w-1 h-1 min-w-[4px] rounded-full bg-gray-600"></span>
                                        {desc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    {/* Empty Spacer for alignment */}
                    <div className="hidden md:block md:w-1/2"></div>
                </div>
            ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;