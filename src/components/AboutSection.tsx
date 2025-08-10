import { motion } from 'framer-motion';
import { Shield, Terminal, Lock, Zap, Globe, Code } from 'lucide-react';

export const AboutSection = () => {
  const skills = [
    { icon: Shield, label: "Sécurité Réseau", level: 95 },
    { icon: Terminal, label: "Pentesting", level: 90 },
    { icon: Lock, label: "Cryptographie", level: 85 },
    { icon: Zap, label: "Forensique", level: 88 },
    { icon: Globe, label: "Sécurité Web", level: 92 },
    { icon: Code, label: "Dev Sécurisé", level: 87 }
  ];

  const certifications = [
    "CISSP - Certified Information Systems Security Professional",
    "CEH - Certified Ethical Hacker", 
    "OSCP - Offensive Security Certified Professional",
    "CISM - Certified Information Security Manager"
  ];

  return (
    <section className="min-h-screen py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-cyber font-bold mb-4">
              <span className="text-cyber">À PROPOS</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-cyber mx-auto mb-8" />
            <p className="text-xl font-code text-foreground/80">
              Profil d'expert en cybersécurité
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Info */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Bio Card */}
              <div className="glass p-8 rounded-lg border border-cyber/30">
                <h3 className="text-2xl font-cyber text-cyber mb-4">IDENTITÉ NUMÉRIQUE</h3>
                <div className="space-y-4 font-code">
                  <div className="flex items-center space-x-3">
                    <span className="text-cyber-blue">{'>'}</span>
                    <span className="text-foreground">Expert en cybersécurité avec +5 ans d'expérience</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-cyber-blue">{'>'}</span>
                    <span className="text-foreground">Spécialisé en tests d'intrusion et sécurité applicative</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-cyber-blue">{'>'}</span>
                    <span className="text-foreground">Passionné par l'innovation et les nouvelles technologies</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-cyber-blue">{'>'}</span>
                    <span className="text-foreground">Formateur et conférencier en sécurité informatique</span>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="glass p-6 rounded-lg border border-cyber-blue/30">
                <h4 className="text-xl font-cyber text-cyber-blue mb-4">CERTIFICATIONS</h4>
                <div className="space-y-2">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 font-code text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-2 h-2 bg-cyber-blue rounded-full shadow-cyber-blue" />
                      <span className="text-foreground/90">{cert}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Skills & Profile */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {/* Profile Image Area */}
              <div className="relative">
                <div className="glass p-8 rounded-lg border border-cyber/50 text-center">
                  <div className="w-48 h-48 mx-auto rounded-full bg-gradient-cyber p-1 mb-6">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-cyber/20 flex items-center justify-center">
                        <Shield className="w-16 h-16 text-cyber" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-cyber text-cyber mb-2">CYBER_EXPERT_001</h3>
                  <p className="font-code text-foreground/70">Security Analyst & Penetration Tester</p>
                  
                  {/* Status indicators */}
                  <div className="flex justify-center space-x-4 mt-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyber rounded-full animate-cyber-pulse" />
                      <span className="text-xs font-code text-cyber">ACTIF</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyber-blue rounded-full animate-cyber-pulse" />
                      <span className="text-xs font-code text-cyber-blue">VÉRIFIÉ</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="glass p-6 rounded-lg border border-cyber/30">
                <h4 className="text-xl font-cyber text-cyber mb-6">COMPÉTENCES TECHNIQUES</h4>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <skill.icon className="w-5 h-5 text-cyber" />
                          <span className="font-code text-foreground">{skill.label}</span>
                        </div>
                        <span className="font-code text-cyber text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          className="h-full bg-gradient-cyber rounded-full shadow-cyber"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-8 w-2 h-32 bg-cyber/20 animate-cyber-pulse" />
      <div className="absolute bottom-1/4 left-8 w-2 h-24 bg-cyber-blue/20 animate-cyber-pulse" />
    </section>
  );
};