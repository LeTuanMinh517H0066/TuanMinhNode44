import express from 'express';
import { createUser, deleteUsers, getUsers, updateUser } from '../controllers/user.controller.js';

const userRoutes = express.Router();

userRoutes.post('/create', createUser);
userRoutes.get('/', getUsers)
userRoutes.delete('/delete/:user_id', deleteUsers)
userRoutes.put('/update-user/:user_id', updateUser)
export default userRoutes;