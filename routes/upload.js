/*
 * @Author: xia.duanjian
 * @Date: 2022-05-08 09:55:31
 * @LastEditors: xia.duanjian
 * @LastEditTime: 2022-05-08 11:31:33
 * @Description: 文件上传模块
 */
const multer = require("koa-multer");
const fs = require("fs");
const path = require("path");
const router = require("koa-router")();
router.prefix("/upload");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dir = `public/uploads/${year}${month}${day}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // 设置上传文件名称
    const fileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });
// 上传图片接口
router.post("/uploadImg", upload.single("file"), async (ctx) => {
  let path = ctx.req.file.path;
  path = ctx.origin + path.replace("public", "");
  ctx.body = {
    data: path,
  };
});

module.exports = router;
