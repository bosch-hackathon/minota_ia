import { useState, DragEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, CheckCircle, AlertTriangle, Clock, Shield } from "lucide-react";

const DemoSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async (file: File) => {
    setFile(file);
    setIsProcessing(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/notas/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Resposta do backend:", data);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Erro ao processar a nota.");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetDemo = () => {
    setFile(null);
    setResult(null);
    setIsProcessing(false);
  };

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Teste Nossa IA</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Arraste e solte ou faça upload de uma nota fiscal (PDF ou imagem) para análise
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Upload Card */}
          {!result && !isProcessing && (
            <Card
              className={`card-gradient border-dashed border-2 mb-8 text-center p-12 cursor-pointer transition ${
                isDragging ? "border-primary bg-primary/5" : "border-border/20"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <CardHeader>
                <CardTitle className="flex flex-col items-center justify-center">
                  <FileText className="h-10 w-10 mb-4" />
                  <span className="mb-2">Arraste e solte sua nota aqui</span>
                  <span className="text-sm text-muted-foreground">ou clique para selecionar</span>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="fileInput"
                    className="mt-4 px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90"
                  >
                    Escolher Arquivo
                  </label>
                </CardTitle>
              </CardHeader>
            </Card>
          )}

          {/* Loading */}
          {isProcessing && (
            <Card className="card-gradient border-border/20 text-center p-12">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h3 className="text-2xl font-bold mb-4">Processando nota...</h3>
              <p className="text-muted-foreground">Extraindo dados e validando políticas...</p>
            </Card>
          )}

          {/* Result */}
          {result && (
            <Card
              className={`border-2 mb-8 ${
                result.status === "approved"
                  ? "bg-success/10 border-success/20"
                  : "bg-warning/10 border-warning/20"
              }`}
            >
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  {result.status === "approved" ? (
                    <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                  ) : (
                    <AlertTriangle className="h-16 w-16 text-warning mx-auto mb-4" />
                  )}
                  <h3 className="text-3xl font-bold mb-2">
                    {result.status === "approved" ? "Nota Aprovada" : "Nota Suspeita"}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {result.status === "approved"
                      ? "Documento válido e dentro das políticas empresariais"
                      : "Documento requer análise adicional"}
                  </p>
                </div>

                {/* Detalhes */}
                {result.dados && (
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center">
                        <Shield className="h-5 w-5 mr-2" /> Dados Extraídos
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Valor:</span>
                          <span className="font-semibold">
                            {result.dados.valor_total || "Não identificado"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Data:</span>
                          <span>{result.dados.data_emissao || "Não identificada"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center">
                        <Clock className="h-5 w-5 mr-2" /> Produtos
                      </h4>
                      <ul className="text-sm list-disc list-inside">
                        {result.dados.produtos?.length > 0 ? (
                          result.dados.produtos.map((p: string, idx: number) => (
                            <li key={idx}>{p}</li>
                          ))
                        ) : (
                          <li className="text-muted-foreground">Nenhum produto identificado</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Motivos (se houver) */}
                {result.motivos?.length > 0 && (
                  <div className="mb-8">
                    <h4 className="font-semibold">Motivos:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {result.motivos.map((m: string, idx: number) => (
                        <li key={idx}>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="text-center">
                  <Button onClick={resetDemo} variant="outline" className="hover-lift">
                    <Upload className="h-4 w-4 mr-2" />
                    Testar Outra Nota
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
