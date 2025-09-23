import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Brain } from 'lucide-react';
import heroImage from '@/assets/hero-dashboard.jpg';

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: Zap,
      title: 'Validação em Tempo Real',
      description: 'Processamento instantâneo de cupons e notas fiscais'
    },
    {
      icon: Shield,
      title: 'Detecção de Fraudes',
      description: 'IA avançada para identificar irregularidades'
    },
    {
      icon: Brain,
      title: 'Política Empresarial Automatizada',
      description: 'Aplicação automática de regras de compliance'
    }
  ];

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 hero-gradient opacity-90"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-glow/10 rounded-full blur-3xl animate-glow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-glow delay-1000"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-card/20 backdrop-blur-sm rounded-full border border-border/20 mb-6 animate-fade-up">
              <span className="text-sm font-medium text-primary">🚀 Hackathon Bosch 2025</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-up delay-200">
              <span className="text-primary-foreground">Automação</span>
              <br />
              <span className="text-gradient">Inteligente</span>
              <br />
              <span className="text-primary-foreground">de Notas Fiscais</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 animate-fade-up delay-400">
              Reconhecimento e validação de cupons com Inteligência Artificial
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-up delay-600">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground hover-lift shadow-glow"
                onClick={() => scrollToSection('how-it-works')}
              >
                Saiba Mais
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover-lift"
                onClick={() => scrollToSection('demo')}
              >
                Ver Demonstração
              </Button>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 animate-fade-up delay-800">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="card-gradient p-6 rounded-lg border border-border/20 backdrop-blur-sm hover-lift"
                >
                  <feature.icon className="h-8 w-8 text-secondary mb-3" />
                  <h3 className="font-semibold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-fade-up delay-1000">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant hover-glow">
              <img
                src={heroImage}
                alt="Dashboard de Automação IA"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-secondary rounded-full flex items-center justify-center animate-glow">
              <Brain className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center animate-glow delay-500">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;