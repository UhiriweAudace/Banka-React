import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

import mockData from './mockData/transaction';
import generate from '../helpers/Token';

const {
  validInfo,
  invalidAmount,
  moreAmountInfo,
  moreAmount,
  validUserToken,
  validCashierToken,
  validAdminToken,
  validAccountData2,
} = mockData;

const cashierToken = generate.getToken(validCashierToken);
const clientToken = generate.getToken(validUserToken);
const adminToken = generate.getToken(validAdminToken);

chai.use(chaiHttp);

// before('create a bank account', () => {
//   chai
//     .request(app)
//     .post('/api/v1/account')
//     .set('Authorization', `Bearer ${clientToken}`)
//     .send(validAccountData2)
//     .end((err, res) => {
//       expect(res.body).to.be.an('object');
//       expect(res.body.status).to.equal(201);
//       expect(res.body.data).to.be.an('object');
//     });
// });

describe('POST /api/v1/transactions/<account-number>/credit', () => {
  before('create a bank account', () => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${clientToken}`)
      .send(validAccountData2)
      .end((err, res) => {
        //console.log(res.body)
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(201);
        expect(res.body.data).to.be.an('object');
      });
  });

  it('deposit some amount', () => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${clientToken}`)
      .send(validAccountData2)
      .end((err, res) => {
        chai
          .request(app)
          .post(`/api/v1/transactions/${parseInt(res.body.data.account_number)}/debit`)
          .set('Authorization', `Bearer ${cashierToken}`)
          .send(moreAmountInfo)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            // expect(res.body.status).to.equal(200);
            // expect(res.body.data).to.be.an('object');
          });
      })
  });

  it('should not withdraw the amount which is higher than your current balance', () => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${clientToken}`)
      .send(validAccountData2)
      .end((err, res) => {
        chai
          .request(app)
          .post(`/api/v1/transactions/${parseInt(res.body.data.account_number)}/debit`)
          .set('Authorization', `Bearer ${cashierToken}`)
          .send(moreAmount)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.deep.equal(400);
            expect(res.body.error).to.be.a('string');
            expect(res.body.error).to.deep.equal('insufficient balance!');
          });
      })
  });

  it('should return error, Amount should be number', () => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${clientToken}`)
      .send(validAccountData2)
      .end((err, res) => {
        chai
          .request(app)
          .post(`/api/v1/transactions/${parseInt(res.body.data.account_number)}/debit`)
          .set('Authorization', `Bearer ${cashierToken}`)
          .send(invalidAmount)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.deep.equal(400);
            expect(res.body.error).to.be.a('string');
          });
      })
  });

  it('should not withdraw amount on the unexisting bank account', () => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${clientToken}`)
      .send(validAccountData2)
      .end((err, res) => {
        chai
          .request(app)
          .post(`/api/v1/transactions/2010/debit`)
          .set('Authorization', `Bearer ${cashierToken}`)
          .send(validInfo)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(404);
            expect(res.body.error).to.be.a('string');
          });
      })
  });

  it('should not withdraw amount on the unexisting bank account', () => {
    chai
      .request(app)
      .post('/api/v1/transactions/210/credit')
      .set('Authorization', `Bearer ${cashierToken}`)
      .send(validInfo)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.be.a('string');
      });
  });

  it('should error message for setting Authorization header', () => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${clientToken}`)
      .send(validAccountData2)
      .end((err, res) => {
        chai
          .request(app)
          .post(`/api/v1/transactions/${parseInt(res.body.data.account_number)}/credit`)
          .send(validInfo)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.deep.equal(400);
            expect(res.body.error).to.be.a('string');
            expect(res.body.error).to.deep.equal('No Authorization!');
          });
      });
  });

  it('should return error message once you provided an invalid token', () => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${clientToken}`)
      .send(validAccountData2)
      .end((err, res) => {
        chai
          .request(app)
          .post(`/api/v1/transactions/${parseInt(res.body.data.account_number)}/credit`)
          .set('Authorization', 'Bearer kjkjkjkj$4bgf454fdgsn')
          .send(validInfo)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.deep.equal(403);
            expect(res.body.error).to.be.a('string');
            expect(res.body.error).to.deep.equal('Invalid Token provided!');
          });
      });
  });

  // it('should return error message - Only Cashier are allowed to withdraw', () => {
  chai
    .request(app)
    .post('/api/v1/accounts')
    .set('Authorization', `Bearer ${clientToken}`)
    .send(validAccountData2)
    .end((err, res) => {
      chai
        .request(app)
        .post(`/api/v1/transactions/${parseInt(res.body.data.account_number)}/debit`)
        .set('Authorization', `Bearer ${clientToken}`)
        .send(validInfo)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.deep.equal(403);
          expect(res.body.error).to.be.a('string');
          expect(res.body.error).to.deep.equal('Only Cashier are allowed to perfom this operation!.');
        });
    });


  it('should withdraw some amount on the existing bank account', () => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${clientToken}`)
      .send(validAccountData2)
      .end((err, res) => {
        chai
          .request(app)
          .post(`/api/v1/transactions/${parseInt(res.body.data.account_number)}/credit`)
          .set('Authorization', `Bearer ${cashierToken}`)
          .send(moreAmount)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(200);
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.deep.equal('Credit Operation Successed!');
            expect(res.body.data).to.be.an('object');
          });
      });
  });
});

