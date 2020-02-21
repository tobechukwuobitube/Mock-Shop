import client from './connection';

const createTables = () => {
  const tables = `
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS products CASCADE;
  DROP TABLE IF EXISTS cart CASCADE;
  CREATE TABLE users(
    "user_id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
    "email" VARCHAR NOT NULL UNIQUE,
    "firstName" VARCHAR NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "isAdmin" BOOLEAN
  );
  CREATE TABLE products(
    "product_id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "category" VARCHAR NOT NULL,
    "price" FLOAT NOT NULL,
    "imageUrl" VARCHAR NOT NULL,
    "inStock" BOOLEAN
  );
  CREATE TABLE cart(
    "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
    "productId" uuid DEFAULT uuid_generate_v4() REFERENCES products(product_id) NOT NULL,
    "userId" uuid DEFAULT uuid_generate_v4() REFERENCES users(user_id) NOT NULL
  );
  `;

  return client
    .query(tables)
    .then(res => {
      console.log('All tables were created successfully!');
      return process.exit();
    })
    .catch(err => {
      console.log('Error occured while creating the tables: ', err);
      client.end();
      return process.exit();
    });
};

export default createTables();
