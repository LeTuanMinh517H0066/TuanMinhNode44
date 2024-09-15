import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost', //dia chi host cua MYSQL duoi local
    user: 'root', //ten nguoi dung
    password: '123456', //mat khau nguoi dung
    database: 'node44',
    port: 3307
});

export default pool;