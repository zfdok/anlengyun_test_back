var sqlAPI = require('../mysql/sqlAPI')
const router = require('koa-router')()
router.prefix('/headernotice')
router.get('/', async (ctx, next) => {
  let result = {}
  result.data = await sqlAPI.sql_unreaded_notice(ctx.request.query.user)
  result.code = 200
  result.count = result.data.length
  result.unreaded_count = result.data.length
  ctx.body = result
})

router.get('/getnotice', async (ctx, next) => {
  let result = {}
  result.data = await sqlAPI.sql_unreaded_notices(ctx.request.query.user)
  result.code = 200
  result.count = result.data.length
  result.unreaded_count = result.data.length
  ctx.body = result
})


router.post('/readnotice', async (ctx, next) => {
  let msg_id
  if (ctx.request.body.params != undefined) {
    msg_id = ctx.request.body.params.msg_id
  } else {
    msg_id = ctx.request.body.index
  }
  await sqlAPI.update_readed(msg_id)
  ctx.body = {
    code: 200
  }
})


router.get('/firstshow_readed', async (ctx, next) => {
  console.log("result!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.log(ctx.request.query);
  let result = await sqlAPI.update_firstshow(ctx.request.query.msg_id)
  ctx.body = result
})

module.exports = router