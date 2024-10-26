import { INTERNAL_SERVER, OK } from "../../const.js";
import pool from "../../db.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from "sequelize"; // operator: toan tu: like, and, in ,or
import { PrismaClient } from "@prisma/client";

const model = initModels(sequelize);
const prisma = new PrismaClient();

const createUser = async (req, res) => {
  // let params = req.params;
  // let {id,hoTen} = params;
  // let body = req.body;

  // res.send({
  //     id,
  //     hoTen,
  //     body
  // });

  try {
    const { full_name, email, pass_word } = req.body;
    // let newUser = await model.users.create({
    //   full_name,
    //   email,
    //   pass_word,
    // });
    let newUser = await prisma.users.create({
      data: {
        full_name,
        email,
        pass_word,
      },
    });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const getUsers = async (req, res) => {
  try {
    // const [data] = await pool.query(`
    //     SELECT * FROM users
    // `);
    // res.status(OK).json(data)

    let full_name = req.query.full_name || "";

    let data = await model.users.findAll({
      where: {
        full_name: {
          [Op.like]: `%${full_name}%`,
        },
      },
      // include: [
      //   {
      //     model: model.video, // chọn model mà muốn kết bảng
      //     as: "videos",
      //     attributes: ["video_name", "user_id"], //chỉ định column nào sẽ hiển thị
      //     requried: true, // default sẽ kết bằng lèt join, muốn inner join dùng required true
      //     include: [
      //       {
      //         model: model.video_comment,
      //         as: "video_comments",
      //       },
      //     ],
      //   },
      // ],
    });
    return res.status(OK).json(data);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const deleteUsers = async (req, res) => {
  try {
    let { user_id } = req.params;
    // console.log(user_id);
    // const [data] = await pool.query(`
    //         DELETE FROM users
    //         where id = ${user_id}
    //         `);
    // let user = await model.users.findByPk(user_id);
    let user = await prisma.users.findFirst({
      where: {
        user_id: Number(user_id),
      },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    // user.destroy();
    await prisma.users.delete({
      where: {
        user_id: Number(user_id),
      },
    });

    return res.status(OK).json({ message: "user deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const updateUser = async (req, res) => {
  try {
    let { user_id } = req.params;
    const { full_name, pass_word } = req.body;

    // let user = await model.users.findByPk(user_id);
    // let user = await model.users.findOne({
    //   where: { user_id },
    // });
    let user = await prisma.users.findFirst({
      where: { user_id: Number(user_id) },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    // let data = await model.users.update(
    //   { full_name, pass_word },
    //   {
    //     where: { user_id },
    //   }
    // );
    await prisma.users.update({
      where: { user_id: Number(user_id) },
      data: {
        full_name,
        pass_word,
      },
    });
    // cách 2: dùng chính object user để update info user
    // user.full_name = full_name || user.full_name;
    // user.pass_word = pass_word || user.pass_word;
    // await user.save();

    return res.status(OK).json({ message: "update user successfully" });
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    let file = req.file;

    let userId = req.body.userId;
    let user = await prisma.users.findFirst({
      where: { user_id: Number(userId) },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    let avatarPath = `/public/imgs${file.filename}`;
    let avatar = await prisma.users.update({
      where: { user_id: Number(userId) },
      data: {
        avatar: avatarPath,
      },
    });

    return res.status(OK).json({message:"upload avatar successfully"});
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};


export { createUser, getUsers, deleteUsers, updateUser, uploadAvatar };
