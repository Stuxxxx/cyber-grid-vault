import { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Float } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  Github, 
  Linkedin, 
  Twitter,
  Shield,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Globe3D = () => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.2}>
      <group>
        {/* Main Globe */}
        <Sphere args={[1, 32, 32]}>
          <meshStandardMaterial 
            color="#001100"
            transparent
            opacity={0.6}
            wireframe
          />
        </Sphere>
        
        {/* Connection points */}
        {Array.from({ length: 20 }).map((_, i) => {
          const phi = Math.acos(-1 + (2 * i) / 20);
          const theta = Math.sqrt(20 * Math.PI) * phi;
          const x = Math.cos(theta) * Math.sin(phi);
          const y = Math.sin(theta) * Math.sin(phi);
          const z = Math.cos(phi);
          
          return (
            <mesh key={i} position={[x * 1.1, y * 1.1, z * 1.1]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial 
                color="#00ff88" 
                emissive="#00ff88"
                emissiveIntensity={0.5}
              />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
};

export const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    { 
      icon: Github, 
      label: 'GitHub', 
      url: 'https://github.com', 
      color: 'text-cyber',
      hoverColor: 'hover:text-cyber hover:shadow-cyber'
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      url: 'https://linkedin.com', 
      color: 'text-cyber-blue',
      hoverColor: 'hover:text-cyber-blue hover:shadow-cyber-blue'
    },
    { 
      icon: Twitter, 
      label: 'Twitter', 
      url: 'https://twitter.com', 
      color: 'text-purple-400',
      hoverColor: 'hover:text-purple-400 hover:shadow-purple'
    },
    { 
      icon: Mail, 
      label: 'Email', 
      url: 'mailto:expert@cyber-portfolio.com', 
      color: 'text-orange-400',
      hoverColor: 'hover:text-orange-400 hover:shadow-orange'
    }
  ];

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'expert@cyber-portfolio.com' },
    { icon: Phone, label: 'Téléphone', value: '+33 1 23 45 67 89' },
    { icon: MapPin, label: 'Localisation', value: 'Paris, France' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
    if (!formData.subject.trim()) newErrors.subject = 'Le sujet est requis';
    if (!formData.message.trim()) newErrors.message = 'Le message est requis';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez corriger les erreurs dans le formulaire",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulation d'envoi
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message envoyé avec succès",
        description: "Merci pour votre message. Je vous répondrai rapidement.",
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: "Erreur d'envoi",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
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
            <span className="text-cyber">CONTACT</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-cyber mx-auto mb-8" />
          <p className="text-xl font-code text-foreground/80">
            Établir une connexion sécurisée
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Security Badge */}
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-cyber" />
              <Badge className="bg-cyber/10 border border-cyber/30 text-cyber font-code">
                TRANSMISSION CRYPTÉE SSL/TLS
              </Badge>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-cyber text-cyber">NOM</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`
                      glass border font-code transition-all duration-300
                      ${errors.name 
                        ? 'border-destructive focus:border-destructive' 
                        : 'border-cyber/30 focus:border-cyber'
                      }
                      focus:shadow-cyber
                    `}
                    placeholder="Votre nom"
                  />
                  {errors.name && (
                    <div className="flex items-center space-x-2 text-destructive text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-cyber text-cyber">EMAIL</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`
                      glass border font-code transition-all duration-300
                      ${errors.email 
                        ? 'border-destructive focus:border-destructive' 
                        : 'border-cyber/30 focus:border-cyber'
                      }
                      focus:shadow-cyber
                    `}
                    placeholder="votre@email.com"
                  />
                  {errors.email && (
                    <div className="flex items-center space-x-2 text-destructive text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="font-cyber text-cyber">SUJET</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className={`
                    glass border font-code transition-all duration-300
                    ${errors.subject 
                      ? 'border-destructive focus:border-destructive' 
                      : 'border-cyber/30 focus:border-cyber'
                    }
                    focus:shadow-cyber
                  `}
                  placeholder="Sujet de votre message"
                />
                {errors.subject && (
                  <div className="flex items-center space-x-2 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.subject}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="font-cyber text-cyber">MESSAGE</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={5}
                  className={`
                    glass border font-code transition-all duration-300 resize-none
                    ${errors.message 
                      ? 'border-destructive focus:border-destructive' 
                      : 'border-cyber/30 focus:border-cyber'
                    }
                    focus:shadow-cyber
                  `}
                  placeholder="Votre message..."
                />
                {errors.message && (
                  <div className="flex items-center space-x-2 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.message}</span>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full bg-cyber text-background hover:bg-cyber/80 
                  font-cyber text-lg py-6 transition-all duration-300
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                  cyber-hover
                `}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    <span>TRANSMISSION EN COURS...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="w-5 h-5" />
                    <span>ENVOYER MESSAGE</span>
                  </div>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info & 3D Globe */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* 3D Globe */}
            <div className="h-64 glass rounded-lg border border-cyber/30 overflow-hidden">
              <Canvas camera={{ position: [0, 0, 3] }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ff88" />
                <Globe3D />
                <OrbitControls enablePan={false} enableZoom={false} autoRotate />
              </Canvas>
            </div>

            {/* Contact Information */}
            <div className="glass p-6 rounded-lg border border-cyber/30">
              <h3 className="text-2xl font-cyber text-cyber mb-6">INFORMATIONS DE CONTACT</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <div className="w-10 h-10 glass rounded-lg flex items-center justify-center border border-cyber/30">
                      <info.icon className="w-5 h-5 text-cyber" />
                    </div>
                    <div>
                      <div className="font-cyber text-cyber-blue text-sm">{info.label}</div>
                      <div className="font-code text-foreground">{info.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass p-6 rounded-lg border border-cyber/30">
              <h3 className="text-2xl font-cyber text-cyber mb-6">RÉSEAUX SÉCURISÉS</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      flex items-center space-x-3 p-3 glass rounded-lg border border-cyber/30
                      transition-all duration-300 cyber-hover
                      ${social.color} ${social.hoverColor}
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <social.icon className="w-6 h-6" />
                    <span className="font-code text-sm">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="glass p-4 rounded-lg border border-cyber/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-cyber" />
                  <span className="font-cyber text-cyber">DISPONIBLE POUR PROJETS</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyber rounded-full animate-cyber-pulse" />
                  <span className="font-code text-xs text-cyber">EN LIGNE</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-8 w-1 h-32 bg-cyber/20 animate-cyber-pulse" />
      <div className="absolute bottom-1/4 left-8 w-1 h-24 bg-cyber-blue/20 animate-cyber-pulse" />
    </section>
  );
};