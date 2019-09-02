import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

import mockData from './mockData/accounts';
import generate from '../helpers/Token';

const {
  validAccountData,
  validLoginToken,
  invalidLoginToken,
  invalidAccountOwner,
  invalidAccountData,
  validAdminToken,
  updateAccountData,
  validSignupData
} = mockData;

const token = generate.getToken(validLoginToken);
const invalidToken = generate.getToken(invalidLoginToken);
const adminToken = generate.getToken(validAdminToken);

chai.use(chaiHttp);

before('Before Test,User should make login', () => {
  chai
    .request(app)
    .post('/api/v1/auth/signup')
    .set('Authorization', `Bearer ${token}`)
    .send(validSignupData)
    .end((err, res) => {
      //console.log(res.body)
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.deep.equal(201);
      expect(res.body.message).to.be.a('string');
      expect(res.body.data).to.be.an('object');
    });
});


describe('POST /api/v1/accounts', () => {
  it('should create a new Bank account', () => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send(validAccountData)
      .end((err, res) => {
        console.log(res.body)
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(201);
        expect(res.body.data).to.be.an('object');
      });
  });

  it('should return error message once you provide OwnerId', () => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${invalidToken}`)
      .send(invalidAccountOwner)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(404);
        expect(res.body.error).to.be.an('string');
        expect(res.body.error).to.deep.equal('User Info Not Found!');
      });
  });

  it('should return error message, once you provided the invalid value for creating bank account', () => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidAccountData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(400);
        expect(res.body.error).to.be.a('string');
      });
  });
});

describe('PATCH /api/v1/accounts/<account-number>', () => {
  before('create a bank account', () => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send(validAccountData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(201);
        expect(res.body.data).to.be.an('object');
      });
  });

  it('should update an existing Bank account', () => {
    chai
      .request(app)
      .get('/api/v1/accounts')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        chai
          .request(app)
          .patch(`/api/v1/accounts/${parseInt(res.body.data.account_number)}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send(updateAccountData)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.deep.equal(200);
            expect(res.body.data).to.be.an('object');
          });
      })
  });

  it('should error message for setting Authorization header', () => {
    chai
      .request(app)
      .patch('/api/v1/accounts/100')
      .send(updateAccountData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('No Authorization!');
      });
  });

  it('should return error message for invalid token provided', () => {
    chai
      .request(app)
      .patch('/api/v1/accounts/3')
      .set('Authorization', 'Bearer kjkjkjkj$4bnnn')
      .send(updateAccountData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(403);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('Invalid Token provided!');
      });
  });

  it('should return error message if no token provided', () => {
    chai
      .request(app)
      .patch('/api/v1/accounts/3')
      .set('Authorization', '')
      .send(updateAccountData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(401);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('No token provided, Access Denied!');
      });
  });

  it('should return error message - Admin permission is required', () => {
    chai
      .request(app)
      .patch('/api/v1/accounts/3')
      .set('Authorization', `Bearer ${token}`)
      .send(updateAccountData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(403);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('Sorry! Admin permission is required.');
      });
  });

  it('should not update an unexisting Bank account', () => {
    chai
      .request(app)
      .patch('/api/v1/accounts/100')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(updateAccountData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(404);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('Account not found!');
      });
  });
});

//@Admin Get all bank accounts tests
describe('GET /api/v1/accounts', () => {

  it('should view all bank accounts .', () => {
    chai
      .request(app)
      .get('/api/v1/accounts')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(200);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.deep.equal('All users bank accounts so far');
        expect(res.body.data).to.be.an('array');
      });
  });

});

//@Staff/Admin can view all active bank accounts.
describe('GET /api/v1/accounts/accounts?status=active', () => {
  before('create a bank account', () => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send(validAccountData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(201);
        expect(res.body.data).to.be.an('object');
      });
  });

  it('should view all bank accounts which has status of Active .', () => {
    chai
      .request(app)
      .get(`/api/v1/accounts?status=active`)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(200);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.deep.equal('List of all Active bank accounts fetched');
        expect(res.body.data).to.be.an('array');
      });
  });

});

//@Staff/Admin can view all dormant bank accounts.
describe('GET /api/v1/accounts?status=dormant', () => {
  before('create a bank account', () => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send(validAccountData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(201);
        expect(res.body.data).to.be.an('object');
      });
  });

  it('should view all bank accounts which has status of Dormant', () => {
    chai
      .request(app)
      .get(`/api/v1/accounts?status=dormant`)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(200);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.deep.equal('List of all Dormant bank accounts fetched');
        expect(res.body.data).to.be.an('array');
      });
  });

});

