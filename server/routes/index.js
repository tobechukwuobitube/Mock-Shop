import express from 'express';
import UsersRoutes from './users';

const app = express();

app.use('/api/v1/', UsersRoutes);

export default app;
