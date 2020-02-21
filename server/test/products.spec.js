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

describe('Edit Products', () => {
  it('should edit a specific product', done => {
    chai
      .request(app)
      .patch(`/api/v1/products/4f98a7ad-1d0e-4c67-be99-f6dff59c589a`)
      .send({
        name: 'bag',
        price: 44500.0
      })
      .end((error, response) => {
        console.log(response);
        response.body.should.be.a('object');
        response.should.have.status(200);
        done();
      });
  });
  it('should throw a 404 error if product is not found', done => {
    chai
      .request(app)
      .patch(`/api/v1/products/bd96a69f-7ffd-44c0-9453-ceed8ccc9775`)
      .end((error, response) => {
        response.body.should.be.a('object');
        response.should.have.status(404);
        done();
      });
  });
});
