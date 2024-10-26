import { INTERNAL_SERVER, OK } from "../../const.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize"; // operator: toan tu: like, and, in ,or
import transporter from "../config/transporter.js";
import {
  createToken,
  createTokenAsyncKey,
  creatRefToken,
  creatRefTokenAsyncKey,
  verifyTokenAsyncKey,
} from "../config/jwt.js";
import { PrismaClient } from "@prisma/client";
import speakeasy from 'speakeasy';

const model = initModels(sequelize);
const prisma = new PrismaClient();

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
        email: email,
      },
    });
    if (userExist) {
      return res.status(400).json({
        message: `Tài khoản đã tồn tại`,
        data: null,
      });
    }

    // const userNew = await model.users.create({
    //   full_name: fullName,
    //   email: email,
    //   pass_word: bcrypt.hashSync(pass, 10),
    // });
    //  tạo secrect cho login 2 lớp 
    const secret = speakeasy.generateSecret({length:15});

    const userNew = await prisma.users.create({
      data: {
        full_name: fullName,
        email: email,
        pass_word: bcrypt.hashSync(pass, 10),
        secret: secret.base32
      },
    });

    const mailOption = {
      from: "ltuanminh049@gmail.com",
      to: email,
      subject: "Xác nhận tài khoản",
      text: `Hello ${fullName}. Best regards.`,
    };

    // gửi mail
    transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        console.log(err);
        return res
          .status(INTERNAL_SERVER)
          .json({ message: "Sending email error" });
      }
      return res.status(OK).json({
        message: `Đăng ký thành công`,
        data: userNew,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER).json(error);p
  }
};

const login = async (req, res, next) => {
  try {
    // B1: lấy email và pass_ửod từ body request

    // B2: check user thông qua email(get user từ db)

    // B2.1: nếu không có user => ra error user not found
    // B2.2: nếu có user => kiểm tra pass
    // B2.2.1: nếu pass sai => ra error pass sai
    // B2.2.2: nếu pass đúng => trả về token

    let { email, pass_word } = req.body;
    let user = await model.users.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "Email is wrong" });
    }

    let checkPass = bcrypt.compareSync(pass_word, user.pass_word);

    if (!checkPass) {
      return res.status(400).json({ message: "Pass is wrong" });
    }
    let payload = {
      userId: user.user_id,
    };

    // dùng function sign cưa jwt
    // param 1: tạo payload và lưu vào token
    // param 2: key tạo token
    // param 3: thời gian token có hiệu lực và thuật toán để tạo token
    let accessToken = createToken({ userId: user.user_id });

    // tạo refresh token
    let refreshToken = creatRefToken({ userId: user.user_id });

    // lưu rrefresh token vào database
    await model.users.update(
      {
        refresh_token: refreshToken,
      },
      {
        where: {
          user_id: user.user_id,
        },
      }
    );

    // lưu refresh token vào cookie

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // cookie không thể truy cập được từ js để bảo mật
      secure: false, // dùng cho local, nếu chạy trên https set là true
      sameSite: "Lax", // đảm bảo cho cookie được gửi trong nhiều domain khác nhau
      maxAge: 7 * 24 * 60 * 60 * 1000, //thời gian tồn tại là 7 ngày
    });

    return res.status(OK).json({
      message: "Đăng nhập thành công",
      data: accessToken,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const loginFacebook = async (req, res, next) => {
  try {
    // B1: lấy id, name và email từ req
    // B2: check id (app_face_id trong db)
    // B2.1: nếu không có app_face_id => tạo user mới=> tạo access token => gửi về FE
    // B2.2: nếu có app_face_id => tạo access token => gửi về FE
    let { id, email, name } = req.body;
    let user = await model.users.findOne({
      where: {
        face_app_id: id,
      },
    });
    if (!user) {
      // tạo user mới
      user = await model.users.create({
        face_app_id: id,
        email: email,
        full_name: name,
      });
    }

    let accessToken = createToken({ userId: user.user_id });
    return res.status(OK).json({
      message: "Đăng nhập thành công",
      data: accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const extendToken = async (req, res) => {
  try {
    //  lấy refresh token từ cookie của refresh
    let refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401);
    }
    // check rếh token trong database
    let userRefToken = await model.users.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!userRefToken) {
      return res.status(401);
    }
    // let newAccessToken = createToken({ userId: userRefToken.user_id });
    let newAccessToken = createTokenAsyncKey({ userId: userRefToken.user_id });

    return res.status(200).json({ message: "success", data: newAccessToken });
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const loginAsyncKey = async (req, res) => {
  try {
    // B1: lấy email và pass_ửod từ body request

    // B2: check user thông qua email(get user từ db)

    // B2.1: nếu không có user => ra error user not found
    // B2.2: nếu có user => kiểm tra pass
    // B2.2.1: nếu pass sai => ra error pass sai
    // B2.2.2: nếu pass đúng => trả về token

    let { email, pass_word, code } = req.body;
    let user = await model.users.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "Email is wrong" });
    }

    // let checkPass = bcrypt.compareSync(pass_word, user.pass_word);

    // if (!checkPass) {
    //   return res.status(400).json({ message: "Pass is wrong" });
    // }

    // // check code được nhập từ request
    // const verified = speakeasy.totp.verify({
    //   secret: user.secret,
    //   encoding: "base32",
    //   token: code
    // })

    // if(!verified) {
    //   return res.status(400).json({message: "Invalid 2FA"});
    // }

    let payload = {
      userId: user.user_id,
    };

    // dùng function sign cưa jwt
    // param 1: tạo payload và lưu vào token
    // param 2: key tạo token
    // param 3: thời gian token có hiệu lực và thuật toán để tạo token
    let accessToken = createTokenAsyncKey({ userId: user.user_id });

    // tạo refresh token
    let refreshToken = creatRefTokenAsyncKey({ userId: user.user_id });

    // lưu rrefresh token vào database
    await model.users.update(
      {
        refresh_token: refreshToken,
      },
      {
        where: {
          user_id: user.user_id,
        },
      }
    );

    // lưu refresh token vào cookie

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // cookie không thể truy cập được từ js để bảo mật
      secure: false, // dùng cho local, nếu chạy trên https set là true
      sameSite: "Lax", // đảm bảo cho cookie được gửi trong nhiều domain khác nhau
      maxAge: 7 * 24 * 60 * 60 * 1000, //thời gian tồn tại là 7 ngày
    });

    return res.status(OK).json({
      message: "Đăng nhập thành công",
      data: accessToken,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER).json({ message: "error" });
  }
};

const verifyAccessTokenAsyncKey = (req, res) => {
  let { token } = req.headers;
  let checkToken = verifyTokenAsyncKey(token);

  return res.status(OK).json({ checkToken });
};

export {
  register,
  login,
  loginFacebook,
  extendToken,
  loginAsyncKey,
  verifyAccessTokenAsyncKey,
};
