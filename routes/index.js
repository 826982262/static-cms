const router = require('koa-router')()

const {imgPath,imgEndpoint,webPath} = require('../config/config.default.js');
const ApiService = require('../service/fileService')

// 获取图片资源

// 获取svg资源

router.get('/api/admin/fildFile', async (ctx, next) => {
  await ApiService.findImagesFile(ctx, next)
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
