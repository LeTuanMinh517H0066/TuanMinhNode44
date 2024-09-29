import express from 'express';
import { getListVideo, getListVideoType, getTypes,getVideoPage } from '../controllers/video.controller.js';
import { middlewareToken } from '../config/jwt.js';

const videoRoutes = express.Router();

videoRoutes.get('/get-videos',middlewareToken,getListVideo);
videoRoutes.get('/get-types', getTypes)
videoRoutes.get('/video-type/:type_id',getListVideoType);
videoRoutes.get('/get-video-page/:page/:size', getVideoPage);

export default videoRoutes;