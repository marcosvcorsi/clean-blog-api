# Clean Blog API

![CI](https://github.com/marcosvcorsi/clean-blog-api/workflows/CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/marcosvcorsi/clean-blog-api/badge.svg?branch=main)](https://coveralls.io/github/marcosvcorsi/clean-blog-api?branch=main)

## Sobre

Projeto criado baseado no curso de Node.js do Mango na Udemy, alterado algumas funcionalidades, 
mantendo apenas o cadastro de usuário e autenticação conforme curso. Utilizado a mesma estrutura de Clean
Architecture, TDD, SOLID, para práticar as métodologias passadas. Mudei a implementação para um banco relacional 
e um ORM (PostgreSQL/SQLite e TypeORM), junto com envio de e-mail (Nodemailer) e cache (Redis).

---

## O que o projeto faz?

- Criação e autenticação de Usuaŕio
- Criação e listagem das postagens do usuário

---

## Tecnologias

- [Node.js](https://nodejs.org/en/)

- [Typescript](https://www.typescriptlang.org/)

- [Express](https://expressjs.com/pt-br/)

- [TypeORM](https://typeorm.io/#/)

- [Jest](https://jestjs.io/)

---

## Download e instalação:

```bash
# Baixando o projeto
git clone https://github.com/marcosvcorsi/clean-blog-api.git

# Acessando a pasta
$ cd clean-blog-api

# Instalando as dependencias
# Com Yarn
$ yarn
```

Todos os arquivos de váriaveis de ambientes estão presentes no repositório,
se necessário, crie o seu de acordo com o .env.example. Os arquivo de conexão
com o banco está anexado ao repositório, com a conexão padrão e de teste.

## Execução

```
# Ambiente de desenvolvimento
$ yarn dev

# Testes de integração e unitários
$ yarn test

# Build para produção(TS para JS)
$ yarn build

# Execução em produção
$ yarn start
```
