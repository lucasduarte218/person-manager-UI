import { getEnvironmentConfig } from './environments';

// Configurações da aplicação
export const config = {
  // URL do backend API (baseada no ambiente)
  API_BASE_URL: getEnvironmentConfig().API_BASE_URL,
  
  // Configurações de autenticação
  AUTH: {
    TOKEN_KEY: 'token',
    TOKEN_EXPIRY_KEY: 'token_expiry'
  },
  
  // Configurações da aplicação
  APP: {
    NAME: 'Person Craft',
    VERSION: '1.0.0'
  },
  
  // URLs específicas da API
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/v1/auth/login',
      REGISTER: '/v1/auth/register',
      REFRESH: '/auth/refresh'
    },
    PERSONS: {
      V1_BASE: '/v1/person',
      V2_BASE: '/v2/person',
      BY_ID: (id: string) => `/v2/person/${id}`
    }
  }
} as const;

// Função para obter a URL completa de um endpoint
export const getApiUrl = (endpoint: string): string => {
  return `${config.API_BASE_URL}${endpoint}`;
};

// Função para validar se a configuração está correta
export const validateConfig = (): boolean => {
  if (!config.API_BASE_URL) {
    console.error('API_BASE_URL não configurada');
    return false;
  }
  
  try {
    new URL(config.API_BASE_URL);
    return true;
  } catch {
    console.error('API_BASE_URL inválida:', config.API_BASE_URL);
    return false;
  }
};
