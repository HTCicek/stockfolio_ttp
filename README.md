# Stockfolio

**BLUF** Image is on dockerhub

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

![Provided Style Guide](/stockfolio_web_client/public/style_guide.png)

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

- jsonapi.rb
  - Serializing Models for front end consumption
  - Deserializing external api calls for model generation
- JWT
  - Secure tokens used for client authentication and authorization
- Faraday
  - HTTP Client used for abstraction of external API calls
- Money
  - Library to safely parse and work with currency

### Symbol Service

Built using Sinatra. Pulls up-to-date symbol data from ftp.nasdaqtrader.com in order to provide a list of "real" tickers for a first-wave front-end validation. There is another validation on the backend layer when actually purchasing, but this allows for a better user experience.

## User Stories

- [ ] As a user, I want to create a new account with my name, email, and password so that I can buy and trade stocks.
  - [x] Default the user's cash account balance to \$5_000.00 USD
  - [x] A user can only register once with any given email.
- [ ] As a user, I want to authenticate via email and password so that I can access my account.
- [ ] As a user, I want to buy shares of stock at its curent price by specifying its ticker symbol and the number of shares so that I can invest.
  - [ ] A user can only buy whole number quantities of shares.
  - [ ] A user can only buy shares if they have enough cash in their account for a given purchase
  - [ ] A user can only buy shares if the ticker symbol is valid
- [ ] As a user, I want to view a list of all transactions I've made to date (trades) so that I can perform an audit.
- [ ] As a user, I want to view my portfolio (a list of all the stocks I own along with their current values) so that I can review performance
  - [ ] Current values should be based on the latest price and quantity owned for a given stock
  - [ ] Each stock owned should only appear once
- [ ] As a user, I'd like to see the font color of stock symbols and current prices in my portfolio change dynamically to indicate performance.
  - [ ] Display red when the current price is less that the day's open price
  - [ ] Display grey when the current price is equal to the day's open price
  - [ ] Display green when the current price is greater than the day's open price

## Prospective

Work that should be considered beyond the minimum viable product specs.

### Client

#### Portfolio

- [ ] Establish a socket connection to provide real-time ticker updates for the dynamic price color feature
- [ ] Provide an interface for users to add funds via the same back endpoint that updates user balance
- [ ] Provide an interface for users to liquidate their stock

### Service

#### Persistence

- [ ] Implement PostgreSQL for production server

## Developer(s)

Turcan Cicek
