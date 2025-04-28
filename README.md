# 🐆 PanteraBot - FURIA Tech Challenge

**Desafio Técnico FURIA Tech - Assistente de Engenharia de Software**

## 📋 Visão Geral

PanteraBot é uma solução integrada que combina um bot Discord com um sistema de gamificação para fãs da FURIA Esports. O projeto atende aos dois desafios propostos:

- **Desafio #1**: Experiência conversacional para fãs do time de CS
- **Desafio #2**: Solução para entender mais sobre o fã da FURIA

## 💡 Conceito

Um ecossistema completo onde fãs interagem via Discord, acumulam XP, completam missões, sobem de nível e são recompensados por seu engajamento, enquanto fornecemos à FURIA insights valiosos sobre sua base de fãs.

## 🏗️ Arquitetura do Sistema

### Stack Tecnológica
- **Bot Discord**: discord.js com TypeScript
- **Backend**: NestJS com TypeScript
- **Banco de Dados**: SQLite (para desenvolvimento)
- **Frontend**: Next.js com TypeScript (em desenvolvimento)

## 🤖 Componentes Implementados

### 1. Bot Discord
- Conexão básica com a API do Discord
- Sistema de comandos implementado
- Comandos disponíveis:
  - `!ping` - Verifica se o bot está online
  - `!elenco` - Mostra o elenco atual da FURIA CS2
  - `!perfil` - Exibe o perfil do usuário com nível e XP

### 2. API NestJS
- Estrutura base criada com TypeScript
- Integração com SQLite para armazenamento
- Módulo de usuários implementado com:
  - CRUD completo de usuários
  - Sistema de XP e níveis
  - Endpoints para interação com o bot Discord

### 3. Integração
- O bot Discord se comunica com a API NestJS
- Sistema básico de XP: usuários ganham 1 XP por comando usado
- Sistema de níveis: usuários sobem de nível a cada 100*nível XP

## 📁 Estrutura do Projeto

```
panterabot/
├── discord-bot/             # Bot Discord
│   ├── src/
│   │   ├── index.ts         # Arquivo principal do bot
│   ├── package.json
│   └── .env                 # Variáveis de ambiente (não versionado)
│
├── panterabot-api/          # Backend NestJS
│   ├── src/
│   │   ├── app.module.ts    # Módulo principal
│   │   ├── main.ts          # Ponto de entrada
│   │   ├── users/           # Módulo de usuários
│   │       ├── entities/    # Entidades (modelos)
│   │       ├── users.controller.ts
│   │       ├── users.module.ts
│   │       └── users.service.ts
│   ├── package.json
│   └── database.sqlite      # Banco de dados (não versionado)
│
└── README.md                # Este arquivo
```

## ⚙️ Como Executar

### Pré-requisitos
- Node.js 16.x ou superior
- NPM ou Yarn
- Conta no Discord Developer Portal

### Configuração do Bot Discord
1. Clone o repositório
2. Navegue até a pasta `discord-bot`
3. Crie um arquivo `.env` com o conteúdo:
   ```
   DISCORD_TOKEN=seu_token_do_discord_aqui
   ```
4. Instale as dependências:
   ```bash
   npm install
   ```
5. Execute o bot:
   ```bash
   npm run start
   ```

### Configuração da API NestJS
1. Navegue até a pasta `panterabot-api`
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute a API:
   ```bash
   npm run start:dev
   ```

## 🎮 Sistema de Gamificação

### Níveis
- **Nível 1**: Filhote de Pantera (0-100 XP)
- **Nível 2**: Pantera Aprendiz (101-200 XP)
- **Nível 3**: Pantera Tática (201-300 XP)
- E assim por diante...

### Como Ganhar XP
- Usar comandos do bot: 1 XP por comando
- Mais formas de ganhar XP serão implementadas

## 🌐 Endpoints da API

### Usuários
- `GET /api/users` - Lista todos os usuários
- `GET /api/users/:id` - Obtém um usuário pelo ID
- `GET /api/users/discord/:discordId` - Obtém um usuário pelo ID do Discord
- `POST /api/users` - Cria um novo usuário
- `PUT /api/users/:id` - Atualiza um usuário
- `DELETE /api/users/:id` - Remove um usuário
- `POST /api/users/:discordId/xp` - Adiciona XP a um usuário

## 📝 TODO

- [ ] Implementar sistema de missões
- [ ] Criar dashboard web com Next.js
- [ ] Adicionar mais comandos ao bot
- [ ] Implementar integração com redes sociais
- [ ] Desenvolver sistema de recompensas
- [ ] Criar visualizações para análise de dados dos fãs

## 📄 Licença

Este projeto é licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

---

Desenvolvido como parte do Desafio Técnico para a vaga de Assistente de Engenharia de Software na FURIA Tech.