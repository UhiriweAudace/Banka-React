import moment from 'moment';
export default {
  validAdminToken: {
    id: 3,
    firstname: "uhiriwe",
    lastname: "audace",
    email: "admin@test.com",
    type: "staff",
    is_admin: true,
    is_cashier: false,
    created_at: moment(new Date()),
  },
  validCashierToken: {
    id: 2,
    firstname: "uhiriwe",
    lastname: "audace",
    email: "cashier@test.com",
    type: "staff",
    is_admin: false,
    is_cashier: true,
    created_at: moment(new Date()),
  },
  validUserToken: {
    id: 1,
    firstname: "uhiriwe",
    lastname: "audace",
    email: "admin@test.com",
    type: "staff",
    is_admin: true,
    is_cashier: false,
    created_at: moment(new Date()),
  },
  validAccountData2: {
    type: "saving",
    status: "active"
  },
  validInfo: {
    amount: 58800.55
  },
  moreAmountInfo: {
    amount: 578700.75,
  },
  moreAmount: {
    amount: 80000000.54
  },
  invalidAmount:{
    amount:"50hgfd0"
  }
}