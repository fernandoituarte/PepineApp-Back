<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

# 📚 Project: Pepine Nest

### Description
**Pepine Nest** is a backend application developed in **NestJS** that provides a robust and scalable API for managing `specific functionality of your application`. This project includes JWT authentication, email handling, and straightforward integration with databases using TypeORM.

### Table of Contents
1. [Features](#features)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Usage](#usage)
6. [API Documentation](#api-documentation)
7. [Docker](#docker)
8. [Available Scripts](#available-scripts)

---

### Features
- **Authentication**: Support for JWT and Passport for user authentication.
- **Email Management**: Integration with Nodemailer for sending emails.
- **Database**: Support for PostgreSQL through TypeORM.
- **Validation and Transformation**: Use of `class-validator` and `class-transformer` for data handling.
- **API Documentation**: Automatic documentation generation using Swagger.

---

### Requirements

- **Node.js** v14 or higher
- **NestJS CLI** (optional, for development)
- **Docker** and **Docker Compose** (to run the database)

---

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/fernandoituarte/PepineApp-Back.git
   cd PepineApp-Back
   ```

2. **Install the dependencies**

   ```bash
   npm install
   ```

3. **Configure the environment variables**

   Create a `.env` file in the root of the project and add your environment variables:

   ```env
    PORT=
    NODE_ENV=development
    DB_PASSWORD=your_password
    DB_NAME=your_database_name
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=your_username
    HOST_NAME=http://localhost:3000
    URL_FRONT=http://localhost:3001
    COOKIE_DOMAIN=localhost
    JWT_SECRET=your_jwt_secret
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=465
    SMTP_USER=your_email@gmail.com
    SMTP_PASS=your_email_password
    SMTP_FROM='"No Reply" <your_email@gmail.com>'
    RESET_PASSWORD_URL=http://localhost:3001/auth/reset-password
   ```

---

### Docker

To create and run the PostgreSQL database, use the following `docker-compose.yml` file:

```yaml
version: '3'

services:
  db:
    image: postgres:14.3
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    container_name: pepinedb
    volumes:
      - ./postgres:/var/lib/postgresql/data
```

#### Steps to Run Docker

1. Make sure you have **Docker** and **Docker Compose** installed on your machine.
2. Create a `docker-compose.yml` file in the root of the project and paste the content above.
3. In the terminal, run the following command to start the database:

   ```bash
   docker-compose up -d
   ```

4. To stop the database container, run:

   ```bash
   docker-compose down
   ```

---

### Usage

To start the development server:

```bash
npm run start:dev
```

The application will be running at [http://localhost:3000](http://localhost:3000).

---

### API Documentation

The API has interactive documentation via **Swagger**. Access it at:

```
http://localhost:3000
```

To populate the database with initial data, you can make a GET request to "/seed". This can be done directly in your browser or through a tool like Postman or Swagger.

---

### Available Scripts

- `npm run build` - Compiles the application.
- `npm run start` - Starts the application in production mode.
- `npm run start:dev` - Starts the application in development mode.
- `npm run lint` - Runs the linter to check code style.


