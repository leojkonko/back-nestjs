<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# NestJS Users API

API RESTful para gerenciamento de usuários construída com NestJS, PostgreSQL (Prisma) e Redis para cache.

## Funcionalidades

- ✅ CRUD completo de usuários
- ✅ Cache Redis para otimização de performance
- ✅ Validação de dados com class-validator
- ✅ Banco PostgreSQL com Prisma ORM
- ✅ Arquitetura escalável e boas práticas

## Endpoints da API

### Usuários

- `POST /api/users` - Criar usuário
- `GET /api/users` - Listar todos os usuários
- `GET /api/users/:id` - Buscar usuário por ID
- `PATCH /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Remover usuário

## Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais do banco e Redis
```

## Setup do Banco de Dados

### Opção 1: Setup Automatizado (Recomendado)

**Windows (PowerShell):**
```bash
npm run setup:windows
```

**Linux/Mac (Bash):**
```bash
npm run setup:unix
```

### Opção 2: Setup Manual

```bash
# 1. Gerar cliente Prisma
npm run db:generate

# 2. Executar migrações
npm run db:migrate

# 3. Popular com dados de exemplo
npm run db:seed
```

### Opção 3: Setup com SQL Direto

Se preferir executar o SQL manualmente no PostgreSQL:

```bash
# Execute o script SQL no seu cliente PostgreSQL
psql -U postgres -d nestjs_users_db -f scripts/init-database.sql

# Ou use o script npm
npm run db:init
```

### Scripts de Banco Disponíveis

```bash
# Setup completo
npm run db:setup         # Gerar + migrar + popular

# Comandos individuais
npm run db:generate      # Gerar cliente Prisma
npm run db:migrate       # Executar migrações
npm run db:seed          # Popular com dados
npm run db:studio        # Abrir Prisma Studio
npm run db:reset         # Resetar banco completo

# Scripts de inicialização
npm run db:init          # Executar SQL direto
npm run setup:windows    # Setup automatizado (Windows)
npm run setup:unix       # Setup automatizado (Linux/Mac)
```

## Variáveis de Ambiente

```env
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://username:password@localhost:5432/nestjs_users_db?schema=public"
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev

# Build
npm run build

# Produção
npm start:prod

# Banco de dados
npm run db:migrate    # Executar migrações
npm run db:generate   # Gerar cliente Prisma
npm run db:seed       # Popular com dados de exemplo
npm run db:studio     # Abrir Prisma Studio
npm run db:reset      # Resetar banco

# Testes
npm test
npm run test:e2e
```

## Estrutura do Projeto

```
src/
├── users/
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── prisma/
│   └── prisma.service.ts
├── app.module.ts
└── main.ts
```

## Exemplo de Uso

### Criar usuário
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "João Silva", "email": "joao@email.com", "password": "123456"}'
```

### Listar usuários
```bash
curl http://localhost:3000/api/users
```

### Buscar usuário por ID
```bash
curl http://localhost:3000/api/users/1
```

## Tecnologias

- **NestJS** - Framework Node.js
- **PostgreSQL** - Banco de dados relacional
- **Prisma** - ORM para TypeScript
- **Redis** - Cache em memória
- **class-validator** - Validação de dados
- **class-transformer** - Transformação de dados

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
