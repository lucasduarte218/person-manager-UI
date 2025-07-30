// Configurações específicas por ambiente
export const environments = {
  development: {
    API_BASE_URL: 'https://localhost:7073/api',
    DEBUG: true
  },
  production: {
    API_BASE_URL: 'https://PersonManager.somee.com/api',
    DEBUG: false
  }
} as const;

// Detectar ambiente atual
export const getCurrentEnvironment = () => {
  // Em desenvolvimento, o Vite define import.meta.env.DEV
  if (typeof window !== 'undefined' && import.meta.env?.DEV) {
    return 'development';
  }
  return 'production';
};

// Obter configuração do ambiente atual
export const getEnvironmentConfig = () => {
  const env = getCurrentEnvironment();
  return environments[env];
};
