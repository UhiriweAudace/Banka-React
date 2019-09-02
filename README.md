# Banka
[![Build Status](https://travis-ci.com/UhiriweAudace/Banka.svg?branch=develop)](https://travis-ci.com/UhiriweAudace/Banka) [![Maintainability](https://api.codeclimate.com/v1/badges/9bd7be21f0669b74f5f7/maintainability)](https://codeclimate.com/github/UhiriweAudace/Banka/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/9bd7be21f0669b74f5f7/test_coverage)](https://codeclimate.com/github/UhiriweAudace/Banka/test_coverage)

Banka is a light-weight core banking application that powers banking operations like account
creation, customer deposit and withdrawals. This app is meant to support a single bank, where
users can signup and create bank accounts online, but must visit the branch to withdraw or
deposit money..

* [Hosted UI Template](https://uhiriweaudace.github.io/Banka/UI/index.html)
* [Hosted API](https://api-banka-app.herokuapp.com/)

### Getting Started
To get the project up and running on your local machine, please follow these instructions.

* Cloning this project, by running this command in your terminal:
```
git clone https://github.com/UhiriweAudace/Banka.git
```

* Navigate into Banka folder. by simply run this command in your terminal:
```
cd Banka
```

* Install the required dependencies found in package.json by running this command:
```
npm install
```

* And then to start running this project in your local machine, run this command:
```
npm start
```

* And then to run test, run this command:
```
npm test
```

### Required Features
* User (client) can sign up.
* User (client) can login.
* User (client) can create an account.
* User (client) can view account transaction history.
* User (client) can view a specific account transaction.
* Staff (cashier) can debit user (client) account.
* Staff (cashier) can credit user (client) account.
* Admin/staff can view all user accounts.
* Admin/staff can view a specific user account.
* Admin/staff can activate or deactivate an account.
* Admin/staff can delete a specific user account.
* Admin can create staff and admin user accounts.

### Optional Features
* User can reset password.
* Integrate real time email notification upon credit/debit transaction on user account.
* User can upload a photo to their profile.

## Technologies

### Frontend
  - HTML
  - CSS
  - Javascript

### Backend
  - NodeJs
  - Express JS
  - Mocha
  - Chai

## Endpoints

| HTTP Method | Endpoints                           | Access  | Description                        |
|-------------|-------------------------------------|---------|------------------------------------|
| POST        |  /api/v1/auth/signup                | Public  | Create user account                |
| POST        | /api/v1/auth/login                  | Public  | Login a user                       |
| POST        | /api/v1/accounts                    | Private | Create a bank account              |
| PATCH       | /api/v1/account/:number             | Private | Activate or deactivate an account  |
| DELETE      | /api/v1/accounts/:number            | Private | Delete a specific bank account.    |
| POST        | /api/v1/transactions/:number/debit  | Private | Debit a bank account.              |
| POST        | /api/v1/transactions/:number/credit | Private | Credit a bank account.             |
| GET         | /api/v1/account/user/:user-id       | Private | all bank accounts for a specif user.|   
| GET         | /api/v1/accounts                    | Private | View all client/users bank accounts.|
| GET         | /api/v1/accounts?status=active      | Private | View all client's active bank accounts.|
| GET         | /api/v1/user/:email/accounts| Private | Admin can view all accounts owned by a specific user.|
| GET         | /api/v1/accounts?status=dormant     | Private | Admin can View all client's dormant bank accounts|
| GET         | /api/v1/accounts/:number    | Private | User can view a specific bank accounts details.|
| GET         | /api/v1/accounts/:number/transactions| Private | User can view a specific bank accounts details.|

`:number means account-number`

#### Linter

* [ESLint](https://eslint.org/) - Linter Tool

### Style Guide
* [Airbnb](https://github.com/airbnb/javascript) - Airbnb maintains a very popular JavaScript Style Guide

#### Compiler

* [Babel](https://eslint.org/) - Compiler for Next Generation JavaScript.

## Pivotal Tracker

Project is currently being managed with Pivotal Tracker, a project management tool. You can find the stories on the [Banka Pivotal Tracker Board](https://www.pivotaltracker.com/n/projects/2326022)

## API Documentation

- click on below Link to read the API documentation
    [API Documentation](https://bankaapidocumentation.docs.apiary.io/#)

## License

This project is licensed under the MIT License

## Author

* **Audace Uhiriwe**  - [Banka App](https://github.com/UhiriweAudace/Banka)
