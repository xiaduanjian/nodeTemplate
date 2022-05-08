/*
 * @Author: xia.duanjian
 * @Date: 2022-05-07 21:40:28
 * @LastEditors: xia.duanjian
 * @LastEditTime: 2022-05-08 15:47:08
 * @Description: 系统用户业务逻辑控制
 */
const { User } = require("../models");
const { add, update, find, findOne, del } = require("./crudUtil");
const jwt = require("jsonwebtoken");
// 添加系统用户
const userAdd = async (ctx) => {
  const { userName, password } = ctx.request.body;
  await add(
    User,
    {
      userName,
      password,
    },
    ctx
  );
};

// 删除系统用户
const userDel = async (ctx) => {
  const { _id } = ctx.request.body;
  await del(
    User,
    {
      _id,
    },
    ctx
  );
};
// 获取系统用户
const userFind = async (ctx) => {
  await find(User, null, ctx);
};
// 获取单个系统用户
const userFindOne = async (ctx) => {
  const { id } = ctx.request.body;
  await findOne(
    User,
    {
      id,
    },
    ctx
  );
};

// 登录
const login = async (ctx) => {
  const { userName, password } = ctx.request.body;
  await User.findOne({
    userName,
    password,
  })
    .then((res) => {
      if (res) {
        const token = jwt.sign(
          {
            userName: res.userName,
            _id: res._id,
          },
          "template-jswt",
          {
            expiresIn: 3600 * 24 * 7,
          }
        );
        ctx.body = {
          code: 200,
          msg: "登录成功",
          token,
        };
      } else {
        ctx.body = {
          code: 401,
          msg: "用户名或密码错误",
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "登录发生异常",
        err,
      };
    });
};

// 注册
const register = async (ctx) => {
  const { userName, password, sex, desc, phone, email } = ctx.request.body;
  let isDouble = false;
  await User.findOne({
    userName,
  }).then((res) => {
    if (res) isDouble = true;
  });
  if (isDouble) {
    ctx.body = {
      code: 300,
      msg: "用户名已存在",
    };
    return;
  }
  await User.create({
    userName,
    password,
    sex,
    desc,
    phone,
    email,
  })
    .then((res) => {
      if (res) {
        ctx.body = {
          code: 200,
          msg: "注册成功",
          data: res,
        };
      } else {
        ctx.body = {
          code: 300,
          msg: "注册失败",
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "注册发生异常",
        err,
      };
    });
};

// 验证用户登录
const verifyToken = async (ctx) => {
  let token = ctx.header.authorization;
  token = token.replace("Bearer ", "");
  try {
    const result = jwt.verify(token, "template-jswt");
    await User.findOne({
      _id: result._id,
    }).then((res) => {
      if (res) {
        ctx.body = {
          code: 200,
          msg: "用户认证成功",
          data: res,
        };
      } else {
        ctx.body = {
          code: 401,
          msg: "用户认证失败",
        };
      }
    });
  } catch (err) {
    ctx.body = {
      code: 500,
      msg: "用户认证失败",
    };
  }
};
// 修改用户密码
const updatePassword = async (ctx) => {
  const { userName, password } = ctx.request.body;
  await User.updateOne(
    {
      userName,
    },
    {
      password,
    }
  )
    .then((res) => {
      if (res) {
        if (res.nModified) {
          ctx.body = {
            code: 200,
            msg: "密码修改成功",
          };
        } else {
          ctx.body = {
            code: 300,
            msg: "密码修改失败",
          };
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "修改密码发生异常",
      };
    });
};
// 修改用户
const userUpdate = async (ctx) => {
  const { _id, userName, password, avatar, sex, desc, phone, email } =
    ctx.request.body;
  await update(
    User,
    {
      _id,
    },
    {
      userName,
      password,
      avatar,
      sex,
      desc,
      phone,
      email,
    },
    ctx
  );
};
module.exports = {
  userAdd,
  userUpdate,
  userDel,
  userFind,
  userFindOne,
  login,
  register,
  verifyToken,
  updatePassword,
};
