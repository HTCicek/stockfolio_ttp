# Stockfolio

**BLUF** pull it up with docker-compose

## Table of Contents

- [Motivation](#motivation)
- [Tech Stack](#tech-stack)
  - [Web Client](#web-client)
    - [Design & Style Guide](#design-&-style-guide)
    - [Web Client Libraries](#web-client-libraries)
  - [Backend Storage and Authentication Service](#backend-storage-and-authentication-service)
    - [Backend Libraries](#backend-libraries)
- [User Stories](#user-stories)
- [Prospective](#prospective)
  - [Client-side](#client)
  - [Service-side](#service)
- [Developer(s)](#developer-s-)

## Motivation

This was created for the SBS Tech Talent Pipeline 2nd round assessment.

## Tech Stack

Stockfolio is a React.js front end with a Ruby on Rails back end. The persistence layer is handled via the ActiveRecord ORM in Rails and SQLite.

### Web Client

Web Client built using React, bootstrapped with the create-react-app redux template.

#### Design & Style Guide

![Provided Style Guide](/stockfolio_web_client/public/style_guide.png)

##### Pages (client routes)

| Page         | Route         |
| ------------ | ------------- |
| Root         | /             |
| Login        | /login        |
| Sign-Up      | /sign-up      |
| Transactions | /transactions |
| Portfolio    | /portfolio    |

#### Web Client Libraries

- Redux
  - State management
- Styled-Components
  - Declarative component creation, and maintain
- React Router Dom
  - Used to define endpoints and switch pages
- Helmet?
  - Just to keep everything in one file?
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

## User Stories

- [ ] As a user, I want to create a new account with my name, email, and password so that I can buy and trade stocks.
  - [ ] Default the user's cash account balance to \$5_000.00 USD
  - [ ] A user can only register once with any given email.
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
