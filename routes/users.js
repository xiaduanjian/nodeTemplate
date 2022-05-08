/*
 * @Author: xia.duanjian
 * @Date: 2022-05-07 14:43:38
 * @LastEditors: xia.duanjian
 * @LastEditTime: 2022-05-08 15:48:45
 * @Description: 系统用户
 */
const router = require("koa-router")();
const {
  userAdd,
  userUpdate,
  userDel,
  userFind,
  userFindOne,
  login,
  register,
  verifyToken,
  updatePassword,
} = require("../controller/user");

router.prefix("/users");

// 添加系统用户
router.post("/add", userAdd);

// 删除系统用户
router.post("/del", userDel);

// 获取系统用户
router.get("/find", userFind);
// 查询单个用户
router.get("/find/:id", userFindOne);

// 登录
router.post("/login", login);
// 注册
router.post("/register", register);

// 验证用户登录
router.post("/verify", verifyToken);

// 修改密码
router.post("/updatePassword", updatePassword);

// 修改系统用户
router.post("/update/personal", userUpdate);
module.exports = router;
