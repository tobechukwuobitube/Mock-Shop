import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.use(chaiHttp);

describe('POST /auth/signup', () => {
  it('should create a new user', done => {
    const newUser = {
      email: 'johndoe1@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
      confirmPassword: 'password'
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, response) => {
        response.body.should.have.property('status').to.eql(201);
        response.body.should.have.property('message');
        response.body.should.be.a('object');
        if (response.error) {
          response.status.to.eql(409);
        }
        done();
      });
  });
  it('should throw an error if the email address is already taken', done => {
    const newUser = {
      email: 'johndoelo@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
      confirmPassword: 'password'
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, response) => {
        response.should.have.status(409);
        response.body.should.be.a('object');
        done();
      });
  });
  it('it should throw an error if firstName is missing in the request body', done => {
    const invalidInput = {
      lastName: 'John',
      email: 'johndoe@gmail.com',
      password: 'password',
      confirmPassword: 'password'
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(invalidInput)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have
          .property('error')
          .eql('Ensure all fields are provided');
        done();
      });
  });
  it('it should throw an error if lastName is missing in the request body', done => {
    const invalidInput = {
      firstName: 'John',
      email: 'johndoe@gmail.com',
      password: 'password',
      confirmPassword: 'password'
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(invalidInput)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have
          .property('error')
          .eql('Ensure all fields are provided');
        done();
      });
  });
  it('it should throw an error if email is missing in the request body', done => {
    const invalidInput = {
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
      confirmPassword: 'password'
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(invalidInput)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have
          .property('error')
          .eql('Ensure all fields are provided');
        done();
      });
  });
  it('it should throw an error if password does not match confirm password', done => {
    const invalidInput = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'password',
      confirmPassword: 'passw'
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(invalidInput)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have
          .property('error')
          .eql('Passwords do not match');
        done();
      });
  });
});
