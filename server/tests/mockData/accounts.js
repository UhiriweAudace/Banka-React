import moment from "moment";

export default {
  validAccountData: {
    type: "saving",
    status: "active"
  },
  invalidAccountOwner: {
    type: "saving",
    status: "active"
  },
  validAccountData2: {
    type: "saving",
    status: "active"
  },
  invalidAccountData: {
    type: "savings",
    status: "Active"
  },
  updateAccountData: {
    type: "saving",
    status: "active"
  },
  validLoginData: {
    email: "cashier@test.com",
    password: "Staff@123"
  },
  validSignupData: {
    firstname:"joseph",
    lastname:"mcMiller",
    email: "mcmiller@test.com",
    password: "Staff@123"
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
  },
  validAdminToken: {
    id: 1,
    firstname: "uhiriwe",
    lastname: "audace",
    email: "admin@test.com",
    type: "staff",
    is_admin: true,
    is_cashier: false,
    created_at: moment(new Date()),
  },
  invalidLoginToken: {
    id: 100,
    firstname: "uhiriwe",
    lastname: "audace",
    email: "cashiereee@test.com",
    type: "client",
    is_admin: false,
    is_cashier: false,
    created_at: moment(new Date()),
  }
}