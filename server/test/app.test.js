import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.use(chaiHttp);
const should = chai.should();

describe('Test App Entry Point: localhost:8001/', () => {
  it('should load the server successfully', done => {
    chai
      .request(app)
      .get('/')
      .end((error, response) => {
        response.body.should.be.a('object');
        response.body.should.have
          .property('message')
          .eql('Welcome to Mock Shop API, your services at its best');
        response.status.should.be.eql(200);
        done();
      });
  });
});
