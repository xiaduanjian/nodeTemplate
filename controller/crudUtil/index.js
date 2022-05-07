/*
 * @Author: xia.duanjian
 * @Date: 2022-05-07 21:57:46
 * @LastEditors: xia.duanjian
 * @LastEditTime: 2022-05-07 22:30:01
 * @Description: crud基本操作功能-公共封装
 */

// 添加
const add = (model, where ,ctx) => {
  return model.create(where).then(res => {
    if (res) {
      ctx.body = {
        code: 200,
        msg: '添加成功！',
        data: res
      }
    } else {
      ctx.body = {
        code: 300,
        msg: '添加失败！'
      }
    }
  }).catch(err => {
    ctx.body = {
      code: 400,
      msg: '添加时出现异常'
    }
    console.error(err)
  })
}
// 修改
const update = (model, where, params ,ctx) => {
  return model.updateOne(where, params).then(res => {
    if (res) {
      ctx.body = {
        code: 200,
        msg: '修改成功！',
        data: res
      }
    } else {
      ctx.body = {
        code: 300,
        msg: '修改失败！'
      }
    }
  }).catch(err => {
    ctx.body = {
      code: 400,
      msg: '修改时出现异常'
    }
    console.error(err)
  })
}
// 删除
const del = (model, where ,ctx) => {
  return model.findOneAndDelete(where).then(res => {
    if (res) {
      ctx.body = {
        code: 200,
        msg: '删除成功！',
        data: res
      }
    } else {
      ctx.body = {
        code: 300,
        msg: '删除失败！'
      }
    }
  }).catch(err => {
    ctx.body = {
      code: 400,
      msg: '删除时出现异常'
    }
    console.error(err)
  })
}

// 查询-全部
const find = (model, where ,ctx) => {
  return model.find(where).then(res => {
    ctx.body = {
      code: 200,
      msg: '查询成功！',
      data: res
    }
  }).catch(err => {
    ctx.body = {
      code: 400,
      msg: '查询时出现异常'
    }
    console.error(err)
  })
}
// 查询-单个查询
const findOne = (model, where ,ctx) => {
  return model.findOne(where).then(res => {
    ctx.body = {
      code: 200,
      msg: '查询成功！',
      data: res
    }
  }).catch(err => {
    ctx.body = {
      code: 400,
      msg: '查询时出现异常'
    }
    console.error(err)
   })
}
module.exports = {
  add,
  update,
  del,
  find,
  findOne
}
