import _ from 'lodash';
import model from '../models/users';
import hash from '../helpers/Password';
import generate from '../helpers/Token';
import validation from '../validations/authValidation';

class Users {
  static async signup(req, res) {
    // check if there's an error in our request sent
    const { error } = validation.signup(req.body);
    if (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: error.details[0].message,
      });
    }

    // check if the provided email is registered before
    const found = await model.findOne(req.body.email);
    if (found.rows.length !== 0) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'This e-mail is already registered!',
      });
    }

    // create a new user and return user data includes token
    const { rows } = await model.create(req.body);
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
          firstname: rows[0].firstname,
          lastname: rows[0].lastname,
          email: rows[0].email,
          type: rows[0].type,
          is_admin: rows[0].is_admin,
          is_cashier: rows[0].is_cashier,
          created_on: rows[0].created_on,
        },
      });
  }

  static async login(req, res) {
    // check if there's an error in our request sent
    const { error } = validation.login(req.body);
    if (error) {
      return res
        .status(400)
        .send({
          status: res.statusCode,
          error: error.details[0].message,
        });
    }

    // extract our email and password from the request body
    const { email, password } = req.body;

    // check if the provided email is registered
    const { rows } = await model.findOne(email);
    if (rows.length === 0) {
      return res.status(404).send({
        status: res.statusCode,
        error: 'This e-mail is not yet registered!',
      });
    }

    /** check if the provided password is matching with or equal to
     * the hashed password in our memory
     */
    const match = await hash.isMatch(password, rows[0].password);
    if (!match) {
      return res.status(400).send({
        status: res.statusCode,
        message: 'Wrong credential provided!',
      });
    }

    /** generate a token to be given to the logged in user */
    const token = generate.getToken(
      _.pick(rows[0], [
        'id',
        'firstname',
        'lastname',
        'email',
        'type',
        'is_admin',
        'is_cashier',
        'created_on',
      ]),
    );

    // return the logged in user's data with a token
    return res
      .header('Authorization', `Bearer ${token}`)
      .status(200)
      .send({
        status: res.statusCode,
        message: 'User login successed!',
        data: {
          token,
          id: rows[0].id,
          firstname: rows[0].firstname,
          lastname: rows[0].lastname,
          email: rows[0].email,
          type: rows[0].type,
          is_admin: rows[0].is_admin,
          is_cashier: rows[0].is_cashier,
          created_on: rows[0].created_on,
        },
      });
  }

  static async changeUserType(req, res) {
    const { email } = req.params;
    const foundUser = await model.findUser(email);
    if (!foundUser.rows[0]) return res.status(404).send({
      status: res.statusCode,
      error: 'User Not found!'
    });

    console.log({ email: foundUser.rows[0].email })
    const isCashier = req.body.isCashier || foundUser.rows[0].is_cashier;
    const isAdmin = req.body.isAdmin || foundUser.rows[0].is_admin;
    const data = {
      isCashier,
      isAdmin
    }
    const { rows } = await model.createStaff(data, foundUser.rows[0].id);
    res.status(200).send({
      status: res.statusCode,
      message: "User is Now a staff",
      data: _.pick(rows[0], [
        'id',
        'firstname',
        'lastname',
        'email',
        'type',
        'is_admin',
        'is_cashier'
      ])
    });
  }
}
export default Users;
