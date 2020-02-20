import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.use(chaiHttp);

describe('POST /auth/signin', () => {
  it('it should sign in a user', done => {
    const loginInput = {
      email: 'johndoe@gmail.com',
      password: 'password'
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(loginInput)
      .end((err, response) => {
        response.body.should.be.a('object');
        response.body.should.have
          .property('error')
          .eql('Account does not exist');
        response.should.have.status(400);
        done();
      });
  });
  it('it should throw an error if email is missing in the rquest body', done => {
    const loginInput = {
      password: 'password'
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(loginInput)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have
          .property('error')
          .eql('Email or Password is not provided');
        done();
      });
  });
  it('it should throw an error if password is missing in the request body', done => {
    const loginInput = {
      email: 'johndoe@gmail.com'
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(loginInput)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have
          .property('error')
          .eql('Email or Password is not provided');
        done();
      });
  });
});
