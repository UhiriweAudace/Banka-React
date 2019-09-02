import model from '../models/transaction';
import account from '../models/account';
import email from '../emailTemplate/email';
import validation from '../validations/transactionValidation';

class Transactions {
  // @Withdrawing Money
  static async creditTransaction(req, res) {
    try {
      // check if there's an error in our request sent
      const { error } = validation.transactionAmount(req.body);
      if (error) {
        return res.status(400).send({
          status: res.statusCode,
          error: error.details[0].message,
        });
      }

      //@check the amount to be credit
      if (parseFloat(req.body.amount) < 0) return res.status(400).send({
        status: res.statusCode,
        error: "You can't deposit the amount which is less than zero"
      })

      const cashierId = req.user.id;
      const { number } = req.params;
      const accFound = await account.findOne(number);

      const { rows } = await model.createCredit(req.body, number, cashierId);
      rows[0].deposited_amount = parseFloat(req.body.amount);

      // @update the account balance with the newBalance
      const newBalance = parseFloat(accFound.rows[0].balance) + parseFloat(req.body.amount);
      await account.updateBalance(number, newBalance);

      //@send a notification to the user's email
      const { new_balance, transaction_type } = rows[0];
      await email.sendTransactionEmail(transaction_type, number, req.body.amount, new_balance);

      return res.status(200).send({
        status: res.statusCode,
        message: 'Credit Operation Successed!',
        data: rows[0],
      });
    } catch (error) {
      console.log({ error: error.message })
    }
  }

  // @deposit or debit money
  static async debitTransaction(req, res) {
    try {
      // check if there's an error in our request sent
      const { error } = validation.transactionAmount(req.body);
      if (error) {
        return res.status(400).send({
          status: res.statusCode,
          error: error.details[0].message,
        });
      }

      //@check the amount to be debit
      if (parseFloat(req.body.amount) < 0) return res.status(400).send({
        status: res.statusCode,
        error: "You can't withdraw the amount which is less than zero"
      });

      const { number } = req.params;
      const accFound = await account.findOne(number);
      if (accFound.rows.length === 0) return res.status(400).send({
        status: res.statusCode,
        error: 'Wrong Account Number!.',
      });

      const { rows } = await model.createDebit(req.body, parseInt(number, 10), req.user.id);
      rows[0].amount_withdrawal = parseFloat(req.body.amount);

      // @update the account balance with the newBalance
      const newBalance = `${parseFloat(accFound.rows[0].balance) - parseFloat(req.body.amount)}`;
      await account.updateBalance(number, newBalance);

      //@send a notification to the user's email
      await email.sendTransactionEmail(rows[0].transaction_type, number, req.body.amount, rows[0].new_balance);

      return res.status(200).send({
        status: res.statusCode,
        message: 'Debit Operation Successed!',
        data: rows[0],
      });
    } catch (error) {
      console.log({ error: error.message })
    }
  }

  /**
 * @fetch transactions by its ID
 */
  static async getOneTransaction(req, res) {
    try {
      const { id } = req.params;
      const { rows } = await model.fetchById(id);
      if (rows.length === 0) return res.status(404).send({
        status: res.statusCode,
        error: "No Transaction details found!"
      });

      let oneTransaction = [];
      rows.forEach(element => {
        let transDetails = {
          "transactionId": element.transactionid,
          "createdOn": element.createdon,
          "type": element.type,
          "accountNumber": parseInt(element.accountnumber),
          "amount": element.amount,
          "oldBalance": element.oldbalance,
          "newBalance": element.newbalance
        }
        oneTransaction.push(transDetails);
      });
      res.status(200).send({
        status: res.statusCode,
        data: oneTransaction[0]
      });
    } catch (error) {
      console.log({ error: error.message });
    }
  }
}
export default Transactions;
