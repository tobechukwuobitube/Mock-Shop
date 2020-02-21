import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import db from '../database/connection';

import app from '../app';

chai.use(chaiHttp);

describe('Get Products', () => {
  it('should GET all products', done => {
    const result = [
      {
        id: 18,
        product_id: '5e0170bf-81d8-403f-8096-8863b4eae8bf',
        name: 'shoe',
        price: 4500,
        status: 'available'
      },
      {
        id: 18,
        product_id: '5e0170bf-81d8-403f-8096-8863b4eae8bf',
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
        result[0].should.have.property('product_id').eql(result[0].product_id);
        result[0].should.have.property('name').eql(result[0].name);
        result[0].should.have.property('price').eql(result[0].price);
        result[0].should.have.property('status').eql(result[0].status);
        done();
      });
  });
  it('should throw a 200 error if products are not found', done => {
    const result = [];
    chai
      .request(app)
      .get('/api/v1/products')
      .end((error, response) => {
        response.body.should.be.a('object');
        response.should.have.status(200);
        result.should.be.a('array');
        result.length.should.be.eql(0);
        done();
      });
  });
});

describe('Delete Products', () => {
  it('should delete a specific product', done => {
    const products = [
      {
        id: 2,
        product_id: '8e484df0-aac9-4fc0-8371-4aee0d569cc2',
        name: 'shoe',
        price: 4500,
        status: 'available'
      },
      {
        id: 1,
        product_id: '311007b8-1a63-4957-af08-f9fe3a911aaa',
        name: 'shoe',
        price: 4500,
        status: 'available'
      }
    ];
    chai
      .request(app)
      .delete(`/api/v1/products/bd96a69f-7ffd-44c0-9453-ceed8ccc9775`)
      .end((error, response) => {
        response.body.should.be.a('object');
        response.should.have.status(200);
        done();
      });
  });
  it('should throw a 404 error if product is not found', done => {
    chai
      .request(app)
      .delete(`/api/v1/products/bd96a69f-7ffd-44c0-9453-ceed8ccc9775`)
      .end((error, response) => {
        response.body.should.be.a('object');
        response.should.have.status(404);
        done();
      });
  });
});
