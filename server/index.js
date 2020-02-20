import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.PORT || 8001;

app.listen(port, () => {
  console.log(`API server started on port ${port}`);
});
