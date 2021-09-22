var sqlAPI = require('../mysql/sqlAPI')
const router = require('koa-router')()
router.prefix('/headernotice')
router.get('/', async (ctx, next) => {
  let result = {}
  result.data = await sqlAPI.sql_unreaded_notice(ctx.request.query.user)
  result.code = 0
  result.count = result.data.length
  result.unreaded_count = result.data.length
  ctx.body = result
})
router.post('/readnotice',  async (ctx, next) => {
  console.log(ctx.request.body);
  await sqlAPI.update_readed(ctx.request.body.index)
  ctx.body = {
    code: 0
  }
})

router.get('/firstshow_readed', async (ctx, next) => {
  console.log("result!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.log(ctx.request.query);
  let result = await sqlAPI.update_firstshow(ctx.request.query.msg_id)
  ctx.body = result
})

module.exports = router