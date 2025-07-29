import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Person } from '../types/person';
import { validateCPF, validateEmail, formatCPF, isValidBirthDate } from '../utils/validators';
import { useToast } from '../hooks/use-toast';
import { Save, X } from 'lucide-react';

interface PersonFormProps {
  person?: Person;
  onSubmit: (person: Person) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  requireAddress?: boolean;
}

export const PersonForm = ({ 
  person, 
  onSubmit, 
  onCancel, 
  isLoading = false,
  requireAddress = false 
}: PersonFormProps) => {
  const { toast } = useToast();
  const [cpfValue, setCpfValue] = useState(person?.cpf || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty }
  } = useForm<Person>({
    defaultValues: {
      name: person?.name || '',
      gender: person?.gender || '',
      email: person?.email || '',
      birthDate: person?.birthDate ? person.birthDate.split('T')[0] : '',
      placeOfBirth: person?.placeOfBirth || '',
      nationality: person?.nationality || '',
      cpf: person?.cpf || '',
      address: person?.address || '',
    }
  });

  const watchedEmail = watch('email');

  useEffect(() => {
    if (person) {
      setValue('name', person.name);
      setValue('gender', person.gender || '');
      setValue('email', person.email || '');
      setValue('birthDate', person.birthDate ? person.birthDate.split('T')[0] : '');
      setValue('placeOfBirth', person.placeOfBirth || '');
      setValue('nationality', person.nationality || '');
      setValue('cpf', person.cpf);
      setValue('address', person.address || '');
      setCpfValue(person.cpf);
    }
  }, [person, setValue]);

  const validateForm = (data: Person): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!data.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!data.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!validateCPF(data.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    if (!data.birthDate) {
      newErrors.birthDate = 'Data de nascimento é obrigatória';
    } else if (!isValidBirthDate(data.birthDate)) {
      newErrors.birthDate = 'Data de nascimento inválida';
    }

    // Optional email validation
    if (data.email && !validateEmail(data.email)) {
      newErrors.email = 'Email inválido';
    }

    // Address validation for V2
    if (requireAddress && !data.address?.trim()) {
      newErrors.address = 'Endereço é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (data: Person) => {
    if (!validateForm(data)) {
      toast({
        title: "Erro de validação",
        description: "Por favor, corrija os erros do formulário.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Format birth date to ISO format
      const formattedData = {
        ...data,
        birthDate: new Date(data.birthDate).toISOString(),
        cpf: data.cpf.replace(/\D/g, ''), // Remove formatting
      };

      await onSubmit(formattedData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      const formatted = formatCPF(value);
      setCpfValue(formatted);
      setValue('cpf', value);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary-glow/5 border-b">
        <CardTitle className="text-xl">
          {person ? 'Editar Pessoa' : 'Nova Pessoa'}
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nome */}
            <div className="md:col-span-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                {...register('name')}
                className={errors.name ? 'border-destructive' : ''}
                placeholder="Digite o nome completo"
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name}</p>
              )}
            </div>

            {/* CPF */}
            <div>
              <Label htmlFor="cpf">CPF *</Label>
              <Input
                id="cpf"
                value={cpfValue}
                onChange={handleCpfChange}
                className={errors.cpf ? 'border-destructive' : ''}
                placeholder="000.000.000-00"
                maxLength={14}
              />
              {errors.cpf && (
                <p className="text-sm text-destructive mt-1">{errors.cpf}</p>
              )}
            </div>

            {/* Data de Nascimento */}
            <div>
              <Label htmlFor="birthDate">Data de Nascimento *</Label>
              <Input
                id="birthDate"
                type="date"
                {...register('birthDate')}
                className={errors.birthDate ? 'border-destructive' : ''}
              />
              {errors.birthDate && (
                <p className="text-sm text-destructive mt-1">{errors.birthDate}</p>
              )}
            </div>

            {/* Sexo */}
            <div>
              <Label htmlFor="gender">Sexo</Label>
              <Select 
                value={watch('gender') || ''} 
                onValueChange={(value) => setValue('gender', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o sexo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Masculino">Masculino</SelectItem>
                  <SelectItem value="Feminino">Feminino</SelectItem>
                  <SelectItem value="Outro">Outro</SelectItem>
                  <SelectItem value="Prefiro não informar">Prefiro não informar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
                placeholder="exemplo@email.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            {/* Naturalidade */}
            <div>
              <Label htmlFor="placeOfBirth">Naturalidade</Label>
              <Input
                id="placeOfBirth"
                {...register('placeOfBirth')}
                placeholder="Cidade onde nasceu"
              />
            </div>

            {/* Nacionalidade */}
            <div>
              <Label htmlFor="nationality">Nacionalidade</Label>
              <Input
                id="nationality"
                {...register('nationality')}
                placeholder="Ex: Brasileira"
              />
            </div>

            {/* Endereço */}
            <div className="md:col-span-2">
              <Label htmlFor="address">
                Endereço {requireAddress && '*'}
              </Label>
              <Textarea
                id="address"
                {...register('address')}
                className={errors.address ? 'border-destructive' : ''}
                placeholder="Endereço completo"
                rows={3}
              />
              {errors.address && (
                <p className="text-sm text-destructive mt-1">{errors.address}</p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end space-x-3 bg-muted/30">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="flex items-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>Cancelar</span>
          </Button>
          <Button
            type="submit"
            disabled={isLoading || !isDirty}
            className="flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{isLoading ? 'Salvando...' : 'Salvar'}</span>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};