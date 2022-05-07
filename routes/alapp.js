var sqlAPI = require('../mysql/sqlAPI')
const router = require('koa-router')()
router.prefix('/alapp')

router.get('/', async (ctx, next) => {
  console.log("????");
  ctx.body = {
    data: "OK",
    code: 200
  }
})

router.get('/get_swiper', async (ctx, next) => {
  let result = {}
  result.data = await sqlAPI.sql_swiper_list()
  result.code = 200
  ctx.body = result
})

router.get('/get_news', async (ctx, next) => {
  let result = {}
  result.data = await sqlAPI.sql_news_list()
  result.code = 200
  ctx.body = result
})

router.get('/get_version', async (ctx, next) => {
  let result = {}
  let res = await sqlAPI.sql_app_info()
  result.data = res[0]
  if (res[0].version != ctx.request.query.version) {
    result.update_status = 1
  } else {
    result.update_status = 0
  }
  result.code = 200
  ctx.body = result
})

module.exports = router
