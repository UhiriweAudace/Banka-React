import account from '../models/account';

const balanceCheck = async (req, res, next) => {
  const { amount } = req.body;

  // check if the provided account number exist
  const { rows } = await account.findOne(req.params.number);
  if (rows.length === 0) {
    return res.status(404).send({
      status: res.statusCode,
      error: 'Account Number Not found!',
    });
  }

  /**
   * check if the withdrawal amount is
   * greater than the current balance amount
  */
  const withdrawAmount = parseFloat(amount);
  if (withdrawAmount > parseFloat(rows[0].balance)) {
    return res.status(400).send({
      status: res.statusCode,
      error: 'insufficient balance!',
    });
  }
  return next();
};
export default balanceCheck;
