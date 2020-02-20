import express from 'express';
import UsersRoutes from './users';
import productRoutes from './products';

const app = express();

app.use('/api/v1/', UsersRoutes);
app.use('/api/v1/', productRoutes);

export default app;
