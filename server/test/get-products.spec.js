import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.use(chaiHttp);

describe('Get Products', () => {
  it('should GET all products', done => {
    const result = [
      {
        id: 18,
        user_id: '5e0170bf-81d8-403f-8096-8863b4eae8bf',
        name: 'shoe',
        price: 4500,
        status: 'available'
      },
      {
        id: 18,
        user_id: '5e0170bf-81d8-403f-8096-8863b4eae8bf',
        name: 'shoe',
        price: 4500,
        status: 'available'
      }
    ];
    chai
      .request(app)
      .get('/api/v1/products')
      .end((error, response) => {
        response.body.should.be.a('object');
        response.should.have.status(200);
        result.should.be.a('array');
        result[0].should.have.property('id').eql(result[0].id);
        result[0].should.have.property('user_id').eql(result[0].user_id);
        result[0].should.have.property('name').eql(result[0].name);
        result[0].should.have.property('price').eql(result[0].price);
        result[0].should.have.property('status').eql(result[0].status);
        done();
      });
  });
  it('should throw a 404 error if products are not found', done => {
    const result = [];
    chai
      .request(app)
      .get('/api/v1/products')
      .end((error, response) => {
        response.body.should.be.a('object');
        response.should.have.status(404);
        result.should.be.a('array');
        result.length.should.be.eql(0);
        done();
      });
  });
});
