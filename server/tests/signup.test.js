import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

import mockData from './mockData/signup';
import generate from '../helpers/Token';

const { validSignupData, invalidSignupData, validSignupToken, validAdminToken } = mockData;
const token = generate.getToken(validSignupToken);
const adminToken = generate.getToken(validAdminToken);
chai.use(chaiHttp);

describe('GET /', () => {
  it('It should display Welcome message', () => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.be.a('string');
      });
  });

  it('It should not navigate the unexisting Banka API URL', () => {
    chai
      .request(app)
      .get('/api/v1/kjkkkjkjkkjk')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equal(404);
        expect(res.body.error).to.be.a('string');
      });
  });
});

describe('POST /api/v1/auth/signup', () => {
  it('should create a new user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set('Auhtorization', `Bearer ${token}`)
      .send(validSignupData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(201);
        expect(res.body.message).to.be.a('string');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });

  it('Once you provided any invalid values in request body, It should return an error message', () => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set('Auhtorization', `Bearer ${token}`)
      .send(invalidSignupData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('string');
      });
  });

  it('User should not registered Twice with the same e-mail', () => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set('Authorization', `Bearer ${token}`)
      .send(validSignupData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(400);
        expect(res.body.error).to.deep.equal('This e-mail is already registered!');
        expect(res.body.error).to.be.a('string');
      });
  });
});

//Admin can create a staff user accounts
describe('Admin should create a staff user accounts', () => {
  it('should return error message if not found!', () => {
    chai
      .request(app)
      .patch('/api/v1/auth/user/testeeee@test.com')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(
        {
          "isCashier": true,
          "isAdmin": false
        })
      .end((err, res) => {
        //console.log(res.body)
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(404);
        expect(res.body.error).to.deep.equal('User Not found!');
      })
  })
  it('should return error message if not found!', () => {
    chai
      .request(app)
      .patch('/api/v1/auth/user/test@test.com')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(
        {
          "isCashier": true,
          "isAdmin": false
        })
      .end((err, res) => {
        // console.log(res.body)
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.deep.equal(200);
        expect(res.body.message).to.deep.equal('User is Now a staff');
      })
  })
})
