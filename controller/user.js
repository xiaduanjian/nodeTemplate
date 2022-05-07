/*
 * @Author: xia.duanjian
 * @Date: 2022-05-07 21:40:28
 * @LastEditors: xia.duanjian
 * @LastEditTime: 2022-05-07 22:24:07
 * @Description: 系统用户业务逻辑控制
 */
const {User} = require('../models')
const { add, update, find, findOne, del } = require('./crudUtil')
// 添加系统用户
const userAdd = async (ctx) => {
  const { userName, password } = ctx.request.body
  await add(User, {userName, password}, ctx)
}

// 修改系统用户
const userUpdate = async (ctx) => {
  const {_id, userName, password} = ctx.request.body
  await update(User, {_id}, {userName, password}, ctx)
}
// 删除系统用户
const userDel = async (ctx) => {
  const {_id} = ctx.request.body
  await del(User, {_id}, ctx)
}
// 获取系统用户
const userFind = async (ctx)=> {
  await find(User, null, ctx)
}
// 获取单个系统用户
const userFindOne = async (ctx)=> {
  const {id} = ctx.request.body
  await findOne(User, {id}, ctx)
}
module.exports = {
  userAdd,
  userUpdate,
  userDel,
  userFind,
  userFindOne
}