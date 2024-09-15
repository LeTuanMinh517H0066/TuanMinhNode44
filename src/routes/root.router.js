import express from 'express';
import userRoutes from './user.router.js';

// tao object router tong
const rootRoutes = express.Router();

rootRoutes.use("/users", userRoutes);

// export rootRoutes cho index.js dung
export default rootRoutes;