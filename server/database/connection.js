import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.ONLINE_DATABASE_URL;
const client = new Client({
  connectionString
});

client.connect();

export default client;
