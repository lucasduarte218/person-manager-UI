import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { PersonForm } from '../components/PersonForm';
import { Person } from '../types/person';
import { apiService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';

export default function PersonNew() {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (person: Person) => {
    setIsLoading(true);
    try {
      if (isAuthenticated) {
        await apiService.createPersonV2(person);
      } else {
        await apiService.createPersonV1(person);
      }
      
      toast({
        title: "Pessoa cadastrada com sucesso!",
        description: `${person.name} foi cadastrado(a) no sistema.`,
      });
      
      navigate('/dashboard');
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
    navigate('/dashboard');
  };

  return (
    <Layout>
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
          requireAddress={isAuthenticated}
        />
      </div>
    </Layout>
  );
}