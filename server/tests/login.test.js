import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../server';
import generate from '../helpers/Token';
import mockData from './mockData/login';

const { validLoginData, invalidLoginData, validLoginToken } = mockData;
const token = generate.getToken(validLoginToken);

chai.use(chaiHttp);

describe('POST /api/v1/auth/signin', () => {
  it('Should login a client', () => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set('Authorization', `Bearer ${token}`)
      .send(validLoginData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.deep.equal('User login successed!');
        expect(res.body.data).to.be.an('object');
      });
  });

  it('Should return email field is required', () => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('email is required');
      });
  });

  it('Should return password field is required', () => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'test@test.com' })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('password is required');
      });
  });

  it('it should return error message, Once you provided the unregistered email', () => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidLoginData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.deep.equal('This e-mail is not yet registered!');
      });
  });
});
