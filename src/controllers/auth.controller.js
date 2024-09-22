import { INTERNAL_SERVER, OK } from "../../const.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from "sequelize"; // operator: toan tu: like, and, in ,or

const model = initModels(sequelize);

const register = async (req, res, next) => {
  try {
    /**
     * Bước 1: nhận dữ liệu từ FE
     */
    const { fullName, email, pass } = req.body;
    console.log({ fullName, email, pass });
    /**
     * Bước 2: kiểm tra email xem đã tồn tại trong db hay chưa
     *    - nếu tồn tại: trả lỗi "Tài khoản đã tồn tại"
     *    - nếu chưa tồn tại: đi tiêp
     */
    const userExist = await model.users.findOne({
        where: {
            email: email
        }
    });
    if (userExist) {
        return res.status(400).json({
            message: `Tài khoản đã tồn tại`,
            data: null,
        });
    }

    
    const userNew = await model.users.create({
        full_name: fullName,
        email: email,
        pass_word: pass
    })


    return res.status(OK).json({
        message: `Đăng ký thành công`,
        data: userNew,
    });
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER).json(error);
  }
};
export { register };
