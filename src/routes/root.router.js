import express from 'express';
// import userRoutes from './user.router.js';
import videoRoutes from './video.router.js';
// import authRouter from './auth.router.js';
import likeRoutes from './like.router.js';
import rateRoutes from './rate.route.js';
import orderRoutes from './order.router.js';

// tao object router tong
const rootRoutes = express.Router();

// rootRoutes.use("/users", userRoutes);
// rootRoutes.use("/videos", videoRoutes);
// rootRoutes.use("/auth", authRouter);
rootRoutes.use('/likes', likeRoutes)
rootRoutes.use('/rates', rateRoutes);
rootRoutes.use('/orders', orderRoutes);

// export rootRoutes cho index.js dung
export default rootRoutes;