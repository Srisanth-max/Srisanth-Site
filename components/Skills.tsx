import React from 'react';
import { PORTFOLIO_DATA } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Tech Stack</h2>
          <p className="text-gray-400 max-w-xl text-lg">
            My preferred arsenal of tools and technologies for building scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.skills.map((skillGroup, index) => (
            <div 
              key={index} 
              className={`group relative rounded-[2rem] p-8 overflow-hidden border border-white/10 transition-all duration-500 hover:border-white/20 ${
                  index === 0 ? 'md:col-span-2 bg-gradient-to-br from-[#1c1c1e] to-[#2c2c2e]' : 
                  index === 1 ? 'md:row-span-2 bg-[#111]' : 'bg-[#1c1c1e]'
              }`}
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <div className="w-32 h-32 rounded-full bg-white blur-[60px]"></div>
              </div>

              <h3 className="relative z-10 text-2xl font-bold text-white mb-8 flex items-center gap-3">
                {skillGroup.category}
              </h3>

              <div className="relative z-10 flex flex-wrap gap-3">
                {skillGroup.items.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-sm font-medium text-gray-200 hover:bg-white/10 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;