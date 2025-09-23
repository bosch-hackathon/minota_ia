import { Upload, Search, Database, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const HowItWorksSection = () => {
  const steps = [
    {
      number: '01',
      icon: Upload,
      title: 'Upload do Cupom',
      description: 'Envie o cupom fiscal em PDF ou imagem através da nossa interface intuitiva.',
      color: 'text-secondary'
    },
    {
      number: '02',
      icon: Search,
      title: 'Extração de Dados via OCR',
      description: 'Nossa IA utiliza OCR avançado para extrair todas as informações relevantes do documento.',
      color: 'text-primary'
    },
    {
      number: '03',
      icon: Database,
      title: 'Consulta XML na SEFAZ',
      description: 'Verificação automática dos dados junto aos sistemas oficiais da Receita Federal.',
      color: 'text-accent'
    },
    {
      number: '04',
      icon: CheckCircle,
      title: 'Validação Cruzada',
      description: 'Análise completa de CNPJ, data, valor e outros campos críticos para validação.',
      color: 'text-success'
    },
    {
      number: '05',
      icon: AlertTriangle,
      title: 'Aplicação da Política Empresarial',
      description: 'Verificação automática contra as políticas internas da empresa e regras de compliance.',
      color: 'text-warning'
    },
    {
      number: '06',
      icon: XCircle,
      title: 'Resultado Final',
      description: 'Classificação automática: Aprovado, Suspeito ou Reprovado com justificativas detalhadas.',
      color: 'text-destructive'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-40 left-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Fluxo de Funcionamento</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubra como nossa solução de IA automatiza completamente o processo de validação de notas fiscais
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="card-gradient border-border/20 hover-lift animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                {/* Step Number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-5xl font-bold text-muted-foreground/20">
                    {step.number}
                  </span>
                  <div className={`p-3 rounded-full bg-card-hover ${step.color}`}>
                    <step.icon className="h-6 w-6" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-4 text-card-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Progress Indicator */}
                <div className="mt-6 flex items-center space-x-2">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i <= index 
                          ? 'bg-secondary w-8' 
                          : 'bg-muted w-4'
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Flow Visualization */}
        <div className="mt-20 animate-fade-up delay-600">
          <div className="bg-card-hover rounded-2xl p-8 border border-border/20">
            <h3 className="text-2xl font-bold text-center mb-8 text-card-foreground">
              Tempo de Processamento Médio
            </h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-secondary mb-2">~2s</div>
                <div className="text-muted-foreground">Upload e OCR</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">~3s</div>
                <div className="text-muted-foreground">Consulta SEFAZ</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">~1s</div>
                <div className="text-muted-foreground">Análise Final</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;