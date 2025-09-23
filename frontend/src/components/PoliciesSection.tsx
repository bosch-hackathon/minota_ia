import { ShieldCheck, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const PoliciesSection = () => {
  const prohibitedItems = [
    {
      icon: XCircle,
      title: 'Bebidas Alcoólicas',
      description: 'Todos os tipos de bebidas alcoólicas são automaticamente reprovados',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    },
    {
      icon: XCircle,
      title: 'Produtos de Tabaco',
      description: 'Cigarros, charutos e outros produtos relacionados ao tabaco',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    },
    {
      icon: XCircle,
      title: 'Entretenimento Adulto',
      description: 'Conteúdo e serviços de entretenimento adulto não permitidos',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    },
    {
      icon: AlertTriangle,
      title: 'Itens de Alto Valor',
      description: 'Produtos acima de R$ 1.000 requerem aprovação adicional',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  const allowedCategories = [
    {
      icon: CheckCircle,
      title: 'Material de Escritório',
      description: 'Papelaria, equipamentos e suprimentos de escritório',
      examples: ['Papel A4', 'Canetas', 'Grampeadores', 'Toners']
    },
    {
      icon: CheckCircle,
      title: 'Tecnologia Corporativa',
      description: 'Equipamentos e software para uso empresarial',
      examples: ['Laptops', 'Monitores', 'Software', 'Periféricos']
    },
    {
      icon: CheckCircle,
      title: 'Alimentação Corporativa',
      description: 'Refeições e lanches para eventos e reuniões',
      examples: ['Coffee break', 'Almoços', 'Água', 'Lanches']
    },
    {
      icon: CheckCircle,
      title: 'Transporte e Viagem',
      description: 'Despesas relacionadas a viagens corporativas',
      examples: ['Passagens', 'Hospedagem', 'Combustível', 'Pedágios']
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-destructive/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-success/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center px-4 py-2 bg-card rounded-full border border-border mb-6">
            <ShieldCheck className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm font-medium">Políticas Empresariais</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Compliance Automatizado</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nossa IA aplica automaticamente as políticas empresariais da Bosch, garantindo conformidade total
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Prohibited Items */}
          <div className="animate-fade-up">
            <h3 className="text-2xl font-bold mb-8 flex items-center">
              <XCircle className="h-6 w-6 text-destructive mr-3" />
              Itens Não Permitidos
            </h3>
            
            <div className="space-y-4">
              {prohibitedItems.map((item, index) => (
                <Card 
                  key={index} 
                  className="border-destructive/20 hover-lift"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${item.bgColor}`}>
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Allowed Categories */}
          <div className="animate-fade-up delay-300">
            <h3 className="text-2xl font-bold mb-8 flex items-center">
              <CheckCircle className="h-6 w-6 text-success mr-3" />
              Categorias Permitidas
            </h3>
            
            <div className="space-y-4">
              {allowedCategories.map((category, index) => (
                <Card 
                  key={index} 
                  className="border-success/20 hover-lift"
                  style={{ animationDelay: `${(index + 4) * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 rounded-lg bg-success/10">
                        <category.icon className="h-5 w-5 text-success" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{category.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {category.examples.map((example, i) => (
                            <span 
                              key={i} 
                              className="text-xs px-2 py-1 bg-success/10 text-success rounded-md"
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Assessment Matrix */}
        <div className="mt-12 animate-fade-up delay-800">
          <Card className="card-gradient border-border/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-center mb-8">
                Matriz de Classificação de Risco
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-lg bg-success/10 border border-success/20">
                  <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                  <h4 className="font-semibold text-success mb-2">APROVADO</h4>
                  <p className="text-sm text-muted-foreground">Cupom válido e dentro das políticas</p>
                </div>
                
                <div className="text-center p-6 rounded-lg bg-warning/10 border border-warning/20">
                  <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
                  <h4 className="font-semibold text-warning mb-2">SUSPEITO</h4>
                  <p className="text-sm text-muted-foreground">Requer análise humana adicional</p>
                </div>
                
                <div className="text-center p-6 rounded-lg bg-destructive/10 border border-destructive/20">
                  <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                  <h4 className="font-semibold text-destructive mb-2">REPROVADO</h4>
                  <p className="text-sm text-muted-foreground">Cupom inválido ou fora das políticas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PoliciesSection;