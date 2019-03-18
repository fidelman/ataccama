# Ataccama Test

[DEMO](https://ataccama-test.herokuapp.com/)

## Contents
- [Development](#development)
- [CI/CD](#cicd)

## Development
### Install Dependencies
```
npm i
```
P.S Use NPM instead of yarn. Heroku supports only one lock file, which was chosen package-lock from NPM. Thank you for understanding.

### Commands
- Run dev server `npm start`
- Run Unit tests `npm t`
- Run e2e tests in browser `npm run cypress`
- Run e2e in console `npm run e2e`

### File Structure
The boilerplate was extended from [create-react-app](https://github.com/facebook/create-react-app)
- cypress - Files for Testing with [Cypress.io](https://www.cypress.io)
- .circleci - Setting for Circle CI
- public/db.json - local copy of the data base
- src - Source code of the App
  - components
    - common - Reusable Components
    - pages - Components for Pages (It is only one in the current case)
    - ... - specific gourped components
  - ducks - Action Creators / Reducers and so on. Following [Redux Ducks](https://github.com/erikras/ducks-modular-redux)
  - redux - Setting Redux store
  - services - Services like API connection
  - utilities - helper functions
  - App.js - Root Component
  - config.js - Setting for App
  - index.js - Entry point

## CICD
- There is _pre-commit_ hook, which runs prettier.
- Master branch is connected to the [PROD env](https://ataccama-test.herokuapp.com/) via Heroku.
- Circle CI is set for pull requests, which checks e2e tests.