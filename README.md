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

This is a RESTful API for user management built with NestJS, PostgreSQL (using Prisma ORM), and Redis for caching.

## Features

-   ✅  Complete User CRUD operations
-   ✅  Redis Cache for performance optimization
-   ✅  Data validation with `class-validator`
-   ✅  PostgreSQL database with Prisma ORM
-   ✅  Scalable architecture and best practices applied

## Technologies Used

-   **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
-   **PostgreSQL**: A powerful, open-source relational database system.
-   **Prisma**: A next-generation ORM for Node.js and TypeScript.
-   **Redis**: An open-source, in-memory data structure store used as a cache.
-   **class-validator**: A library for declarative validation of DTOs.
-   **class-transformer**: A library for transforming plain objects to class instances.

## API Endpoints

### Users

-   `POST /api/users` - Create a new user
-   `GET /api/users` - Retrieve a list of all users
-   `GET /api/users/:id` - Retrieve a single user by ID
-   `PATCH /api/users/:id` - Update specific fields of a user by ID
-   `DELETE /api/users/:id` - Delete a user by ID

## Getting Started

### Prerequisites

Ensure you have the following installed:

-   Node.js (LTS version recommended)
-   npm or Yarn
-   PostgreSQL
-   Redis

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd back-nestjs
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file by copying the example:
    ```bash
    cp .env.example .env
    ```
    Then, edit the `.env` file with your database and Redis credentials.

    ```env
    NODE_ENV=development
    PORT=3000
    DATABASE_URL="postgresql://username:password@localhost:5432/nestjs_users_db?schema=public"
    REDIS_HOST=localhost
    REDIS_PORT=6379
    REDIS_PASSWORD=
    ```

## Database Setup

You have a few options to set up your database:

### Option 1: Automated Setup (Recommended)

This script will generate the Prisma client, run migrations, and seed the database with example data.

**Windows (PowerShell):**
```bash
npm run setup:windows
```

**Linux/Mac (Bash):**
```bash
npm run setup:unix
```

### Option 2: Manual Setup

If you prefer a step-by-step manual setup:

1.  **Generate Prisma Client:**
    ```bash
    npm run db:generate
    ```

2.  **Execute Migrations:**
    ```bash
    npm run db:migrate
    ```

3.  **Seed with Example Data:**
    ```bash
    npm run db:seed
    ```

### Option 3: Direct SQL Setup

If you prefer to execute SQL directly:

Execute the `scripts/init-database.sql` file using your PostgreSQL client:
```bash
psql -U postgres -d nestjs_users_db -f scripts/init-database.sql
```
Alternatively, use the npm script:
```bash
npm run db:init
```

## Running the Application

### Development Mode

Starts the application in watch mode, recompiling on changes.
```bash
npm run start:dev
```

### Production Mode

Builds the application and starts it in production mode.
```bash
npm run build
npm run start:prod
```

The application will be running on `http://localhost:3000/api`.

## Running Tests

### Unit Tests
```bash
npm test
```

### End-to-End Tests
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:cov
```

## Project Structure

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

## Usage Examples

Here are some `curl` examples to interact with the API:

### Create User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john.doe@example.com"}'
```

### List Users
```bash
curl http://localhost:3000/api/users
```

### Get User by ID
```bash
curl http://localhost:3000/api/users/1
```

### Update User
```bash
curl -X PATCH http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe"}'
```

### Delete User
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

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
