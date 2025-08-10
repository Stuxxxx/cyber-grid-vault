import { useState } from 'react';
import { CyberNav } from '@/components/CyberNav';
import { CyberGrid } from '@/components/CyberGrid';
import { BinaryRain } from '@/components/BinaryRain';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showMainSections, setShowMainSections] = useState(false);

  const handleEnterSystem = () => {
    setShowMainSections(true);
    setActiveSection('about');
  };

  const renderSection = () => {
    if (!showMainSections) {
      return <HeroSection onEnter={handleEnterSystem} />;
    }

    switch (activeSection) {
      case 'about':
        return <AboutSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'contact':
        return <ContactSection />;
      case 'home':
      default:
        return <HeroSection onEnter={handleEnterSystem} />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Effects */}
      <CyberGrid />
      <BinaryRain />
      
      {/* Navigation - Only show when main sections are visible */}
      {showMainSections && (
        <CyberNav 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
        />
      )}
      
      {/* Main Content */}
      <main className="relative z-10">
        {renderSection()}
      </main>
      
      {/* Scan line overlay */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-cyber shadow-cyber opacity-50 animate-scan-line pointer-events-none z-40" />
    </div>
  );
};

export default Index;
