import moment from "moment";

export default {
  validSignupData: {
    firstname: "uhiriwe",
    lastname: "audace",
    password: "@Udace123",
    email: "test@test.com"
  },
  invalidSignupData: {
    firstname: "u",
    lastname: "audace",
    password: "@Udace123",
    email: "test@test.com"
  },
  validSignupToken: {
    id: 3,
    firstname: "uhiriwe",
    lastname: "audace",
    email: "test@test.com",
    type: "client",
    is_admin: false,
    is_cashier: false,
    created_at: moment(new Date()),
  },
   validAdminToken: {
    id: 5,
    firstname: "jousha",
    lastname: "kerrick",
    email: "test1@test.com",
    type: "staff",
    is_admin: true,
    is_cashier: false,
    created_at: moment(new Date()),
  }
}