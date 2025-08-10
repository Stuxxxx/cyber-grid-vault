import { useState } from 'react';
import { motion } from 'framer-motion';

interface CyberNavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const CyberNav = ({ activeSection, setActiveSection }: CyberNavProps) => {
  const [isGlitching, setIsGlitching] = useState(false);

  const navItems = [
    { id: 'home', label: 'ACCUEIL' },
    { id: 'about', label: 'À PROPOS' },
    { id: 'projects', label: 'PROJETS' },
    { id: 'contact', label: 'CONTACT' }
  ];

  const handleNavClick = (id: string) => {
    setIsGlitching(true);
    setTimeout(() => {
      setActiveSection(id);
      setIsGlitching(false);
    }, 200);
  };

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-cyber"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            className="text-2xl font-cyber font-bold text-cyber neon-glow"
            whileHover={{ scale: 1.05 }}
            data-text="CYBER_PORTFOLIO"
          >
            CYBER_PORTFOLIO
          </motion.div>

          {/* Navigation Items */}
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <motion.li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    relative font-cyber text-sm tracking-wider transition-all duration-300
                    ${activeSection === item.id 
                      ? 'text-cyber neon-glow' 
                      : 'text-foreground hover:text-cyber'
                    }
                    ${isGlitching ? 'glitch' : ''}
                    cyber-hover
                  `}
                  data-text={item.label}
                >
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Cyber underline effect */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-cyber"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: activeSection === item.id ? '100%' : 0,
                      boxShadow: activeSection === item.id ? '0 0 10px hsl(var(--cyber-glow))' : 'none'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Scan line effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-cyber-blue opacity-0 hover:opacity-100 animate-cyber-scan" />
                  </div>
                </button>
              </motion.li>
            ))}
          </ul>

          {/* Status indicator */}
          <motion.div 
            className="flex items-center space-x-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-2 h-2 bg-cyber rounded-full shadow-cyber animate-cyber-pulse" />
            <span className="text-xs font-code text-cyber">ONLINE</span>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};