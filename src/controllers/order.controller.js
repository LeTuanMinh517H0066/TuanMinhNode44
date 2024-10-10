import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from "sequelize";
import { INTERNAL_SERVER, OK } from "../../const.js";

const model = initModels(sequelize);

const createOrders = async (req, res) => {
  try {
    const { user_id, food_id, amount, discount_code, arr_sub_id } = req.body;""

    let data = await model.orders.create({
      user_id,
      food_id,
      amount,
      discount_code,
      arr_sub_id,
    });

    return res.status(OK).json({ messaage: "create order success" });
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};
export { createOrders };
