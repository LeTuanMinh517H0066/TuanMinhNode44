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

const getTypes = async (req,res) => {
    try {
        let data = await model.video_type.findAll();
        return res.status(OK).json(data);
    } catch (error) {
        return res.status(INTERNAL_SERVER).json({message:"error"})
    }
};

const getListVideoType = async (req, res) => {
    try {
        let {type_id} = req.params;
        
        let data = await model.video.findAll({
            where: {
                type_id
            }
        })
        return res.status(OK).json(data);

    } catch (error) {
        return res.status(INTERNAL_SERVER).json({message:"error"});
    }
}

const getVideoPage = async (req,res) => {
    try {
        let {page, size} = req.params;
        page = parseInt(page, 10);
        size = parseInt(size, 10);
        if(isNaN(page) || page <= 0) {
            return res.status(400).json({message:"page invalid"});
        }
        if(isNaN(size) || size <= 0) {
            return res.status(400).json({message:"size invalid"});
        }
        let index = (page - 1)*size;
        let data = await model.video.findAll({
            offset: index,
            limit: size
        });

        return res.status(OK).json(data);
    } catch (error) {
        return res.status(INTERNAL_SERVER).json({message: "error"});
    }
}

export {getListVideo,getTypes,getListVideoType,getVideoPage}