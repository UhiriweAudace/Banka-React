import moment from 'moment';
import account from './account';
import db from './index';

class Transaction {
  async createCredit(data, accountNumber, cashierId) {
    const { amount } = data;
    const { rows } = await account.findOne(accountNumber);

    const balance = parseFloat(rows[0].balance) + parseFloat(amount);
    const creditTrans = {
      accountNumber: rows[0].account_number,
      accountId: rows[0].id,
      cashier: cashierId,
      transactionType: 'Credit',
      old_balance: rows[0].balance,
      new_balance: balance,
      createdOn: moment(new Date()),
    };

    const queryText = 'INSERT INTO transactions(account_number,account_id,cashier,transaction_type,old_balance,new_balance,amount,created_on)VALUES($1,$2,$3,$4,$5,$6,$7,$8)RETURNING*;';
    const values = [
      creditTrans.accountNumber,
      creditTrans.accountId,
      creditTrans.cashier,
      creditTrans.transactionType,
      creditTrans.old_balance,
      creditTrans.new_balance,
      amount,
      creditTrans.createdOn,
    ];
    const response = await db.query(queryText, values);
    return response;
  }

  async createDebit(data, userAccountNumber, cashierId) {

    const { rows } = await account.findOne(userAccountNumber);

    const balance = parseFloat(rows[0].balance) - parseFloat(data.amount);
    const debitTrans = {
      accountNumber: rows[0].account_number,
      accountId: rows[0].id,
      cashier: cashierId,
      transactionType: 'Debit',
      old_balance: rows[0].balance,
      new_balance: balance,
      createdOn: moment(new Date()),
    };
    const queryText = 'INSERT INTO transactions(account_number,account_id,cashier,transaction_type,old_balance,new_balance,created_on,amount)VALUES($1,$2,$3,$4,$5,$6,$7,$8)RETURNING*;';
    const values = [
      debitTrans.accountNumber,
      debitTrans.accountId,
      debitTrans.cashier,
      debitTrans.transactionType,
      debitTrans.old_balance,
      debitTrans.new_balance,
      debitTrans.createdOn,
      data.amount
    ];
    const response = await db.query(queryText, values);
    return response;
  }

  // @fetch all transactions by account number
  async fetchAll(accountNumber) {

    // fetch all accounts for the user who has that id
    const allTransactions = "SELECT transactions.id AS transactionId,transactions.amount AS amount ,transactions.created_on AS createdOn,transactions.transaction_type AS type,accounts.account_number AS accountNumber,transactions.old_balance AS oldBalance,transactions.new_balance AS newBalance FROM transactions INNER JOIN accounts ON transactions.account_id=accounts.id AND accounts.account_number=$1;";
    const result = await db.query(allTransactions, [accountNumber.toString()]);
    return result;
  }

  /**
  * @fetch one transaction by its ID
  */
  async fetchById(transId) {
    const specTrans = "SELECT transactions.id AS transactionId, transactions.amount AS amount,transactions.created_on AS createdOn, transactions.transaction_type AS type, accounts.account_number AS accountNumber, transactions.old_balance AS oldBalance, transactions.new_balance AS newBalance FROM transactions INNER JOIN accounts ON transactions.id = $1;";
    const response = await db.query(specTrans, [transId]);
    return response;
  }
}

export default new Transaction();
