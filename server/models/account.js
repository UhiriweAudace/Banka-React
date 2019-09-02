import moment from 'moment';
import db from './index';
import hash from '../helpers/Password';


class Account {

  //@fetch All bank accounts
  async fetchAllAccounts() {
    const queryText = "SELECT accounts.created_on AS createdOn,accounts.account_number AS accountNumber,users.email AS ownerEmail,accounts.type As type,accounts.status AS status,accounts.balance AS balance FROM accounts INNER JOIN users ON accounts.owner=users.id;";
    const response = await db.query(queryText);
    return response;
  }

  //@fetch all accounts which have status of active
  async fetchActive(active) {
    const activeAccounts = "SELECT accounts.created_on AS createdOn,accounts.account_number AS accountNumber,users.email AS ownerEmail,accounts.type As type,accounts.status AS status,accounts.balance AS balance FROM accounts INNER JOIN users ON accounts.owner=users.id AND accounts.status=$1;";
    const result = await db.query(activeAccounts, [active]);
    return result;
  }
  //@fetch all accounts which have status of dormant
  async fetchDormant(dormant) {
    const dormantAccounts = "SELECT accounts.created_on AS createdOn,accounts.account_number AS accountNumber,users.email AS ownerEmail,accounts.type As type,accounts.status AS status,accounts.balance AS balance FROM accounts INNER JOIN users ON accounts.owner=users.id AND accounts.status=$1;";
    const result = await db.query(dormantAccounts, [dormant]);
    return result;
  }

  //@fetch One accounts with it's details
  async fetchOne(accountNumber) {
    const account = "SELECT accounts.created_on AS createdOn,accounts.account_number AS accountNumber,users.email AS ownerEmail,accounts.type As type,accounts.status AS status,accounts.balance AS balance FROM accounts INNER JOIN users ON accounts.owner=users.id AND accounts.account_number=$1;";
    const result = await db.query(account, [accountNumber]);
    return result;
  }

  // @User fetch all bank accounts based on email
  async fetchAllByEmail(email) {

    // fetch all accounts for the user who has that email
    const allAccount = "SELECT accounts.created_on AS createdOn,accounts.account_number AS accountNumber,accounts.type As type,accounts.status AS status,accounts.balance AS balance FROM accounts INNER JOIN users ON accounts.owner=users.id AND users.email=$1;";
    const result = await db.query(allAccount, [email]);
    return result;
  }

  async create(data, owner) {
    const { type, status } = data;

    const initialBalance = 0.00;
    const accountStatus = status || 'active'
    const newAcc = {
      ownerId: owner,
      accountNumber: Math.floor(100000 + Math.random() * 90000000),
      type,
      balance: initialBalance,
      status: accountStatus,
      created_on: moment(new Date()),
    };
    const queryText = 'INSERT INTO accounts(account_number,owner,type,balance,status,created_on)VALUES($1,$2,$3,$4,$5,$6)RETURNING*';
    const values = [newAcc.accountNumber, newAcc.ownerId, newAcc.type, newAcc.balance, newAcc.status, newAcc.created_on];
    const response = await db.query(queryText, values);
    return response;
  }

  //@create a staff
  async createStaff(request) {
    const { firstname, lastname, email, password, isAdmin, isCashier } = request;
    const hashedPwd = await hash.hashPassword(password, 10);
    const newUser = {
      firstname: firstname.toLowerCase(),
      lastname: lastname.toLowerCase(),
      email: email.toLowerCase(),
      hashedPwd,
      type: 'staff',
      isAdmin: false || isAdmin,
      isCashier: isCashier || false,
      created_on: moment(new Date()),
    };

    // pushing our new users to the database
    const queryText = 'INSERT INTO users(firstname,lastname,email,password,type,is_admin,is_cashier,created_on)VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING*';
    const values = [
      newUser.firstname,
      newUser.lastname,
      newUser.email,
      newUser.hashedPwd,
      newUser.type,
      newUser.isAdmin,
      newUser.isCashier,
      newUser.created_on,
    ];
    const result = await db.query(queryText, values);
    return result;
  }


  // @User fetch all bank accounts
  async fetchAll(userId) {

    // fetch all accounts for the user who has that id
    const queryText = 'SELECT * FROM accounts WHERE owner=$1;';
    const response = await db.query(queryText, [parseInt(userId, 10)]);
    return response;
  }

  async findOne(accountNumber) {
    const queryText = 'SELECT * FROM accounts WHERE account_number=$1;';
    const response = await db.query(queryText, [accountNumber]);
    return response;
  }

  async findAccountDetails(accountNumber, userId) {
    console.log('hajjhjhjnoee hanooooo')
    const queryText = 'SELECT accounts.account_number AS accountNumber,accounts.created_on As createdOn,accounts.type As type,accounts.status AS status,accounts.balance AS balance,users.email AS ownerEmail FROM accounts INNER JOIN users ON accounts.account_number=$1 AND users.id=accounts.owner AND users.id=$2;';
    const response = await db.query(queryText, [accountNumber, parseInt(userId)]);
    return response;
  }

  async searchOne(accountNumber, userId) {
    const queryText = 'SELECT * FROM accounts WHERE owner=$1 AND account_number=$2;';
    const response = await db.query(queryText, [parseInt(userId, 10), accountNumber]);
    return response;
  }

  async updateOne(accountNumber, data) {
    const { rows } = await this.findOne(accountNumber);

    const type = data.type || rows[0].type;
    const status = data.status || rows[0].status;
    const modifiedOn = moment(new Date());

    const queryText = 'UPDATE accounts SET status=$1,type=$2,modified_on=$3 WHERE account_number=$4 RETURNING*;';
    const response = await db.query(queryText, [status, type, modifiedOn, rows[0].account_number]);
    return response;
  }

  async updateBalance(accountNumber, newBalance) {
    const { rows } = await this.findOne(accountNumber);
    const queryText = 'UPDATE accounts SET balance=$1 WHERE account_number=$2 RETURNING*;';
    const response = await db.query(queryText, [parseFloat(newBalance), rows[0].account_number]);
    return response;
  }

  async deleteOne(accountNumber) {
    const { rows } = await this.findOne(accountNumber);

    //@delete first, all transactions done on that account_number
    await db.query('DELETE FROM transactions WHERE account_number=$1;', [rows[0].account_number]);
    const queryText = 'DELETE FROM accounts WHERE account_number=$1';
    const response = await db.query(queryText, [rows[0].account_number]);
    return response;
  }
}
export default new Account();
