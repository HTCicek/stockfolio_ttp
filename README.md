# Stockfolio

**BLUF** All you need is the docker-compose file! Find the docker images [here](https://hub.docker.com/repository/docker/htcicek/stockfolio_ttp), on dockerhub!

```sh
curl https://raw.githubusercontent.com/HTCicek/stockfolio_ttp/master/docker-compose-built.yml > docker-compose-built.yml

docker-compose -f docker-compose-built.yml up
```

Access web-client on `http://localhost:3000`

sign in with:

username: htcicek@email.com

password: 1234

or create your own

## Table of Contents

- [Motivation](#motivation)
- [Build](#build)
  - [docker-compose](#`docker-compose`)
  - [local](#local)
- [Tech Stack](#tech-stack)
  - [React Web Client](#react-web-client)
    - [Design & Style Guide](#design-&-style-guide)
    - [Web Client Libraries](#web-client-libraries)
  - [Backend Storage and Authentication Service](#backend-storage-and-authentication-service)
    - [Backend Libraries](#backend-libraries)
  - [Symbol Searching Service](#symbol-service)
- [User Stories](#user-stories)
- [Prospective](#prospective)
  - [Client-side](#client)
  - [Service-side](#service)
- [Developer(s)](#developer-s-)

## Motivation

This was created for the SBS Tech Talent Pipeline 2nd round assessment.

## Build

### `docker-compose`

```sh
docker-compose build && docker-compose up
```

access web client from `localhost:3000`

### local

#### Symbol service

```sh
cd ./stockfolio_symbol_service && bundle install
bundle exec ruby application.rb -p 4567 -s Puma -e production
```

#### Backend service

```sh
cd ./stockfolio_backend && bundle install && rails db:migrate
rails s -p 4000 -b '0.0.0.0'
```

#### Web Client

```sh
cd ./stockfolio_web_client && yarn install
yarn start -a localhost -p 3000
```

## Tech Stack

Stockfolio is a React.js front end with a Ruby on Rails back end. The persistence layer is handled via the ActiveRecord ORM in Rails and SQLite.

### React Web Client

Web Client built using React, bootstrapped with the create-react-app redux template.

#### Design & Style Guide

![Provided Style Guide](/web_client/public/style_guide.png)

##### Pages (client routes)

| Page         | Route         |
| ------------ | ------------- |
| Root         | /             |
| sign-in        | /sign-in        |
| Register      | /register      |
| Transactions | /transactions |
| Portfolio    | /portfolio    |

#### Web Client Libraries

- Redux
  - State management
- Material-UI
  - Composable UI Library
- React Router Dom
  - Used to define endpoints/switch pages
- react-helmet
  - html head management with JSX
- Sanitize.css
  - Normalization of CSS for support across all browsers
  - Opinionated removal of some silly margins and unintunitive defaults

### Backend Storage and Authentication Service

Backend service is built as a Rails API, documentation in ./stockfolio_backend

#### Backend Libraries

- Blueprinter
  - Serializing Models for front end consumption
  - Deserializing external api calls for model generation
- JWT
  - Secure tokens used for client authentication and authorization
- Faraday
  - HTTP Client used for abstraction of external API calls

### Symbol Service

Built using Sinatra. Pulls up-to-date symbol data from ftp.nasdaqtrader.com in order to provide a list of "real" tickers for a first-wave front-end validation. There is another validation on the backend layer when actually purchasing, but this allows for a better user experience.

## User Stories

- [x] As a user, I want to create a new account with my name, email, and password so that I can buy and trade stocks.
  - [x] Default the user's cash account balance to \$5_000.00 USD
  - [x] A user can only register once with any given email.
- [x] As a user, I want to authenticate via email and password so that I can access my account.
- [x] As a user, I want to buy shares of stock at its curent price by specifying its ticker symbol and the number of shares so that I can invest.
  - [x] A user can only buy whole number quantities of shares.
  - [x] A user can only buy shares if they have enough cash in their account for a given purchase
  - [x] A user can only buy shares if the ticker symbol is valid
- [x] As a user, I want to view a list of all transactions I've made to date (trades) so that I can perform an audit.
- [x] As a user, I want to view my portfolio (a list of all the stocks I own along with their current values) so that I can review performance
  - [x] Current values should be based on the latest price and quantity owned for a given stock
  - [x] Each stock owned should only appear once
- [x] As a user, I'd like to see the font color of stock symbols and current prices in my portfolio change dynamically to indicate performance.
  - [x] Display red when the current price is less that the day's open price
  - [x] Display grey when the current price is equal to the day's open price
  - [x] Display green when the current price is greater than the day's open price

## Prospective

Work that should be considered beyond the minimum viable product specs.

### Client

#### Bugs

- [x] On purchase, the purchase isn't reflected in either the transaction or portfolio panes until window reload

#### Portfolio

- [ ] Establish a socket connection to provide real-time ticker updates for the dynamic price color feature
- [ ] Provide an interface for users to add funds via the same back endpoint that updates user balance
- [ ] Provide an interface for users to liquidate their stock

### Backend API

#### Persistence

- [x] Implement PostgreSQL for production server

### Symbol Service API

#### Data Store

- [ ] Implement cron jobs using `whenever` to update the symbols list periodically
- [ ] Include current prices (expensive on the iexcloud api side)

## Developer(s)

Turcan Cicek
