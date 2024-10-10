import express from 'express';
import { getLikesByRes, getlLikesByUsers, getLikes, userLikeRes, useDeleteLike } from '../controllers/like.controller.js';

const likeRoutes = express.Router();

likeRoutes.get('/get-likes-by-res/:res_id', getLikesByRes);
likeRoutes.get('/get-likes-by-user/:user_id', getlLikesByUsers);
likeRoutes.get('/get-likes',getLikes)
likeRoutes.post('/user-like', userLikeRes);
likeRoutes.delete('/user-delete-like', useDeleteLike);


export default likeRoutes;