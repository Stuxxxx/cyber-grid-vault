import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text3D } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ExternalLink, Code, Shield } from 'lucide-react';
import projectsData from '@/data/projects.json';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  status: string;
  year: string;
  highlights: string[];
}

const Project3D = ({ project, position, onClick, isSelected }: {
  project: Project;
  position: [number, number, number];
  onClick: () => void;
  isSelected: boolean;
}) => {
  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={0.5}
      position={position}
    >
      <group onClick={onClick}>
        {/* Server/Terminal Box */}
        <mesh>
          <boxGeometry args={[2, 1.5, 0.5]} />
          <meshStandardMaterial 
            color={isSelected ? "#00ccff" : "#001100"} 
            emissive={isSelected ? "#003300" : "#000000"}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Screen */}
        <mesh position={[0, 0, 0.26]}>
          <planeGeometry args={[1.6, 1]} />
          <meshStandardMaterial 
            color="#000000"
            emissive="#002200"
          />
        </mesh>
        
        {/* Project Title */}
        <Text3D
          font="/fonts/cyber.json"
          size={0.1}
          height={0.02}
          position={[-0.7, 0.3, 0.27]}
        >
          {project.title.slice(0, 12)}
          <meshStandardMaterial color="#00ff88" />
        </Text3D>
        
        {/* Status Indicator */}
        <mesh position={[0.7, 0.6, 0.27]}>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial 
            color={project.status === 'DÉPLOYÉ' ? '#00ff88' : '#00ccff'}
            emissive={project.status === 'DÉPLOYÉ' ? '#00ff88' : '#00ccff'}
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* Holographic effect */}
        <mesh position={[0, 0, 0.3]}>
          <planeGeometry args={[2.2, 1.7]} />
          <meshStandardMaterial 
            color="#00ff88"
            transparent
            opacity={isSelected ? 0.1 : 0.05}
          />
        </mesh>
      </group>
    </Float>
  );
};

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const projects = projectsData as Project[];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'SECURITY_AUDIT': 'bg-cyber',
      'THREAT_ANALYSIS': 'bg-cyber-blue', 
      'DEV_SECURITY': 'bg-purple-500',
      'INCIDENT_MGMT': 'bg-orange-500',
      'BLOCKCHAIN': 'bg-yellow-500',
      'TRAINING': 'bg-pink-500'
    };
    return colors[category] || 'bg-cyber';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'DÉPLOYÉ': 'text-cyber',
      'EN PRODUCTION': 'text-cyber',
      'BETA': 'text-cyber-blue',
      'DÉVELOPPEMENT': 'text-yellow-400',
      'PROTOTYPE': 'text-purple-400',
      'PILOTE': 'text-orange-400'
    };
    return colors[status] || 'text-foreground';
  };

  return (
    <section className="min-h-screen py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-cyber font-bold mb-4">
            <span className="text-cyber">PROJETS</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-cyber mx-auto mb-8" />
          <p className="text-xl font-code text-foreground/80">
            Galerie interactive 3D des réalisations
          </p>
        </motion.div>

        {/* 3D Projects Gallery */}
        <div className="h-96 mb-12 rounded-lg border border-cyber/30 overflow-hidden">
          <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ff88" />
            <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00ccff" />
            
            {projects.map((project, index) => {
              const angle = (index / projects.length) * Math.PI * 2;
              const radius = 4;
              const position: [number, number, number] = [
                Math.cos(angle) * radius,
                Math.sin(index * 0.5) * 2,
                Math.sin(angle) * radius
              ];
              
              return (
                <Project3D
                  key={project.id}
                  project={project}
                  position={position}
                  onClick={() => setSelectedProject(project)}
                  isSelected={selectedProject?.id === project.id}
                />
              );
            })}
            
            <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="glass p-6 rounded-lg border border-cyber/30 cyber-hover cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="flex items-center justify-between mb-4">
                <Badge className={`${getCategoryColor(project.category)} text-background font-code text-xs`}>
                  {project.category}
                </Badge>
                <span className={`font-code text-xs ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              
              <h3 className="text-xl font-cyber text-cyber mb-3">{project.title}</h3>
              <p className="text-foreground/80 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-muted rounded text-xs font-code text-foreground/70"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-muted rounded text-xs font-code text-cyber">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-code text-cyber-blue text-sm">{project.year}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-cyber hover:text-background hover:bg-cyber"
                >
                  DÉTAILS
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto glass p-8 rounded-lg border border-cyber/50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-cyber text-cyber mb-2">{selectedProject.title}</h3>
                  <div className="flex items-center space-x-4">
                    <Badge className={`${getCategoryColor(selectedProject.category)} text-background font-code`}>
                      {selectedProject.category}
                    </Badge>
                    <span className={`font-code ${getStatusColor(selectedProject.status)}`}>
                      {selectedProject.status}
                    </span>
                    <span className="font-code text-cyber-blue">{selectedProject.year}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedProject(null)}
                  className="text-foreground hover:text-cyber hover:bg-cyber/10"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* Content */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-cyber text-cyber-blue mb-3">DESCRIPTION</h4>
                    <p className="text-foreground/90 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-cyber text-cyber-blue mb-3">TECHNOLOGIES</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-cyber/10 border border-cyber/30 rounded font-code text-cyber text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-cyber text-cyber-blue mb-3">POINTS CLÉS</h4>
                  <div className="space-y-3">
                    {selectedProject.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Shield className="w-5 h-5 text-cyber mt-0.5 flex-shrink-0" />
                        <span className="text-foreground/90 font-code text-sm">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 mt-8">
                    <Button className="bg-cyber text-background hover:bg-cyber/80 font-cyber">
                      <Code className="w-4 h-4 mr-2" />
                      VOIR LE CODE
                    </Button>
                    <Button variant="outline" className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10 font-cyber">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      DÉMO LIVE
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};