import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from "sequelize";
import { INTERNAL_SERVER, OK } from "../../const.js";

const model = initModels(sequelize);

const getLikesByRes = async (req, res) => {
  // console.log(12);

  try {
    const { res_id } = req.params;
    let data = await model.like_res.findAll({
      where: {
        res_id,
      },
    });
    res.status(OK).json(data);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const getlLikesByUsers = async (req, res) => {
  try {
    const { user_id } = req.params;
    let data = await model.like_res.findAll({
      where: {
        user_id,
      },
    });

    res.status(OK).json(data);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const getLikes = (req, res) => {
  console.log(1234);
};

const userLikeRes = async (req, res) => {
  try {
    const { user_id, res_id } = req.body;
    
    let date_like = Date.now();
    
    let data = await model.like_res.create({
        user_id,
        res_id,
        date_like
    });

    return res.status(OK).json({messaage:'like res'})
    

  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ messaage: "error" });
  }
};

const useDeleteLike = async (req,res) => {
    try {
        const { id } = req.body;
        let like = await model.like_res.findByPk(id);
        if(!like) {
            return res.status(400).json({message:"Like not found"});
        }
        like.destroy();

        return res.status(OK).json({message:" user delete like res"});
    } catch (error) {
        return res.status(INTERNAL_SERVER).json({message:"error"})
    }
}

export { getLikesByRes, getlLikesByUsers, getLikes, userLikeRes, useDeleteLike };
