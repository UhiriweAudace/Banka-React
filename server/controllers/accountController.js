import _ from 'lodash';
import model from '../models/account';
import users from '../models/users';
import transaction from '../models/transaction';
import validation from '../validations/accountValidation';
import validations from '../validations/authValidation';
import generate from '../helpers/Token';

class Accounts {

  //@Get all bank accounts
  //@Get all bank accounts which have status of "Dormant"
  //@Get all bank accounts which have status of being "Active"
  static async getAllAccount(req, res) {
    try {
      if (req.query.status === 'active') {
        const active = req.query.status;
        const { rows } = await model.fetchActive(active);

        return res.status(200).send({
          status: res.statusCode,
          message: "List of all Active bank accounts fetched",
          data: rows
        })
      }

      if (req.query.status === 'dormant') {
        const dormant = req.query.status;
        const { rows } = await model.fetchDormant(dormant);
        return res.status(200).send({
          status: res.statusCode,
          message: "List of all Dormant bank accounts fetched",
          data: rows
        })
      }

      if (req.user.is_admin === true) {
        const { rows } = await model.fetchAllAccounts();

        //@making the response as It is expected to be
        let allAccounts = [];
        rows.forEach(element => {
          let accountDetail = {
            "createdOn": element.createdon,
            "accountNumber": parseInt(element.accountnumber),
            "ownerEmail": element.owneremail,
            "type": element.type,
            "status": element.status,
            "balance": element.balance,
          };

          allAccounts.push(accountDetail);
        });

        return res.status(200).send({
          status: res.statusCode,
          message: "All users bank accounts so far",
          data: allAccounts
        });
      }
    } catch (error) {
      console.log({ error: error.message })
    }
  }

  //@Get User's all bank accounts based on personal email
  static async getAccountByEmail(req, res) {
    try {

      const email = req.params.email.toLowerCase();

      // find that user by his/her id
      const foundUser = await users.findOne(email);

      if (!foundUser.rows[0]) return res.status(404).send({
        status: res.statusCode,
        error: 'User with this email not found!',
      });

      const { rows } = await model.fetchAllByEmail(email);
      if (!rows[0]) return res.status(404).send({
        status: res.statusCode,
        error: 'No Accounts for this User!',
      });

      //@making the response as It is expected to be
      let userAllAccounts = [];
      rows.forEach(element => {
        let userAccounts = {
          "createdOn": element.createdon,
          "accountNumber": parseInt(element.accountnumber),
          "type": element.type,
          "status": element.status,
          "balance": element.balance,
        };

        userAllAccounts.push(userAccounts);
      });

      res.status(200).send({
        status: res.statusCode,
        message: 'Here is All your bank accounts!',
        accounts: userAllAccounts,
      });
    } catch (error) {
      console.log({ error: error.message })
    }
  }

  //@Get One specific account
  static async getOneAccount(req, res) {
    try {
      const accNumber = parseInt(req.params.number, 10);

      // find that the account number
      const foundAccount = await model.findOne(accNumber);
      if (!foundAccount.rows[0]) {
        return res.status(404).send({
          status: res.statusCode,
          error: 'Account Number Not found!',
        });
      }

      //@find the details of the bank account which is for that user who logged in
      const { rows } = await model.findAccountDetails(accNumber, parseInt(req.user.id));
      if (!rows[0]) {
        return res.status(404).send({
          status: res.statusCode,
          error: 'Sorry, You are only allowed to view the details of your own bank account',
        });
      }

      //@making the response as It is expected to be
      let userAccounts = [];
      rows.forEach(element => {
        let accountDetails = {
          "createdOn": element.createdon,
          "accountNumber": parseInt(element.accountnumber),
          "ownerEmail": element.owneremail,
          "type": element.type,
          "status": element.status,
          "balance": element.balance,
        };

        userAccounts.push(accountDetails);
      });

      return res.status(200).send({
        status: res.statusCode,
        message: "Here is Account Details!",
        data: userAccounts[0]
      });

    } catch (error) {
      console.log({ error: error.message })
    }
  }

  //@Get all transactions for a specific account number
  static async getTransactions(req, res) {
    try {
      const { number } = req.params;

      const foundedAcc = await model.findOne(number);
      if (!foundedAcc.rows[0]) return res.status(404).send({
        status: res.statusCode,
        error: 'Account Not found!',
      });
      const userAcc = await model.searchOne(foundedAcc.rows[0].account_number, req.user.id);
      if (!userAcc.rows[0]) return res.status(400).send({
        status: res.statusCode,
        error: 'You are Only Allowed to view your own account transaction history',
      });
      const { rows } = await transaction.fetchAll(userAcc.rows[0].account_number);
      if (!rows[0]) return res.status(404).send({
        status: 404,
        error: 'No transactions found for this account!',
      });

      //console.log(rows)
      let allTransactions = [];
      rows.forEach(element => {
        let result = {
          "transactionId": element.transactionid,
          "createdOn": element.createdon,
          "type": element.type,
          "accountNumber": parseInt(element.accountnumber),
          "amount": element.amount,
          "oldBalance": element.oldbalance,
          "newBalance": element.newbalance
        }
        allTransactions.push(result)
      });

      res.status(200).send({
        status: res.statusCode,
        message: "Here's Your transactions!",
        data: allTransactions
      });

    } catch (error) {
      console.log({ error: error.message });

    }
  }

