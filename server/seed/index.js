import moment from 'moment';
import db from '../models';
import password from '../helpers/Password';


const text = 'INSERT INTO users(firstname,lastname,email,password,type,is_admin,is_cashier,created_on)VALUES($1,$2,$3,$4,$5,$6,$7,$8)returning*;';
password.hashPassword('Staff@123', 10)
  .then(async (adminPwd) => {
    const AdminData = ['Joshua', 'costa', 'admin@test.com', adminPwd, 'staff', true, false, moment(new Date())];
    await db.query(text, AdminData);
  })
  .catch((err) => {
    console.log(err);
  });

password.hashPassword('Staff@1234', 10)
  .then(async (cashierPwd) => {
    const cashierData = ['John', 'celestin', 'cashier@test.com', cashierPwd, 'staff', false, true, moment(new Date())];
    await db.query(text, cashierData);
  })
  .catch((err) => {
    console.log(err);
  });
