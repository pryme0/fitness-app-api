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
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```

# Fitness+ Server

## Overview

The Fitness+ server is a backend application designed to manage memberships and invoices for a fitness club. It allows users to create memberships, add add-on services to their memberships, and generate invoices for payments.

## Entities

### Membership

The Membership entity represents a user's membership to the fitness club. It contains information such as the user's details, membership type, start date, due date, and whether it's the first month of the membership.

### Add-On Service

The Add-On Service entity represents additional services that users can add to their memberships, such as personal training or nutrition counseling. It contains information such as the service name and monthly amount.

### Invoice

The Invoice entity represents an invoice generated for a user's membership. It contains information such as the total cost, month, status, and details of the membership and add-on services associated with the invoice.

### Relationships

- A Membership can have multiple Add-On Services.
- An Add-On Service can be associated with multiple Memberships.
- An Invoice is associated with a single Membership and may include multiple Add-On Services.

## Cron Jobs

The server utilizes cron jobs to automate the generation of invoices and reminders for users. There are two main cron jobs:

- **Membership Reminder Cron Job**: This cron job runs daily to check for memberships that are due for payment. It sends reminder emails to users whose memberships are due soon, based on their membership type and whether it's the first month of their membership.

- **Add-On Service Reminder Cron Job**: This cron job runs daily to check for add-on services that are due for payment. It sends reminder emails to users whose add-on services are due soon, based on the service's billing cycle.

## Running the Server

To run the Fitness+ server locally, follow these steps:

1. Clone the repository from GitHub.
2. Install dependencies using `npm install`.
3. Set up the database connection in the `.env` file.
4. Run the server using `npm start`.

## API Documentation

For detailed API documentation, refer to the OpenAPI specification provided by Swagger. This can be accessed by hitting the `/docs` endpoint.

## Environment Variables

The following environment variables are required to run the Fitness+ server:

- `DB_HOST`: The hostname or IP address of the database server.
- `DB_PORT`: The port number on which the database server is running.
- `DB_USER`: The username to connect to the database.
- `DB_PASSWORD`: The password for the specified database user.
- `DATABASE_NAME`: The name of the database to connect to.
- `MAIL_PASSWORD`: app password created on google account
- `MAIL_USER`: your google email

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
