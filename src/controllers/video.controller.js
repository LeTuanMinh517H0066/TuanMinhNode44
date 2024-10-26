import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from "sequelize"; // operator: toan tu: like, and, in ,or
import { INTERNAL_SERVER, OK } from "../../const.js";
import { PrismaClient } from "@prisma/client";

const model = initModels(sequelize);
const prisma = new PrismaClient();

const getListVideo = async (req, res) => {
  try {
    // let data = await model.video.findAll();
    let data = await prisma.video.findMany();

    // return data
    return res.status(OK).json(data);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const getTypes = async (req, res) => {
  try {
    // let data = await model.video_type.findAll();
    let data = await prisma.video_type.findMany();
    return res.status(OK).json(data);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const getListVideoType = async (req, res) => {
  try {
    let { type_id } = req.params;

    // let data = await model.video.findAll({
    //     where: {
    //         type_id
    //     }
    // })
    let data = await prisma.video.findMany({
      where: {
        type_id: Number(type_id),
      },
      include: {
        users: {
          select: {
            full_name: true,
            email: true,
          },
        },
      },
    });
    return res.status(OK).json(data);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const getVideoPage = async (req, res) => {
  try {
    let { page, size } = req.params;
    page = parseInt(page, 10);
    size = parseInt(size, 10);
    if (isNaN(page) || page <= 0) {
      return res.status(400).json({ message: "page invalid" });
    }
    if (isNaN(size) || size <= 0) {
      return res.status(400).json({ message: "size invalid" });
    }
    let index = (page - 1) * size;
    // let data = await model.video.findAll({
    //   offset: index,
    //   limit: size,
    // });
    let data = await prisma.video.findMany({
      skip: index,
      take: size,
    });

    return res.status(OK).json(data);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

export { getListVideo, getTypes, getListVideoType, getVideoPage };