//@Admin/staff can view a list of accounts owned by a specific user.
describe('GET /api/v1/user/<email-address>/accounts', () => {
  before('create a bank account', () => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send(validAccountData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(201);
        expect(res.body.data).to.be.an('object');
      });
  });

  it('should return Admin permission is required!', () => {
    chai
      .request(app)
      .get('/api/v1/user/admin@test.com/accounts')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        //console.log(res.body)
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(403);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('Sorry! Admin permission is required.');
      });
  });

  it('should return user with this email not found', () => {
    chai
      .request(app)
      .get('/api/v1/user/test@test.com/accounts')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(404);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('User with this email not found!');
      });
  });

  // it('should return no banks accounts found for the provided email', () => {
  //   chai
  //     .request(app)
  //     .get('/api/v1/accounts')
  //     .set('Authorization', `Bearer ${adminToken}`)
  //     .end((err, res) => {
  //       chai
  //         .request(app)
  //         .get(`/api/v1/user/${res.body.data[0].owneremail}/accounts`)
  //         .set('Authorization', `Bearer ${adminToken}`)
  //         .end((err, res) => {
  //           expect(res.body).to.be.an('object');
  //           expect(res.body.status).to.deep.equal(404);
  //           expect(res.body.error).to.be.a('string');
  //           expect(res.body.error).to.deep.equal('No Accounts for this User!');
  //         });
  //     });
  // });

  it('should return all bank accounts related to that <email-address>', () => {
    chai
      .request(app)
      .get('/api/v1/accounts')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        chai
          .request(app)
          .get(`/api/v1/accounts/${parseInt(res.body.data.account_number)}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .end((err, res) => {
            chai
              .request(app)
              .get(`/api/v1/user/${res.body.data.ownerEmail}/accounts`)
              .set('Authorization', `Bearer ${adminToken}`)
              .end((err, res) => {
                console.log({ infozanjye: res.body })
                expect(res.body).to.be.an('object');
                // expect(res.body.status).to.deep.equal(200);
                // expect(res.body.message).to.be.a('string');
                // expect(res.body.message).to.deep.equal('Here is All your bank accounts!');
                // expect(res.body.accounts).to.be.an('array');
              });
          });
      });
  });

  it('should return all bank accounts related to that <email-address>', () => {
    chai
      .request(app)
      .get('/api/v1/user/admin@test.com/accounts')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        // expect(res.body.status).to.deep.equal(200);
        // expect(res.body.message).to.be.a('string');
        // expect(res.body.message).to.deep.equal('Here is All your bank accounts!');
        // expect(res.body.accounts).to.be.an('array');
      });
  });

});

//@User can view account details.
describe('GET /api/v1/accounts/<account-number>', () => {
  before('create a bank account', () => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send(validAccountData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(201);
        expect(res.body.data).to.be.an('object');
      });
  });

  it('should return no banks accounts found ', () => {
    chai
      .request(app)
      .get('/api/v1/accounts/1000')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {

        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(404);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('Account Number Not found!');
      });
  });

  it('should view a specific account’s details​ .', () => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send(validAccountData)
      .end((err, res) => {
        chai
          .request(app)
          .get(`/api/v1/accounts/${parseInt(res.body.data.account_number)}`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.deep.equal(200);
            expect(res.body.message).to.be.a('string');
            expect(res.body.message).to.deep.equal('Here is Account Details!');
            expect(res.body.data).to.be.an('object');
          });
      });
  });
});



//@User can view an account’s transaction history​.
describe('GET /api/v1/accounts/<account-number>/transactions', () => {
  before('create a bank account', () => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send(validAccountData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(201);
        expect(res.body.data).to.be.an('object');
      });
  });

  it('should return no banks accounts found ', () => {
    chai
      .request(app)
      .get('/api/v1/accounts/1000/transactions')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(404);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('Account Not found!');
      });
  });

});

describe('GET /api/v1/accounts/user/<user-id>', () => {
  before('create a bank account', () => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send(validAccountData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(201);
        expect(res.body.data).to.be.an('object');
      });
  });

  it('should return error message for not found user', () => {
    chai
      .request(app)
      .get('/api/v1/accounts/user/100')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(404);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('User with this ID not found!');
      });
  });

  it('should return all bank accounts related to that <user-id>', () => {
    chai
      .request(app)
      .get('/api/v1/accounts/user/1')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(200);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.deep.equal('Here is All your bank accounts!');
        expect(res.body.data).to.be.an('array');
      });
  });
});

describe('DELETE /api/v1/accounts/<account-number>', () => {
  it('should delete an existing Bank account', () => {
    chai
      .request(app)
      .post('/api/v1/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send(validAccountData)
      .end((err, res) => {
        chai
          .request(app)
          .delete(`/api/v1/accounts/${parseInt(res.body.data.account_number)}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.deep.equal(200);
            expect(res.body.message).to.be.an('string');
            expect(res.body.message).to.deep.equal('Account successfully deleted!');
          });
      });
  });

  it('should error message for setting Authorization header', () => {
    chai
      .request(app)
      .delete('/api/v1/accounts/100')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('No Authorization!');
      });
  });

  it('should return error message for invalid token provided', () => {
    chai
      .request(app)
      .delete('/api/v1/accounts/100')
      .set('Authorization', 'Bearer kjkjkjkj$4bnnn')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(403);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('Invalid Token provided!');
      });
  });


  it('should return error message - Admin permission is required', () => {
    chai
      .request(app)
      .delete('/api/v1/accounts/100')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(403);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('Sorry! Admin permission is required.');
      });
  });

  it('should not update an unexisting Bank account', () => {
    chai
      .request(app)
      .delete('/api/v1/accounts/100')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(404);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('Account not found!');
      });
  });
});
