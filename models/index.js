/*
 * @Author: xia.duanjian
 * @Date: 2022-05-07 20:13:42
 * @LastEditors: xia.duanjian
 * @LastEditTime: 2022-05-08 15:36:24
 * @Description: 模型对象
 */
const mongoose = require("mongoose");

// 系统用户模型对象
const userSchema = new mongoose.Schema({
  userName: String,
  password: {
    type: String,
    select: false,
  },
  avatar: String,
  sex: String,
  desc: String,
  phone: String,
  email: String
});
const User = mongoose.model("users", userSchema);

module.exports = {
  User,
};
