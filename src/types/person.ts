export interface Person {
  id?: number;
  name: string;
  gender?: string;
  email?: string;
  birthDate: string;
  placeOfBirth?: string;
  nationality?: string;
  cpf: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id?: number;
  username: string;
  role: string;
}

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  role: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  role?: string;
}