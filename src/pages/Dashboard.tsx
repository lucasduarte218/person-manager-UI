import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { Layout } from '../components/Layout';
import { Person } from '../types/person';
import { apiService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { formatCPF, formatDate } from '../utils/validators';
import { Search, Edit, Trash2, Plus, Users, Calendar, Mail, MapPin } from 'lucide-react';

export default function Dashboard() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [filteredPersons, setFilteredPersons] = useState<Person[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchPersons();
  }, [isAuthenticated]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPersons(persons);
    } else {
      const filtered = persons.filter(
        (person) =>
          person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.cpf.includes(searchTerm.replace(/\D/g, '')) ||
          person.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.placeOfBirth?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPersons(filtered);
    }
  }, [searchTerm, persons]);

  const fetchPersons = async () => {
    try {
      setIsLoading(true);
      const data = isAuthenticated 
        ? await apiService.getPersonsV2()
        : await apiService.getPersonsV1();
      setPersons(data);
      setFilteredPersons(data);
    } catch (error) {
      toast({
        title: "Erro ao carregar pessoas",
        description: "Não foi possível carregar a lista de pessoas.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!id) return;
    
    try {
      setDeleteLoading(id);
      
      if (isAuthenticated) {
        await apiService.deletePersonV2(id);
      } else {
        await apiService.deletePersonV1(id);
      }
      
      await fetchPersons();
      
      toast({
        title: "Pessoa removida",
        description: "A pessoa foi removida com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao remover",
        description: "Não foi possível remover a pessoa.",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/person/edit/${id}`);
  };

  const handleNewPerson = () => {
    navigate('/person/new');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando pessoas...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Users className="w-8 h-8 text-primary" />
              Lista de Pessoas
            </h1>
            <p className="text-muted-foreground mt-1">
              {persons.length} pessoa{persons.length !== 1 ? 's' : ''} cadastrada{persons.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <Button 
            onClick={handleNewPerson}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Pessoa</span>
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar por nome, CPF, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Persons Grid */}
        {filteredPersons.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <Users className="w-12 h-12 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-medium">
                  {searchTerm ? 'Nenhuma pessoa encontrada' : 'Nenhuma pessoa cadastrada'}
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm 
                    ? 'Tente buscar com outros termos'
                    : 'Comece cadastrando a primeira pessoa'
                  }
                </p>
              </div>
              {!searchTerm && (
                <Button onClick={handleNewPerson} className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Cadastrar Primeira Pessoa</span>
                </Button>
              )}
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPersons.map((person) => (
              <Card key={person.id} className="hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {person.name}
                    </CardTitle>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(person.id!)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                            disabled={deleteLoading === person.id}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir <strong>{person.name}</strong>? 
                              Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDelete(person.id!)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{formatDate(person.birthDate)}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm font-mono">
                    <Badge variant="outline">{formatCPF(person.cpf)}</Badge>
                  </div>

                  {person.email && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="truncate">{person.email}</span>
                    </div>
                  )}

                  {person.placeOfBirth && (
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{person.placeOfBirth}</span>
                    </div>
                  )}

                  {person.gender && (
                    <Badge variant="secondary" className="text-xs">
                      {person.gender}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}