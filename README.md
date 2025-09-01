# Tatame Digital App

Aplicativo móvel para aprendizado e gerenciamento de jiu-jitsu, desenvolvido com React Native e Expo.

## 🥋 Funcionalidades

### Para Alunos
- **Tela Inicial**: Dashboard com acesso rápido a técnicas, treinos e progresso
- **Técnicas**: Biblioteca de técnicas organizadas por categoria com vídeos e descrições
- **Treinos**: Treinos estruturados com sequências de técnicas
- **Atletas**: Perfis de atletas famosos com suas técnicas de assinatura
- **Progresso**: Acompanhamento de evolução, metas e estatísticas
- **Perfil**: Gerenciamento de informações pessoais e configurações

### Para Administradores
- **Dashboard**: Visão geral com estatísticas e acesso rápido às funcionalidades
- **Gerenciar Técnicas**: CRUD completo de técnicas com categorização e status
- **Gerenciar Treinos**: Criação e edição de treinos com técnicas associadas
- **Gerenciar Atletas**: Controle de atletas com estatísticas de performance
- **Gerenciar Alunos**: Gestão completa de alunos com status e informações

## 🚀 Como Executar

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd TatameDigitalApp
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npx expo start
```

## 📱 Funcionalidades Principais

### 🔐 Sistema de Login
- **Tela de Login Única**: Interface unificada para alunos e administradores
- **Seletor de Tipo de Usuário**: Escolha entre modo aluno ou administrador
- **Credenciais de Demo**: 
  - Aluno: `aluno@tatame.com` / `aluno123`
  - Admin: `admin@tatame.com` / `admin123`

### 👨‍🎓 Área do Aluno
- **Navegação Simples**: Sem tabs, navegação direta entre telas
- **Dashboard Personalizado**: Visão geral do progresso e acesso rápido
- **Biblioteca de Técnicas**: Busca, filtros e visualização detalhada
- **Sistema de Treinos**: Progresso, categorias e acompanhamento
- **Perfil de Atletas**: Inspiração e aprendizado com mestres
- **Acompanhamento de Progresso**: Metas, estatísticas e conquistas
- **Perfil Completo**: Informações pessoais, configurações e logout

### 👨‍💼 Área do Administrador
- **Dashboard Administrativo**: Estatísticas e controle centralizado
- **Gestão de Conteúdo**: CRUD completo para técnicas, treinos e atletas
- **Controle de Usuários**: Gerenciamento de alunos e permissões
- **Relatórios e Estatísticas**: Visão geral do sistema

## 🏗️ Estrutura do Projeto

```
app/
├── _layout.tsx              # Layout principal sem tabs
├── login.tsx                # Tela de login unificada
├── (admin)/                 # Grupo de rotas administrativas
│   ├── _layout.tsx         # Layout administrativo
│   ├── dashboard.tsx       # Dashboard principal
│   ├── gerenciar-tecnicas.tsx
│   ├── gerenciar-treinos.tsx
│   ├── gerenciar-atletas.tsx
│   └── gerenciar-alunos.tsx
└── (aluno)/                # Grupo de rotas para alunos
    ├── home.tsx            # Tela inicial do aluno
    ├── tecnicas.tsx        # Biblioteca de técnicas
    ├── treinos.tsx         # Sistema de treinos
    ├── atletas.tsx         # Perfis de atletas
    ├── progresso.tsx       # Acompanhamento de progresso
    └── perfil.tsx          # Perfil do usuário
```

## 🎨 Design e UX

- **Interface Moderna**: Design limpo e intuitivo
- **Tema Adaptativo**: Suporte a modo claro e escuro
- **Navegação Intuitiva**: Botões de voltar e navegação clara
- **Responsividade**: Adaptado para diferentes tamanhos de tela
- **Ícones Consistentes**: Sistema de ícones unificado

## 🔧 Tecnologias Utilizadas

- **React Native**: Framework principal
- **Expo**: Plataforma de desenvolvimento
- **TypeScript**: Tipagem estática
- **Expo Router**: Sistema de navegação
- **React Native Vector Icons**: Sistema de ícones

## 📋 Próximos Passos

- [ ] Implementar autenticação real
- [ ] Adicionar banco de dados
- [ ] Sistema de notificações push
- [ ] Upload de vídeos
- [ ] Sistema de avaliação
- [ ] Relatórios avançados
- [ ] Testes automatizados

## 🤝 Contribuição

Este projeto está em desenvolvimento ativo. Contribuições são bem-vindas!

## 📄 Licença

Este projeto está sob a licença MIT.
