import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";

export function ConsultaNFe() {
  const [chave, setChave] = useState<string>("");
  const [resultado, setResultado] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const consultar = async () => {
    if (!chave.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, digite a chave de acesso.",
        variant: "destructive",
      });
      return;
    }

    if (chave.length !== 44) {
      toast({
        title: "Chave inválida",
        description: "A chave de acesso deve conter exatamente 44 dígitos.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResultado("");

    try {
      const response = await fetch("http://localhost:3000/consulta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chave }),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const data = await response.json();

      // Se o backend retorna `resultadoGemini`, pega ele.
      // Caso contrário, salva tudo para debug.
      setResultado(data.resultadoGemini ?? JSON.stringify(data, null, 2));

      toast({
        title: "Consulta realizada",
        description: "Dados obtidos com sucesso.",
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      setResultado(`Erro: ${errorMessage}`);

      toast({
        title: "Erro na consulta",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChaveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Permite apenas números e limita a 44 caracteres
    const value = e.target.value.replace(/\D/g, "").slice(0, 44);
    setChave(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault();
      consultar();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
            Minota
          </h1>
          <p className="text-xl text-muted-foreground font-medium">
            Consulta NF-e/NFC-e (SP)
          </p>
        </div>

        <Card className="shadow-elegant border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-primary">
              Digite a chave de acesso
            </CardTitle>
            <p className="text-muted-foreground">
              Informe a chave de 44 dígitos para consultar a nota fiscal
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="00000000000000000000000000000000000000000000"
                value={chave}
                onChange={handleChaveChange}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="text-center tracking-wider"
                maxLength={44}
              />
              <div className="text-center text-sm text-muted-foreground">
                {chave.length}/44 dígitos
              </div>
            </div>

            <Button
              variant="consulta"
              size="lg"
              onClick={consultar}
              disabled={loading}
              className="w-full"
            >
              <Search className="mr-2 h-5 w-5" />
              {loading ? "Consultando..." : "Consultar"}
            </Button>

            {resultado && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary">
                  Resultado da consulta:
                </label>
                <Textarea
                  value={resultado}
                  readOnly
                  className="min-h-[300px] text-sm"
                  placeholder="O resultado da consulta aparecerá aqui..."
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Sistema moderno para consulta de documentos fiscais</p>
        </div>
      </div>
    </div>
  );
}
