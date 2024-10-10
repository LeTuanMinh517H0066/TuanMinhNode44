import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from "sequelize";
import { INTERNAL_SERVER, OK } from "../../const.js";

const model = initModels(sequelize);

const getRatesByRes = async (req, res) => {
  // console.log(12);

  try {
    const { res_id } = req.params;
    let data = await model.rate_res.findAll({
      where: {
        res_id,
      },
    });
    res.status(OK).json(data);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const getRatesByUsers = async (req, res) => {
  try {
    const { user_id } = req.params;
    let data = await model.rate_res.findAll({
      where: {
        user_id,
      },
    });
    console.log(data)

    res.status(OK).json(data);
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const userRateRes = async (req, res) => {
  try {
    const { user_id, res_id, amount } = req.body;

    let date_rate = Date.now();

    let data = await model.rate_res.create({
      user_id,
      res_id,
      date_rate,
      amount
    });

    return res.status(OK).json({ messaage: "rate res" });
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ messaage: "error" });
  }
};

const useDeleteRate = async (req, res) => {
  try {
    const { id } = req.params;
    let rate = await model.rate_res.findByPk(id);
    if (!rate) {
      return res.status(400).json({ message: "rate not found" });
    }
    rate.destroy();

    return res.status(OK).json({ message: " user delete rate res" });
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

export { getRatesByRes, getRatesByUsers, userRateRes, useDeleteRate };