  //@Get all bank accounts which have status of being "Active"
  static async getActiveAccounts(req, res) {
    try {
      //console.log(req.query)
      const active = req.query.status;
      const { rows } = await model.fetchActive(active);
      return res.status(200).send({
        status: res.statusCode,
        message: "List of all Active bank accounts fetched",
        data: rows
      })
    } catch (error) {
      console.log({ error: error.message })
    }
  }
  //@Get all bank accounts which have status of "Dormant"
  static async getDormantAccounts(req, res) {
    try {
      const dormant = req.query.status;
      const { rows } = await model.fetchDormant(dormant);
      return res.status(200).send({
        status: res.statusCode,
        message: "List of all Dormant bank accounts fetched",
        data: rows
      })
    } catch (error) {
      console.log({ error: error.message })
    }
  }

  // @Get User's all bank accounts
  static async getAccounts(req, res) {
    try {
      const userId = parseInt(req.params.id, 10);

      // find that user by his/her id
      const foundUser = await users.findById(userId);

      if (foundUser.rows.length === 0) return res.status(404).send({
        status: res.statusCode,
        error: 'User with this ID not found!',
      });

      const { rows } = await model.fetchAll(foundUser.rows[0].id);
      return res.status(200).send({
        status: res.statusCode,
        message: 'Here is All your bank accounts!',
        data: rows,
      });
    } catch (error) {
      console.log({ error: error.message })
    }
  }

  //@create staff
  static async createStaffs(req, res) {
    // check if there's an error in our request sent
    const { error } = validations.signup(req.body);
    if (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: error.details[0].message,
      });
    }

    // check if the provided email is registered before
    // const found = await model.findOne(req.body.email);
    // if (found.rows.length !== 0) {
    //   return res.status(400).send({
    //     status: res.statusCode,
    //     error: 'This e-mail is already registered!',
    //   });
    // }

    // create a new user and return user data includes token
    const { rows } = await model.createStaff(req.body);
    const token = generate.getToken(_.pick(rows[0], [
      'id',
      'firstname',
      'lastname',
      'email',
      'type',
      'is_admin',
      'is_cashier',
      'created_at',
    ]));
    return res
      .header('Authorization', `Bearer ${token}`)
      .status(201)
      .send({
        status: res.statusCode,
        message: 'User signup successed!',
        data: {
          token,
          id: rows[0].id,
          firstName: rows[0].firstname,
          lastName: rows[0].lastname,
          email: rows[0].email,
          type: rows[0].type,
          isAdmin: rows[0].is_admin,
          isCashier: rows[0].is_cashier,
          created_on: rows[0].created_on,
        },
      });
  }
  // @create user bank account
  static async createAccount(req, res) {
    try {
      // @check if there's invalid data in request body
      const { error } = validation.createAccount(req.body);
      if (error) return res.status(400).send({
        status: res.statusCode,
        error: error.details[0].message,
      });

      const ownerId = parseInt(req.user.id, 10);
      const ownerInfo = await users.findById(ownerId);
      if (!ownerInfo.rows[0]) return res.status(404).send({
        status: 404,
        error: 'User Info Not Found!',
      });

      const { rows } = await model.create(req.body, ownerInfo.rows[0].id);
      rows[0].firstname = ownerInfo.rows[0].firstname;
      rows[0].lastname = ownerInfo.rows[0].lastname;
      rows[0].email = ownerInfo.rows[0].email;
      res.status(201).send({
        status: res.statusCode,
        data: rows[0],
      });
    } catch (error) {
      console.log({ error: error.message })
    }
  }

  // @Admin update a user bank account - Activate or Deactivate
  static async updateAccount(req, res) {
    try {
      // @check if there's invalid data in a request made by admin
      const { error } = validation.updateAccount(req.body);
      if (error) return res.status(400).send({
        status: res.statusCode,
        error: error.details[0].message,
      });

      const { number } = req.params;
      const accFound = await model.findOne(number);
      if (!accFound.rows[0]) return res.status(404).send({
        status: res.statusCode,
        error: 'Account not found!',
      });

      const { rows } = await model.updateOne(number, req.body);
      res.status(200).send({
        status: res.statusCode,
        message: 'Account successfully updated!',
        data: rows[0],
      });
    } catch (error) {
      console.log({ error: error.message })
    }
  }

  // @Admin delete user's bank account
  static async deleteAccount(req, res) {
    try {
      const { number } = req.params;
      const { rows } = await model.findOne(number);
      if (rows.length === 0) return res.status(404).send({
        status: res.statusCode,
        error: 'Account not found!',
      });

      await model.deleteOne(number);
      return res.status(200).send({
        status: res.statusCode,
        message: 'Account successfully deleted!',
      });
    } catch (error) {
      console.log({ error: error.message })
    }
  }
}
export default Accounts;
