import { Target, Users, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  const teamMembers = [
    { name: 'Giovanni Correia Amadio', role: 'Frontend Developer' },
    { name: 'Jônatas Santos Gandra', role: 'Backend Developer' },
    { name: 'Julia Rodrigues', role: 'Frontend Developer' },
    { name: 'Lucas Aragão', role: 'Backend Developer' },
    { name: 'Pedro H. G. Melim', role: 'DataBase' }
  ];

  const achievements = [
    {
      icon: Target,
      title: 'Missão',
      description: 'Revolucionar o processo de validação de notas fiscais através da inteligência artificial, garantindo compliance total e reduzindo fraudes corporativas.'
    },
    {
      icon: TrendingUp,
      title: 'Impacto',
      description: 'Redução no tempo de análise manual, economizando milhares de horas de trabalho humano.'
    },
    {
      icon: Award,
      title: 'Inovação',
      description: 'Combinação única de OCR avançado, consultas SEFAZ em tempo real e aplicação automatizada de políticas empresariais complexas.'
    }
  ];

  const projectStats = [
    { label: 'Horas de Desenvolvimento', value: '72h' },
    { label: 'Linhas de Código', value: '12.5k+' },
    { label: 'Testes Realizados', value: '850+' },
    { label: 'APIs Integradas', value: '1' }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center px-4 py-2 bg-card rounded-full border border-border mb-6">
            <Users className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm font-medium">Hackathon Bosch 2025</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Sobre o Projeto</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Desenvolvido durante o Hackathon Bosch 2025, nosso projeto representa a vanguarda da automação fiscal corporativa
          </p>
        </div>

        {/* Mission, Impact, Innovation */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <Card 
              key={index} 
              className="card-gradient border-border/20 hover-lift animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <achievement.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{achievement.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {achievement.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Project Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left: About the Hackathon */}
          <div className="animate-fade-up delay-300">
            <h3 className="text-3xl font-bold mb-6">Hackathon Bosch 2025</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                O Hackathon Bosch 2025 desafiou equipes de desenvolvedores a criar soluções inovadoras 
                para problemas reais da indústria. Nossa equipe escolheu abordar a complexa questão da 
                validação automatizada de notas fiscais corporativas.
              </p>
              <p>
                Durante 72 horas intensas, desenvolvemos uma solução completa que combina as mais 
                modernas tecnologias de IA, OCR e integração com APIs governamentais para criar 
                um sistema verdadeiramente revolucionário.
              </p>
              <p>
                O projeto não apenas atende aos requisitos técnicos, mas também considera aspectos 
                críticos como segurança de dados, compliance regulatório e experiência do usuário, 
                refletindo nossa abordagem holística ao desenvolvimento de software.
              </p>
            </div>

            {/* Project Stats */}
            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-4">Estatísticas do Projeto</h4>
              <div className="grid grid-cols-2 gap-4">
                {projectStats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-card rounded-lg border border-border/20">
                    <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Team */}
          <div className="animate-fade-up delay-500">
            <h3 className="text-3xl font-bold mb-6">Nossa Equipe</h3>
            <p className="text-muted-foreground mb-8">
              Uma equipe multidisciplinar de profissionais apaixonados por tecnologia e inovação, 
              unidos pelo objetivo de criar soluções que fazem a diferença.
            </p>

            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <Card 
                  key={index} 
                  className="border-border/20 hover-lift"
                  style={{ animationDelay: `${(index + 5) * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-primary">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-8 p-6 bg-card rounded-lg border border-border/20">
              <h4 className="font-semibold mb-2">Contato da Equipe</h4>
              <p className="text-sm text-muted-foreground">
                <a href="https://github.com/bosch-hackathon" target="_blank">https://github.com/bosch-hackathon</a>
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="animate-fade-up delay-700">
          <Card className="card-gradient border-border/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-center mb-8">Cronograma de Desenvolvimento</h3>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-secondary">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Planejamento</h4>
                  <p className="text-sm text-muted-foreground">Definição da arquitetura e tecnologias</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">Desenvolvimento</h4>
                  <p className="text-sm text-muted-foreground">Implementação do backend e IA</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-accent">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Interface</h4>
                  <p className="text-sm text-muted-foreground">Design e frontend responsivo</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-success">4</span>
                  </div>
                  <h4 className="font-semibold mb-2">Finalização</h4>
                  <p className="text-sm text-muted-foreground">Testes e apresentação final</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;