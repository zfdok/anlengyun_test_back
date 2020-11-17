const router = require('koa-router')()
router.prefix('/headernotice')
router.get('/', function (ctx, next) {
  let result = {}
  result.code = 0
  result.count = 6
  result.unreaded_count = 6
  result.data = [
    {
      msg_id: 1,
      type: "alert",
      title: '设备xxx传感器断开',
      time: '2020/11/23 14:50',
      readed: false,
      icon: "http://img.anlengyun.top/jinggao.png"
    },
    {
      msg_id: 2,
      type: "msg",
      title: '设备xxx在XXX上线',
      time: '2020/11/23 12:50',
      readed: false,
      icon: "http://img.anlengyun.top/youjian.png"
    },
    {
      msg_id: 3,
      type: "notice",
      title: '安冷云年终大促',
      time: '2020/11/23 14:50',
      readed: false,
      icon: "http://img.anlengyun.top/biaoqian.png"
    },
    {
      msg_id: 4,
      type: "alert",
      title: '设备xxx电量不足20%',
      time: '2020/11/23 14:50',
      readed: false,
      icon: "http://img.anlengyun.top/jinggao.png"
    },
    {
      msg_id: 5,
      type: "msg",
      title: '设备xxx完成了一次记录',
      time: '2020/11/23 12:50',
      readed: false,
      icon: "http://img.anlengyun.top/youjian.png"
    },
    {
      msg_id: 6,
      type: "notice",
      title: '安冷云新人礼',
      time: '2020/11/23 14:50',
      readed: false,
      icon: "http://img.anlengyun.top/biaoqian.png"
    },
  ]
  ctx.body = result
})

router.post('/readnotice', function (ctx, next) {
  console.log(ctx.request.body);
  ctx.body = {
    code: 0
  }
})

router.post('/getad', function (ctx, next) {
  console.log(ctx.request.body.index);
  let result = {}
  if (ctx.request.body.index == 3) {
    result.code = 0
    result.msg = "读取成功"
    result.ad_url = "https://www.baidu.com"
    result.ad_img = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605501018032&di=ba2a2b0c0da1ea093bf2bdd4db888313&imgtype=0&src=http%3A%2F%2Fimg.smzy.com%2FSoft%2FUploadPic%2F2016-12%2F2016122213521637227.jpg"
  } else if (ctx.request.body.index == 6) {
    result.code = 0
    result.msg = "读取成功"
    result.ad_url = "http://www.anleng-tec.com"
    result.ad_img = "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1776800304,2186450517&fm=26&gp=0.jpg"
  }
  else {
    result.code = -1
    result.msg = "读取失败"
  }
  ctx.body = result
})
module.exports = router