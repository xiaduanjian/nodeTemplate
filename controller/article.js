/*
 * @Author: xia.duanjian
 * @Date: 2022-05-08 16:02:25
 * @LastEditors: xia.duanjian
 * @LastEditTime: 2022-05-08 17:22:38
 * @Description: 文章管理逻辑控制
 */
const Article = require("../models/article");
// 发布文章
const add = async (ctx) => {
  const { title, content } = ctx.request.body;
  await add(
    Article,
    {
      title,
      content,
    },
    ctx
  );
};

// 查询所有文章(分页)
const findAll = async (ctx) => {
  const { page, author } = ctx.request.body;
  if (!page || isNaN(Number(page))) {
    page = 1;
  } else {
    page = Number(page);
  }
  const pageSize = 10;
  // 计算总页数
  let total = 0;
  await Article.countDocuments({ author }).count.then((res) => {
    total = res;
  });
  let totalPage = 0;
  if (total > 0) {
    totalPage = Math.ceil(total / pageSize);
  }
  // 判断当前页码范围
  if (totalPage > 0 && page > totalPage) {
    page = totalPage;
  } else if (page < 1) {
    page = 1;
  }
  // 计算起始位置
  const start = (page - 1) * pageSize;
  await Article.find({ author })
    .skip(start)
    .limit(pageSize)
    .then((res) => {
      if (res && res.length > 0) {
        ctx.body = {
          code: 200,
          msg: "查询成功",
          data: res,
          page,
          pageSize,
          total,
        };
      } else {
        ctx.body = {
          code: 300,
          msg: "没有查询到文章",
          data: null,
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "查询发生异常",
        err,
      };
    });
};

// 查询单个文章
const findOne = async (ctx) => {
  const { id } = ctx.query;
  await Article.findOne({ id })
    .then((res) => {
      if (res) {
        ctx.body = {
          code: 200,
          msg: "查询成功",
          data: res,
        };
      } else {
        ctx.body = {
          code: 300,
          msg: "查询失败",
          data: null,
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "查询发生异常",
        err,
      };
    });
};

module.exports = {
  add,
  findAll,
  findOne,
};
