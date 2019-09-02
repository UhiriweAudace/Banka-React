import db from '../models/index';
import sGmail from '@sendgrid/mail';
import keys from '../config/keys';
class Email {

  async formatEmail(email, firstname, action, amount, newBalance, accountNumber) {
    await sGmail.send({
      to: email,
      from: "transactions-team@banka.co.rw",
      subject: "Deposit successed!",
      html: `Hi,There ${firstname},
              Thanks you for choosing our services!
              You have successfully ${action} ${amount} Rwf and
              Now You have ${newBalance} Rwf On Your Bank Account.
              Account N<u>o</u> ${accountNumber}.
        `
    });
  }
  async sendTransactionEmail(type, accountNumber, amount, newBalance) {
    const queryText = 'SELECT * FROM users INNER JOIN accounts ON accounts.account_number=$1 AND accounts.owner=users.id;';
    const { rows } = await db.query(queryText, [accountNumber]);

    const { email, firstname, account_number } = rows[0];

    sGmail.setApiKey(keys.SENDGRID_EMAIL_KEY);

    if (type === "Debit") {
      this.formatEmail(email, firstname, "Deposited", amount, newBalance, account_number)
        .then(() => console.log('email for deposit sent!'))
        .catch((err) => console.log(err));
    } else {
      this.formatEmail(email, firstname, "Withdrawn", amount, newBalance, account_number)
        .then(() => console.log('email for withdraw sent!'))
        .catch(() => console.log('error for withdrawing'));;
    }
  }
}
export default new Email();