/*
 * @Author: xia.duanjian
 * @Date: 2022-05-09 22:27:56
 * @LastEditors: xia.duanjian
 * @LastEditTime: 2022-05-11 15:30:57
 * @Description: 菜单控制器
 */
const { Menu } = require("../models/menu");
const { add, find } = require("./crudUtil");
// 发布文章
const menuAdd = async (ctx) => {
  const { name, path, hidden=false, meta, children=[], parentId ="0" } = ctx.request.body;
  await add(
    Menu,
    {
      name, path, hidden, meta, children, parentId
    },
    ctx
  );
};
// 获取系统用户
const menuFind = async (ctx) => {
  await find(Menu, null, ctx);
};
module.exports = {
  menuAdd,
  menuFind
};
