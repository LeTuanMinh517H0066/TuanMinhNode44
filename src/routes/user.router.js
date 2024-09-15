import express from 'express';
import { createUser, deleteUsers, getUsers } from '../controllers/user.controller.js';

const userRoutes = express.Router();

userRoutes.post('/:id/:hoTen', createUser);
userRoutes.get('/', getUsers)
userRoutes.delete('/delete/:user_id', deleteUsers)

export default userRoutes;