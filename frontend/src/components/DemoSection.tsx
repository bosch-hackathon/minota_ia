import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, CheckCircle, AlertTriangle, XCircle, Clock, Shield } from 'lucide-react';

const DemoSection = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<string>('');

  const sampleResults = {
    approved: {
      status: 'approved',
      title: 'Cupom Aprovado',
      message: 'Documento válido e dentro das políticas empresariais',
      details: {
        cnpj: '12.345.678/0001-90',
        valor: 'R$ 245,50',
        data: '15/01/2025',
        categoria: 'Material de Escritório',
        risco: 'Baixo'
      },
      icon: CheckCircle,
      color: 'success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20'
    },
    suspicious: {
      status: 'suspicious',
      title: 'Cupom Suspeito',
      message: 'Documento requer análise adicional - valor acima do limite',
      details: {
        cnpj: '98.765.432/0001-10',
        valor: 'R$ 1.250,00',
        data: '14/01/2025',
        categoria: 'Eletrônicos',
        risco: 'Médio'
      },
      icon: AlertTriangle,
      color: 'warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20'
    },
    rejected: {
      status: 'rejected',
      title: 'Cupom Reprovado',
      message: 'Produto não permitido pela política empresarial',
      details: {
        cnpj: '11.222.333/0001-44',
        valor: 'R$ 89,90',
        data: '13/01/2025',
        categoria: 'Bebidas Alcoólicas',
        risco: 'Alto'
      },
      icon: XCircle,
      color: 'destructive',
      bgColor: 'bg-destructive/10',
      borderColor: 'border-destructive/20'
    }
  };

  const handleFileUpload = (type: 'approved' | 'suspicious' | 'rejected') => {
    setSelectedFile(type);
    setIsProcessing(true);
    setResult(null);

    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setResult(sampleResults[type]);
    }, 3000);
  };

  const resetDemo = () => {
    setResult(null);
    setSelectedFile('');
    setIsProcessing(false);
  };

  return (
    <section id="demo" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center px-4 py-2 bg-card rounded-full border border-border mb-6">
            <Upload className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm font-medium">Demonstração Interativa</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Teste Nossa IA</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Simule o upload de diferentes tipos de cupons e veja como nossa IA os classifica
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Upload Section */}
          {!result && !isProcessing && (
            <div className="animate-fade-up">
              <Card className="card-gradient border-border/20 mb-8">
                <CardHeader>
                  <CardTitle className="text-center flex items-center justify-center">
                    <FileText className="h-6 w-6 mr-2" />
                    Selecione um Tipo de Cupom para Testar
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    <Button
                      onClick={() => handleFileUpload('approved')}
                      className="h-32 flex flex-col items-center justify-center bg-success/10 hover:bg-success/20 text-success border-success/20 border-2"
                      variant="outline"
                    >
                      <CheckCircle className="h-8 w-8 mb-2" />
                      <span className="font-semibold">Cupom Válido</span>
                      <span className="text-xs opacity-80">Material de Escritório</span>
                    </Button>

                    <Button
                      onClick={() => handleFileUpload('suspicious')}
                      className="h-32 flex flex-col items-center justify-center bg-warning/10 hover:bg-warning/20 text-warning border-warning/20 border-2"
                      variant="outline"
                    >
                      <AlertTriangle className="h-8 w-8 mb-2" />
                      <span className="font-semibold">Cupom Suspeito</span>
                      <span className="text-xs opacity-80">Alto Valor</span>
                    </Button>

                    <Button
                      onClick={() => handleFileUpload('rejected')}
                      className="h-32 flex flex-col items-center justify-center bg-destructive/10 hover:bg-destructive/20 text-destructive border-destructive/20 border-2"
                      variant="outline"
                    >
                      <XCircle className="h-8 w-8 mb-2" />
                      <span className="font-semibold">Cupom Inválido</span>
                      <span className="text-xs opacity-80">Produto Proibido</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Processing Section */}
          {isProcessing && (
            <div className="animate-fade-up text-center">
              <Card className="card-gradient border-border/20">
                <CardContent className="p-12">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
                    <h3 className="text-2xl font-bold mb-4">Processando Cupom...</h3>
                    <p className="text-muted-foreground mb-6">Nossa IA está analisando o documento</p>
                    
                    <div className="space-y-2 text-left w-full max-w-md">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <span className="text-sm">Extraindo dados via OCR...</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-secondary rounded-full animate-pulse delay-500"></div>
                        <span className="text-sm">Consultando SEFAZ...</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-1000"></div>
                        <span className="text-sm">Aplicando políticas empresariais...</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Result Section */}
          {result && (
            <div className="animate-fade-up">
              <Card className={`${result.bgColor} ${result.borderColor} border-2`}>
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <result.icon className={`h-16 w-16 text-${result.color} mx-auto mb-4`} />
                    <h3 className="text-3xl font-bold mb-2">{result.title}</h3>
                    <p className="text-lg text-muted-foreground">{result.message}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center">
                        <Shield className="h-5 w-5 mr-2" />
                        Dados Extraídos
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">CNPJ:</span>
                          <span className="font-mono">{result.details.cnpj}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Valor:</span>
                          <span className="font-semibold">{result.details.valor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Data:</span>
                          <span>{result.details.data}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center">
                        <Clock className="h-5 w-5 mr-2" />
                        Análise de Risco
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Categoria:</span>
                          <span>{result.details.categoria}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Nível de Risco:</span>
                          <span className={`font-semibold text-${result.color}`}>
                            {result.details.risco}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tempo de Processamento:</span>
                          <span>2.8s</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button onClick={resetDemo} variant="outline" className="hover-lift">
                      <Upload className="h-4 w-4 mr-2" />
                      Testar Outro Cupom
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Demo Info */}
        <div className="mt-16 text-center animate-fade-up delay-600">
          <Card className="card-gradient border-border/20 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-2">💡 Sobre esta Demonstração</h4>
              <p className="text-sm text-muted-foreground">
                Esta é uma simulação do funcionamento real da nossa IA. Em produção, o sistema processa 
                documentos reais e se integra com APIs da SEFAZ para validação completa.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;