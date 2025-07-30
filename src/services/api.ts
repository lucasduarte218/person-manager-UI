import { Person, AuthRequest, AuthResponse, RegisterRequest } from '../types/person';
import { config, getApiUrl, validateConfig } from '../config';

// Validate configuration on import
if (!validateConfig()) {
  throw new Error('Configuração da API inválida');
}

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = getApiUrl(endpoint);
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || `HTTP error! status: ${response.status}`);
      }

      // Handle 204 No Content responses
      if (response.status === 204) {
        return null as T;
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials: AuthRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>(config.ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<any> {
    return this.request(config.ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Person endpoints V1 (no auth required)
  async getPersonsV1(): Promise<Person[]> {
    return this.request<Person[]>(config.ENDPOINTS.PERSONS.V1_BASE);
  }

  async getPersonV1(id: number): Promise<Person> {
    return this.request<Person>(`${config.ENDPOINTS.PERSONS.V1_BASE}/${id}`);
  }

  async createPersonV1(person: Person): Promise<Person> {
    return this.request<Person>(config.ENDPOINTS.PERSONS.V1_BASE, {
      method: 'POST',
      body: JSON.stringify(person),
    });
  }

  async updatePersonV1(id: number, person: Person): Promise<Person> {
    return this.request<Person>(`${config.ENDPOINTS.PERSONS.V1_BASE}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...person, id }),
    });
  }

  async deletePersonV1(id: number): Promise<void> {
    return this.request<void>(`${config.ENDPOINTS.PERSONS.V1_BASE}/${id}`, {
      method: 'DELETE',
    });
  }

  // Person endpoints V2 (auth required)
  async getPersonsV2(): Promise<Person[]> {
    return this.request<Person[]>(config.ENDPOINTS.PERSONS.V2_BASE);
  }

  async getPersonV2(id: number): Promise<Person> {
    return this.request<Person>(`${config.ENDPOINTS.PERSONS.V2_BASE}/${id}`);
  }

  async createPersonV2(person: Person): Promise<Person> {
    return this.request<Person>(config.ENDPOINTS.PERSONS.V2_BASE, {
      method: 'POST',
      body: JSON.stringify(person),
    });
  }

  async updatePersonV2(id: number, person: Person): Promise<Person> {
    return this.request<Person>(`${config.ENDPOINTS.PERSONS.V2_BASE}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...person, id }),
    });
  }

  async deletePersonV2(id: number): Promise<void> {
    return this.request<void>(`${config.ENDPOINTS.PERSONS.V2_BASE}/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();