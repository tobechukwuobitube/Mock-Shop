import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.status(200).send({
    message: 'Welcome to Mock Shop API, your services at its best'
  });
});

app.use((error, request, response, next) => {
  if (!error) return next();
  return response.status(500).send('Internal Server Error');
});

export default app;
