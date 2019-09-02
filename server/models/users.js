import moment from 'moment';

import db from './index';
import hash from '../helpers/Password';


class User {
  /**
   * creating the new user
   */
  async create(request) {
    const { firstname, lastname, email, password } = request;
    const hashedPwd = await hash.hashPassword(password, 10);
    const newUser = {
      firstname: firstname.toLowerCase(),
      lastname: lastname.toLowerCase(),
      email: email.toLowerCase(),
      hashedPwd,
      type: 'client',
      isAdmin: false,
      isCashier: false,
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

  /* find a user by his/her registered email */
  async findOne(email) {
    const queryText = 'SELECT * FROM users WHERE email=$1;';
    const $email = email;
    const response = await db.query(queryText, [$email]);
    return response;
  }

  async findUser(email) {
    const queryText = 'SELECT * FROM users WHERE email=$1;';
    const response = await db.query(queryText, [email]);
    return response;
  }
  async createStaff(request, userId) {

    const is_Cashier = request.isCashier;
    const is_Admin = request.isAdmin;

    const queryText = "UPDATE users SET is_cashier=$1,is_admin=$2,modified_on=$3,type=$4 where id=$5 RETURNING*;";
    const result = await db.query(queryText, [is_Cashier, is_Admin, moment(new Date()), "staff", userId]);
    return result;
  }

  /* find a user by his/her id */
  async findById(id) {
    const queryText = 'SELECT * FROM users WHERE id=$1;';
    const response = await db.query(queryText, [parseInt(id, 10)]);
    return response;
  }
}

export default new User();
