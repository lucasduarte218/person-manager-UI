import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { PersonForm } from '../components/PersonForm';
import { Person } from '../types/person';
import { apiService } from '../services/api';
import { useToast } from '../hooks/use-toast';
import { Users, ArrowLeft } from 'lucide-react';

export default function PublicPersonEdit() {
  const [person, setPerson] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPerson, setIsLoadingPerson] = useState(true);
  
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchPerson(parseInt(id));
    }
  }, [id]);

  const fetchPerson = async (personId: number) => {
    try {
      setIsLoadingPerson(true);
      const data = await apiService.getPersonV1(personId);
      setPerson(data);
    } catch (error) {
      toast({
        title: "Erro ao carregar pessoa",
        description: "Não foi possível carregar os dados da pessoa.",
        variant: "destructive",
      });
      navigate('/public');
    } finally {
      setIsLoadingPerson(false);
    }
  };

  const handleSubmit = async (updatedPerson: Person) => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const personId = parseInt(id);
      await apiService.updatePersonV1(personId, updatedPerson);
      
      toast({
        title: "Pessoa atualizada com sucesso!",
        description: `Os dados de ${updatedPerson.name} foram atualizados.`,
      });
      
      navigate('/public');
    } catch (error) {
      toast({
        title: "Erro ao atualizar pessoa",
        description: "Não foi possível atualizar os dados. Verifique as informações e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/public');
  };

  if (isLoadingPerson) {
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
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Carregando dados da pessoa...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!person) {
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
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-foreground">Pessoa não encontrada</h2>
            <p className="text-muted-foreground mt-2">A pessoa solicitada não foi encontrada.</p>
          </div>
        </main>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-foreground">Editar Pessoa</h1>
            <p className="text-muted-foreground mt-2">
              Atualize os dados de <strong>{person.name}</strong>.
            </p>
          </div>

          <PersonForm
            person={person}
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