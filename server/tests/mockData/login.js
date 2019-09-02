import moment from "moment";

export default {
  validSignupData: {
    firstname: "mahoro",
    lastname: "jonas",
    email: "jonas@test.com",
    password: "@Jonas123",
  },
  validLoginData: {
    email: "cashier@test.com",
    password: "Staff@1234"
  },
  invalidLoginData: {
    email: "joe.test@test.com",
    password: "@Udace12"
  },
  validLoginToken: {
    id: 2,
    firstname: "uhiriwe",
    lastname: "audace",
    email: "cashier@test.com",
    type: "client",
    is_admin: false,
    is_cashier: false,
    created_at: moment(new Date()),
  }
}