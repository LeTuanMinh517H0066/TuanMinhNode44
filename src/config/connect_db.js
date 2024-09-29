import dotenv from 'dotenv';

// đọc file .env
dotenv.config();

export default {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    dialect: process.env.DB_DIALECT
}