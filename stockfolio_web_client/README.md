# Stockfolio Web Client

Web Client for the SBS TTP assessment 2 challenge.

## Design & Style Guide

![Provided Style Guide](/public/style_guide.png)

## Pages (client routes)

| Page         | Route         |
| ------------ | ------------- |
| Root         | /             |
| Login        | /login        |
| Sign-Up      | /sign-up      |
| Transactions | /transactions |
| Portfolio    | /portfolio    |

## Libraries

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

## `npx create-react-app` boilerplate

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.
