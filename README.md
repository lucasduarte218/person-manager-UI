# 🚀 PersonCraft - Sistema Avançado de Gestão de Pessoas

<div align="center">

![PersonCraft Logo](public/favicon-colored.svg)

**A solução definitiva para gestão moderna de cadastros pessoais**

[![Deploy Status](https://img.shields.io/badge/Deploy-Live-brightgreen)](https://personmanager-f47d5.web.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646cff)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Hosting-orange)](https://firebase.google.com/)

[🌐 **Aplicação Live**](https://personmanager-f47d5.web.app) | [📖 **Documentação**](./docs/API_CONFIG.md) | [🚀 **Quick Start**](#-quick-start)

</div>

---

## 🎯 **Visão Geral**

O **PersonCraft** é uma aplicação web moderna e robusta para gerenciamento inteligente de cadastros pessoais. Desenvolvido com as mais avançadas tecnologias do mercado, oferece uma experiência excepcional tanto para usuários quanto para desenvolvedores.

### ✨ **Por que escolher PersonCraft?**

- 🎨 **Interface Moderna**: Design elegante e responsivo com Tailwind CSS + shadcn/ui
- ⚡ **Performance Excepcional**: Construído com Vite e React 18 para máxima velocidade
- 🔒 **Segurança Robusta**: Sistema de autenticação JWT completo
- 📱 **Mobile-First**: Totalmente responsivo para todos os dispositivos
- 🌍 **Deploy Automático**: Integração com Firebase Hosting para deploy instantâneo
- 🛠️ **Arquitetura Escalável**: Código limpo e organizado seguindo as melhores práticas

---

## 🏗️ **Arquitetura & Tecnologias**

### **Frontend Moderno**
```typescript
React 18.3.1        // Interface reativa e performática
TypeScript 5.5.3    // Tipagem estática para maior confiabilidade
Vite 5.4.1          // Build tool ultrarrápido
Tailwind CSS        // Estilização utilitária moderna
shadcn/ui           // Componentes elegantes e acessíveis
React Hook Form     // Gerenciamento de formulários otimizado
React Router DOM    // Navegação SPA avançada
Lucide React        // Ícones vetoriais modernos
```

### **Backend Integration**
```typescript
RESTful API         // Comunicação padronizada
JWT Authentication  // Segurança enterprise
Axios HTTP Client   // Requisições otimizadas
Environment Config  // Gestão multi-ambiente
Error Handling      // Tratamento robusto de erros
```

### **DevOps & Deploy**
```bash
Firebase Hosting    // CDN global e SSL automático
GitHub Integration  // Controle de versão
NPM Scripts         // Automação de tarefas
Batch Scripts       // Deploy simplificado Windows
```

---

## 🚀 **Funcionalidades Principais**

### 🔐 **Sistema de Autenticação Avançado**
- **Login Seguro**: Autenticação JWT com tokens seguros
- **Registro de Usuários**: Criação rápida e validada de contas
- **Proteção de Rotas**: Acesso controlado às áreas privadas
- **Logout Automático**: Gerenciamento inteligente de sessões

### 👥 **Gestão Completa de Pessoas**
- **CRUD Completo**: Criar, visualizar, editar e excluir registros
- **Validação de CPF**: Algoritmo robusto de validação brasileira
- **Interface Intuitiva**: Formulários otimizados e user-friendly
- **Busca Avançada**: Localização rápida de registros

### 🎨 **Experiência do Usuário Excepcional**
- **Design Responsivo**: Adaptação perfeita a qualquer tela
- **Navegação Fluida**: Transições suaves entre páginas
- **Feedback Visual**: Indicadores de carregamento e status
- **Acessibilidade**: Compatível com leitores de tela

### 🛡️ **Segurança Enterprise**
- **Autenticação JWT**: Tokens seguros e verificáveis
- **Rotas Protegidas**: Acesso controlado por permissões
- **Validação Dupla**: Frontend e backend sincronizados
- **Sanitização de Dados**: Proteção contra ataques XSS

---

## 📊 **Diferenciais Competitivos**

### ⚡ **Performance Otimizada**
- **Lazy Loading**: Carregamento sob demanda
- **Code Splitting**: Divisão inteligente do código
- **Cache Inteligente**: Minimização de requisições
- **Bundle Otimizado**: Tamanho reduzido para carregamento rápido

### 🔧 **Arquitetura Escalável**
```
src/
├── components/        # Componentes reutilizáveis
│   ├── ui/           # Biblioteca de componentes
│   └── layout/       # Estruturas de página
├── pages/            # Páginas da aplicação
├── services/         # Integração com APIs
├── contexts/         # Gerenciamento de estado
├── config/           # Configurações multi-ambiente
├── types/            # Definições TypeScript
└── utils/            # Funções utilitárias
```

### 🌐 **Multi-Ambiente**
- **Desenvolvimento**: `https://localhost:7073/api`
- **Produção**: `https://PersonManager.somee.com/api`
- **Detecção Automática**: Configuração baseada no ambiente
- **Variáveis de Ambiente**: Configuração flexível

---

## 🚀 **Quick Start**

### **Pré-requisitos**
- Node.js 22.17.1+ (via NVM)
- npm 10.9.2+
- Git

### **Instalação Rápida**
```bash
# Clone o repositório
git clone https://github.com/lucasduarte218/person-craft.git
cd person-craft

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev
```

### **Deploy Instantâneo**
```bash
# Build para produção
npm run build

# Deploy no Firebase
firebase deploy --only hosting
```

### **Scripts Automatizados**
```bash
# Windows - Execução simplificada
.\start.bat          # Inicia desenvolvimento
.\deploy.bat         # Deploy automático
.\login-firebase.bat # Login Firebase
```

---

## 🎨 **Demonstração Visual**

### **Tela de Login Moderna**
- Design elegante com gradientes
- Alternância entre Login/Registro
- Validação em tempo real
- Indicadores visuais de carregamento

### **Dashboard Intuitivo**
- Cards informativos
- Navegação clara
- Ações rápidas
- Status em tempo real

### **Formulários Inteligentes**
- Validação automática de CPF
- Feedback visual instantâneo
- Auto-completar otimizado
- Responsividade perfeita

---

### 🛠️ **Manutenibilidade Superior**
- **TypeScript** para redução de erros
- **Componentes reutilizáveis** para agilidade
- **Documentação completa** para onboarding
- **Testes automatizados** para confiabilidade

---

## 📱 **Responsividade Total**

### **Mobile First**
- Design otimizado para dispositivos móveis
- Touch gestures intuitivos
- Performance otimizada para 3G/4G
- PWA ready para instalação

### **Desktop Enhanced**
- Aproveitamento total da tela
- Atalhos de teclado
- Multi-window support

---

## 🔗 **Links Úteis**

- 🌐 **Aplicação Live**: [https://personmanager-f47d5.web.app](https://personmanager-f47d5.web.app)
- 📚 **Documentação da API**: [./docs/API_CONFIG.md](./docs/API_CONFIG.md)
- 🔧 **Backend API**: [https://PersonManager.somee.com/api](https://PersonManager.somee.com/api)
- 📊 **Repository**: [https://github.com/lucasduarte218/person-craft](https://github.com/lucasduarte218/person-craft)

---

## 📄 **Licença**

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<div align="center">

**PersonCraft**

</div>
