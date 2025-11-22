
import React, { useState } from 'react';
import { Mail, MapPin, Send, Instagram, Twitter, AtSign, Github, Linkedin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Function to mask email for privacy
  const getMaskedEmail = (email: string) => {
    if (!email.includes('@')) return email;
    const [name, domain] = email.split('@');
    // Show first char, mask the rest of the name, show domain
    return `${name.charAt(0)}********@${domain}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate processing time then trigger mailto
    setTimeout(() => {
      const subject = `Portfolio Message from ${formData.name}`;
      const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0A${formData.message}`;
      
      // Open email client
      window.location.href = `mailto:${PORTFOLIO_DATA.email}?subject=${subject}&body=${body}`;
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Let's connect.</h2>
            <p className="text-gray-400 text-xl mb-12">
              I'm always open to discussing new projects, internships, or creative ideas. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="space-y-6">
              {/* Email Item with Masking */}
              <div className="flex items-center gap-6 group cursor-default">
                  <div className="w-14 h-14 rounded-2xl bg-[#1c1c1e] flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-[#2c2c2e] transition-all duration-300 border border-white/5">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Email</p>
                    <p className="text-lg text-white font-medium font-mono tracking-wider">
                      {getMaskedEmail(PORTFOLIO_DATA.email)}
                    </p>
                  </div>
              </div>

              {/* Location Item */}
              <div className="flex items-center gap-6 group cursor-default">
                  <div className="w-14 h-14 rounded-2xl bg-[#1c1c1e] flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-[#2c2c2e] transition-all duration-300 border border-white/5">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Location</p>
                    <p className="text-lg text-white font-medium">India</p>
                  </div>
              </div>

              {/* Socials */}
              <div className="pt-6 flex flex-wrap gap-4">
                 {PORTFOLIO_DATA.socials.github && (
                   <a href={PORTFOLIO_DATA.socials.github} target="_blank" rel="noopener noreferrer" className="group">
                     <div className="w-14 h-14 rounded-2xl bg-[#1c1c1e] flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-[#2c2c2e] transition-all duration-300 border border-white/5">
                        <Github size={24} />
                     </div>
                   </a>
                 )}
                 {PORTFOLIO_DATA.socials.linkedin && (
                   <a href={PORTFOLIO_DATA.socials.linkedin} target="_blank" rel="noopener noreferrer" className="group">
                     <div className="w-14 h-14 rounded-2xl bg-[#1c1c1e] flex items-center justify-center text-gray-400 group-hover:text-blue-500 group-hover:bg-[#2c2c2e] transition-all duration-300 border border-white/5">
                        <Linkedin size={24} />
                     </div>
                   </a>
                 )}
                 {PORTFOLIO_DATA.socials.twitter && (
                   <a href={PORTFOLIO_DATA.socials.twitter} target="_blank" rel="noopener noreferrer" className="group">
                     <div className="w-14 h-14 rounded-2xl bg-[#1c1c1e] flex items-center justify-center text-gray-400 group-hover:text-blue-400 group-hover:bg-[#2c2c2e] transition-all duration-300 border border-white/5">
                        <Twitter size={24} />
                     </div>
                   </a>
                 )}
                 {PORTFOLIO_DATA.socials.instagram && (
                   <a href={PORTFOLIO_DATA.socials.instagram} target="_blank" rel="noopener noreferrer" className="group">
                     <div className="w-14 h-14 rounded-2xl bg-[#1c1c1e] flex items-center justify-center text-gray-400 group-hover:text-pink-500 group-hover:bg-[#2c2c2e] transition-all duration-300 border border-white/5">
                        <Instagram size={24} />
                     </div>
                   </a>
                 )}
                 {PORTFOLIO_DATA.socials.threads && (
                   <a href={PORTFOLIO_DATA.socials.threads} target="_blank" rel="noopener noreferrer" className="group">
                     <div className="w-14 h-14 rounded-2xl bg-[#1c1c1e] flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-[#2c2c2e] transition-all duration-300 border border-white/5">
                        <AtSign size={24} />
                     </div>
                   </a>
                 )}
              </div>
            </div>
          </div>

          {/* Dark Form */}
          <div className="bg-[#1c1c1e] p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2 ml-2">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-black/50 border border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Your Name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2 ml-2">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-black/50 border border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  placeholder="name@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2 ml-2">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-black/50 border border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none"
                  placeholder="Say hello!"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                  status === 'success' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {status === 'submitting' ? (
                  <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                ) : status === 'success' ? (
                  'Opening Mail App...'
                ) : (
                  <>Send Message <Send size={20} /></>
                )}
              </button>
              <p className="text-xs text-center text-gray-500 mt-2">
                Note: clicking send will open your default email client.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;