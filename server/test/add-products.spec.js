import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.use(chaiHttp);

describe('Add products', () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5tYXJrQGVtYWlsLmNvbSIsImlhdCI6MTU1NjQ2Mjc1OCwiZXhwIjoxNTU2NTQ5MTU4fQ.TG9Iv5v5fc0rZPOiEeYrS3UToxpnecnIY-4MYi3eIrw';
  it('should add a product', done => {
    const newProduct = {
      name: 'Shoe',
      price: parseFloat(4500.0),
      status: 'available'
    };

    chai
      .request(app)
      .post('/api/v1/products')
      .set('Authorization', token)
      .send(newProduct)
      .end((error, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have
          .property('message')
          .eql('Product added successfully');
        done();
      });
  });

  it('should throw error when product name is not specified', done => {
    const newProductWithoutName = {
      price: parseFloat(4500.0)
    };

    chai
      .request(app)
      .post('/api/v1/products')
      .set('Authorization', token)
      .send(newProductWithoutName)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have
          .property('error')
          .eql('Please provide the name of your product');
        done();
      });
  });

  it('should throw error when product price is not specified', done => {
    const newProductWithoutPrice = {
      name: 'Shoe'
    };

    chai
      .request(app)
      .post('/api/v1/products')
      .set('Authorization', token)
      .send(newProductWithoutPrice)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have
          .property('error')
          .eql('Please provide the price of your product');
        done();
      });
  });
});
