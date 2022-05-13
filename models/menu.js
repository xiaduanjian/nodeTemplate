/*
 * @Author: xia.duanjian
 * @Date: 2022-05-09 22:04:50
 * @LastEditors: xia.duanjian
 * @LastEditTime: 2022-05-10 15:24:54
 * @Description: 菜单管理
 */
// 引入mongoose
const mongoose = require("mongoose");

// 菜单对象
const menuSchema = new mongoose.Schema({
  name: String,
  path: String,
  hidden: {
    type: Boolean,
    default: false
  },
  meta: {
    title: String,
    icon: String
  },
  children: null || Array,
  parentId: Array
});

const Menu = mongoose.model("menu", menuSchema);

module.exports = {
  Menu
};
