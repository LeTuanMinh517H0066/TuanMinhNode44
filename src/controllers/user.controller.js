import { INTERNAL_SERVER, OK } from "../../const.js";
import pool from "../../db.js";

const createUser = (req, res) => {
    let params = req.params;
    let {id,hoTen} = params;
    let body = req.body;
    
    res.send({
        id,
        hoTen,
        body
    });
}

const getUsers = async (req, res)=> {
    try {
        const [data] = await pool.query(`
            SELECT * FROM users
        `);
        res.status(OK).json(data)
        
    } catch (error) {
        res.status(INTERNAL_SERVER).json({message:"error"});
    }
}

const deleteUsers = async (req, res) => {
    try {
        let {user_id} = req.params;
        console.log(user_id)
        const [data] = await pool.query(`
            DELETE FROM users
            where id = ${user_id}
            `)
        res.status(OK).json({message: "ok"})
    } catch (error) {
        console.log(error);
        res.status(INTERNAL_SERVER).json({message:"error"})
    }
}

export {
    createUser,
    getUsers,
    deleteUsers,
}