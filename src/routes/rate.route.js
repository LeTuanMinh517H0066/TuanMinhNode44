import express from 'express';
import { getRatesByRes, getRatesByUsers, userRateRes, useDeleteRate} from '../controllers/rate.controller.js';

const rateRoutes = express.Router();

rateRoutes.get('/get-rate-by-res/:res_id', getRatesByRes);
rateRoutes.get('/get-rate-by-user/:user_id', getRatesByUsers);
// rateRoutes.get('/get-rate',getLikes)
rateRoutes.post('/user-rate', userRateRes);
rateRoutes.delete('/user-delete-rate/:id', useDeleteRate);


export default rateRoutes;