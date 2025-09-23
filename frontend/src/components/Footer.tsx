import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Como Funciona', id: 'how-it-works' },
    { label: 'Tecnologias', id: 'technologies' },
    { label: 'Demonstração', id: 'demo' }
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hackathon-bosch-2025@exemplo.com', label: 'Email' }
  ];

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary-glow/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-secondary-foreground font-bold text-xl">B</span>
                </div>
                <span className="text-2xl font-bold">Bosch IA Fiscal</span>
              </div>
              
              <p className="text-primary-foreground/80 mb-6 max-w-md">
                Automatização inteligente de notas fiscais com IA avançada. 
                Desenvolvido durante o Hackathon Bosch 2025 para revolucionar 
                a validação de documentos fiscais corporativos.
              </p>

              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    asChild
                  >
                    <a href={social.href} aria-label={social.label}>
                      <social.icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Contato</h3>
              <div className="space-y-3 text-primary-foreground/80">
                <div>
                  <p className="font-medium">Email da Equipe</p>
                  <a 
                    href="mailto:hackathon-bosch-2025@exemplo.com"
                    className="hover:text-primary-foreground transition-colors"
                  >
                    hackathon-bosch-2025@exemplo.com
                  </a>
                </div>
                <div>
                  <p className="font-medium">Evento</p>
                  <p>Hackathon Bosch 2025</p>
                </div>
                <div>
                  <p className="font-medium">Status</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Projeto Finalizado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-primary-foreground/20"></div>

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-primary-foreground/60 text-sm">
              © 2025 Hackathon Bosch - Automação IA Fiscal. Todos os direitos reservados.
            </div>

            {/* Made with Love */}
            <div className="flex items-center text-primary-foreground/60 text-sm">
              <span>Feito com</span>
              <Heart className="h-4 w-4 mx-1 text-destructive fill-current" />
              <span>pela equipe Bosch IA</span>
            </div>

            {/* Tech Stack */}
            <div className="text-primary-foreground/60 text-sm">
              React • TypeScript • Tailwind CSS • IA
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;