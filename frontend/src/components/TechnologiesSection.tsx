import { Code, Database, Brain, Server, Globe, Cpu } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TechnologiesSection = () => {
  const technologies = [
    {
      icon: Brain,
      title: 'OCR Avançado',
      description: 'Tesseract & EasyOCR',
      details: 'Reconhecimento óptico de caracteres',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      icon: Globe,
      title: 'APIs SEFAZ',
      description: 'Integração Oficial',
      details: 'Consulta direta aos sistemas da Receita Federal brasileira',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Server,
      title: 'Backend Robusto',
      description: 'Node.js & Python',
      details: 'Arquitetura escalável com microserviços e APIs RESTful',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      icon: Code,
      title: 'Frontend Moderno',
      description: 'React.js & TypeScript',
      details: 'Interface responsiva e intuitiva com componentes reutilizáveis',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: Database,
      title: 'Banco de Dados',
      description: 'PostgreSQL & MongoDB',
      details: 'Armazenamento híbrido para dados estruturados e documentos',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      icon: Cpu,
      title: 'NLP & Machine Learning',
      description: 'Classificação Inteligente',
      details: 'Identificação automática de produtos proibidos e suspeitos',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    }
  ];

  const stats = [
    { label: 'Precisão na Detecção', value: '98.5%' },
    { label: 'Tempo de Processamento', value: '<6s' },
    { label: 'Documentos por Minuto', value: '500+' },
    { label: 'Tipos de Cupom Suportados', value: '15+' }
  ];

  return (
    <section id="technologies" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Stack Tecnológico</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Utilizamos as mais modernas tecnologias para garantir performance, segurança e escalabilidade
          </p>
        </div>

        {/* Technologies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {technologies.map((tech, index) => (
            <Card 
              key={index} 
              className="card-gradient border-border/20 hover-lift animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${tech.bgColor} flex items-center justify-center mb-6`}>
                  <tech.icon className={`h-8 w-8 ${tech.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 text-card-foreground">
                  {tech.title}
                </h3>
                <div className={`text-sm font-semibold mb-3 ${tech.color}`}>
                  {tech.description}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {tech.details}
                </p>

                {/* Tech Badge */}
                <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-card-hover text-xs font-medium text-card-foreground">
                  Produção Ready
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Architecture Diagram */}
        <div className="mt-16 animate-fade-up delay-800">
          <Card className="card-gradient border-border/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-center mb-8 text-card-foreground">
                Arquitetura da Solução
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="h-10 w-10 text-secondary" />
                  </div>
                  <h4 className="font-semibold mb-2">Frontend</h4>
                  <p className="text-sm text-muted-foreground">Interface do usuário responsiva</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Server className="h-10 w-10 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Backend</h4>
                  <p className="text-sm text-muted-foreground">API e processamento de IA</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Database className="h-10 w-10 text-accent" />
                  </div>
                  <h4 className="font-semibold mb-2">Dados</h4>
                  <p className="text-sm text-muted-foreground">Armazenamento e consultas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;