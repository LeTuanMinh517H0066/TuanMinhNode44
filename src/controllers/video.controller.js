import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from "sequelize"; // operator: toan tu: like, and, in ,or
import { INTERNAL_SERVER, OK } from "../../const.js";

const model = initModels(sequelize);

const getListVideo = async(req, res) => {
    try {
        let data = await model.video.findAll();

        // return data
        return res.status(OK).json(data);
        
    } catch (error) {
        return res.status(INTERNAL_SERVER).json({message:"error"});
    }
}

export {getListVideo}