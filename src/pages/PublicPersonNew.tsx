import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { PersonForm } from '../components/PersonForm';
import { Person } from '../types/person';
import { apiService } from '../services/api';
import { useToast } from '../hooks/use-toast';
import { Users, ArrowLeft } from 'lucide-react';

export default function PublicPersonNew() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (person: Person) => {
    setIsLoading(true);
    try {
      await apiService.createPersonV1(person);
      
      toast({
        title: "Pessoa cadastrada com sucesso!",
        description: `${person.name} foi cadastrado(a) no sistema.`,
      });
      
      navigate('/public');
    } catch (error) {
      toast({
        title: "Erro ao cadastrar pessoa",
        description: "Não foi possível cadastrar a pessoa. Verifique os dados e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/public');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">PersonManager</h1>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/public')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Nova Pessoa</h1>
            <p className="text-muted-foreground mt-2">
              Preencha os dados abaixo para cadastrar uma nova pessoa no sistema.
            </p>
          </div>

          <PersonForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
            requireAddress={false}
          />
        </div>
      </main>
    </div>
  );
}