/*
describe('POST /api/v1/transactions/<account-number>/debit', () => {
  before('create a bank account', () => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${clientToken}`)
      .send(validAccountData2)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(201);
        expect(res.body.data).to.be.an('object');
      });
  });

  it('It should deposit some amount on the existing bank account', () => {
    chai
      .request(app)
      .post('/api/v1/transactions/2/debit')
      .set('Authorization', `Bearer ${cashierToken}`)
      .send(validInfo)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
      });
  });

  it('should not deposit some amount on the unexisting bank account', () => {
    chai
      .request(app)
      .post('/api/v1/transactions/200/debit')
      .set('Authorization', `Bearer ${cashierToken}`)
      .send(validInfo)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('string');
      });
  });

  it('should error message for setting the Authorization header', () => {
    chai
      .request(app)
      .post('/api/v1/transactions/2/debit')
      .send(validInfo)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('No Authorization!');
      });
  });

  it('should return error, Amount should be number', () => {
    chai
      .request(app)
      .post('/api/v1/transactions/2/credit')
      .set('Authorization', `Bearer ${cashierToken}`)
      .send(invalidAmount)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(400);
        expect(res.body.error).to.be.a('string');
      });
  });

  it('should return error message for the provided invalid token', () => {
    chai
      .request(app)
      .post('/api/v1/transactions/2/debit')
      .set('Authorization', 'Bearer kjkjkjkj$4bgf454fdgsn')
      .send(validInfo)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(403);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('Invalid Token provided!');
      });
  });

  it('should return error message - Only Cashier are allowed to perform this operation', () => {
    chai
      .request(app)
      .post('/api/v1/transactions/2/debit')
      .set('Authorization', `Bearer ${clientToken}`)
      .send(validInfo)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(403);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('Only Cashier are allowed to perfom this operation!.');
      });
  });
});

/*
//@View a specific transaction
describe('GET /api/v1/transactions/<transaction-Id>', () => {
  before('create a bank account', () => {
    chai
      .request(app)
      .post('/api/v1/account')
      .set('Authorization', `Bearer ${clientToken}`)
      .send(validAccountData2)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(201);
        expect(res.body.data).to.be.an('object');
      });
  });

  it('should return No transaction​ details found.', () => {
    chai
      .request(app)
      .get('/api/v1/transactions/3000')
      .set('Authorization', `Bearer ${cashierToken}`)
      .send(validInfo)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('No Transaction details found!');
      });
  });

  it('should display a specific transaction​ details.', () => {
    chai
      .request(app)
      .get('/api/v1/transactions/2')
      .set('Authorization', `Bearer ${cashierToken}`)
      .send(validInfo)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
      });
  });

});
*/