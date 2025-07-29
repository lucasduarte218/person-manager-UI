import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { PersonForm } from '../components/PersonForm';
import { Person } from '../types/person';
import { apiService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';

export default function PersonEdit() {
  const [person, setPerson] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPerson, setIsLoadingPerson] = useState(true);
  
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchPerson(parseInt(id));
    }
  }, [id, isAuthenticated]);

  const fetchPerson = async (personId: number) => {
    try {
      setIsLoadingPerson(true);
      const data = isAuthenticated 
        ? await apiService.getPersonV2(personId)
        : await apiService.getPersonV1(personId);
      setPerson(data);
    } catch (error) {
      toast({
        title: "Erro ao carregar pessoa",
        description: "Não foi possível carregar os dados da pessoa.",
        variant: "destructive",
      });
      navigate('/dashboard');
    } finally {
      setIsLoadingPerson(false);
    }
  };

  const handleSubmit = async (updatedPerson: Person) => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const personId = parseInt(id);
      
      if (isAuthenticated) {
        await apiService.updatePersonV2(personId, updatedPerson);
      } else {
        await apiService.updatePersonV1(personId, updatedPerson);
      }
      
      toast({
        title: "Pessoa atualizada com sucesso!",
        description: `Os dados de ${updatedPerson.name} foram atualizados.`,
      });
      
      navigate('/dashboard');
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
    navigate('/dashboard');
  };

  if (isLoadingPerson) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando dados da pessoa...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!person) {
    return (
      <Layout>
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-foreground">Pessoa não encontrada</h2>
          <p className="text-muted-foreground mt-2">A pessoa solicitada não foi encontrada.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
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
          requireAddress={isAuthenticated}
        />
      </div>
    </Layout>
  );
}