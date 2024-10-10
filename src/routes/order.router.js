import express from 'express';
import { createOrders } from '../controllers/order.controller.js';

const orderRoutes = express.Router();

orderRoutes.post('/create-order', createOrders);



export default orderRoutes;