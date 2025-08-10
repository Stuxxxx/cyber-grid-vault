import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onEnter: () => void;
}

export const HeroSection = ({ onEnter }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Scan line effect */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-cyber shadow-cyber animate-scan-line" />
      
      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Status indicator */}
          <motion.div 
            className="inline-flex items-center space-x-2 mb-8 px-4 py-2 glass rounded-full"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-2 h-2 bg-cyber rounded-full shadow-cyber" />
            <span className="text-xs font-code text-cyber tracking-wider">SYSTÈME SÉCURISÉ</span>
          </motion.div>

          {/* Main title */}
          <motion.h1 
            className="text-6xl md:text-8xl font-cyber font-black mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <span 
              className="glitch neon-glow text-cyber animate-pulse-neon"
              data-text="CYBER"
            >
              CYBER
            </span>
            <br />
            <span className="text-cyber-blue">PORTFOLIO</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl font-code text-foreground mb-8 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            EXPERT EN CYBERSÉCURITÉ
            <span className="text-cyber mx-2">|</span>
            DÉVELOPPEUR SÉCURISÉ
            <span className="text-cyber-blue mx-2">|</span>
            PENTESTER
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 2 }}
          >
            <Button
              onClick={onEnter}
              size="lg"
              className="
                relative px-12 py-6 text-lg font-cyber tracking-wider
                bg-transparent border-2 border-cyber text-cyber
                hover:bg-cyber hover:text-background hover:shadow-cyber
                transition-all duration-300 cyber-hover
                before:absolute before:inset-0 before:bg-cyber before:opacity-0
                before:transition-opacity before:duration-300
                hover:before:opacity-10
              "
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>ACCÉDER AU SYSTÈME</span>
                <div className="w-2 h-2 bg-cyber rounded-full animate-cyber-pulse" />
              </span>
            </Button>
          </motion.div>

          {/* Terminal-style access info */}
          <motion.div 
            className="mt-12 text-left max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            <div className="glass p-4 rounded border border-cyber/30 font-code text-sm">
              <div className="text-cyber mb-2">$ ./access_portfolio.sh</div>
              <div className="text-foreground/70">Initialisation sécurisée...</div>
              <div className="text-cyber-blue">Authentification biométrique: ✓</div>
              <div className="text-cyber">Accès autorisé</div>
              <div className="flex items-center mt-2">
                <span className="text-foreground/70">root@cyber-portfolio:~$</span>
                <div className="w-2 h-4 bg-cyber ml-1 animate-cyber-pulse" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="text-cyber w-8 h-8" />
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-64 h-64 border border-cyber/20 rounded-full animate-cyber-pulse" />
      <div className="absolute bottom-4 left-4 w-32 h-32 border border-cyber-blue/20 rotate-45 animate-cyber-float" />
      
      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-cyber" />
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-cyber" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-cyber-blue" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-cyber-blue" />
    </section>
  );
};