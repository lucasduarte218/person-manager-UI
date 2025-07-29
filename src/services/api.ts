import { Person, AuthRequest, AuthResponse, RegisterRequest } from '../types/person';

// Configure this URL to match your backend API
const API_BASE_URL = 'https://localhost:7056/api';

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
    const url = `${API_BASE_URL}${endpoint}`;
    
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
    return this.request<AuthResponse>('/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<any> {
    return this.request('/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Person endpoints V1 (no auth required)
  async getPersonsV1(): Promise<Person[]> {
    return this.request<Person[]>('/v1/person');
  }

  async getPersonV1(id: number): Promise<Person> {
    return this.request<Person>(`/v1/person/${id}`);
  }

  async createPersonV1(person: Person): Promise<Person> {
    return this.request<Person>('/v1/person', {
      method: 'POST',
      body: JSON.stringify(person),
    });
  }

  async updatePersonV1(id: number, person: Person): Promise<Person> {
    return this.request<Person>(`/v1/person/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...person, id }),
    });
  }

  async deletePersonV1(id: number): Promise<void> {
    return this.request<void>(`/v1/person/${id}`, {
      method: 'DELETE',
    });
  }

  // Person endpoints V2 (auth required)
  async getPersonsV2(): Promise<Person[]> {
    return this.request<Person[]>('/v2/person');
  }

  async getPersonV2(id: number): Promise<Person> {
    return this.request<Person>(`/v2/person/${id}`);
  }

  async createPersonV2(person: Person): Promise<Person> {
    return this.request<Person>('/v2/person', {
      method: 'POST',
      body: JSON.stringify(person),
    });
  }

  async updatePersonV2(id: number, person: Person): Promise<Person> {
    return this.request<Person>(`/v2/person/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...person, id }),
    });
  }

  async deletePersonV2(id: number): Promise<void> {
    return this.request<void>(`/v2/person/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();