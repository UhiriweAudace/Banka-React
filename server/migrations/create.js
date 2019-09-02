// Bring In my connection to the database to be used
import pool from './index';

pool.on('connect', () => {
  // console.log('Now Our Banka app is connected to the Database successfully!')
});

const queryText = `
                CREATE TABLE IF NOT EXISTS users(
                  id SERIAL PRIMARY KEY,
                  firstname VARCHAR(128) NOT NULL,
                  lastname VARCHAR(128) NOT NULL,
                  email VARCHAR(128) NOT NULL,
                  password VARCHAR(255) NOT NULL, 
                  type VARCHAR(255) NOT NULL,
                  is_admin BOOLEAN DEFAULT false,
                  is_cashier BOOLEAN DEFAULT false,
                  created_on TIMESTAMP,
                  modified_on TIMESTAMP DEFAULT NULL);

                 CREATE TABLE IF NOT EXISTS accounts(
                  id SERIAL PRIMARY KEY,
                  account_number BIGINT UNIQUE NOT NULL,
                  owner INTEGER REFERENCES users(id) NOT NULL,
                  type VARCHAR(255) NOT NULL,
                  status VARCHAR(255) NOT NULL,
                  balance FLOAT NOT NULL,
                  created_on TIMESTAMP,
                  modified_on TIMESTAMP DEFAULT NULL);

                CREATE TABLE IF NOT EXISTS transactions(
                  id SERIAL PRIMARY KEY,
                  transaction_type VARCHAR(255) NOT NULL,
                  account_number BIGINT NOT NULL,
                  account_id INTEGER REFERENCES accounts(id) NOT NULL,
                  cashier INTEGER REFERENCES users(id) NOT NULL,
                  old_balance FLOAT NOT NULL,
                  new_balance FLOAT NOT NULL,
                  amount FLOAT NOT NULL,
                  created_on TIMESTAMP);
`;

// @creating the tables into the database
pool.query(queryText)
  .then(() => {
    // console.log("tables created successfully!")
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = pool;
