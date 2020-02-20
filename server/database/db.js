import client from './connection';

const createTables = () => {
  const tables = `
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS products CASCADE;
  DROP TABLE IF EXISTS cart CASCADE;
  CREATE TABLE users(
    "id" serial NOT NULL PRIMARY KEY,
    "user_id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "email" VARCHAR NOT NULL UNIQUE,
    "firstName" VARCHAR NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "type" VARCHAR NOT NULL,
    "isAdmin" BOOLEAN
  );
  CREATE TABLE products(
    "id" serial NOT NULL PRIMARY KEY,
    "user_id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "name" VARCHAR NOT NULL,
    "price" FLOAT NOT NULL,
    "status" TEXT NOT NULL
  );
  CREATE TABLE cart(
    "id" serial NOT NULL PRIMARY KEY,
    "user_id" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "name" VARCHAR NOT NULL,
    "quantity" BIGINT NOT NULL,
    "price" FLOAT NOT NULL
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
