var sqlAPI = require('../mysql/sqlAPI')
const router = require('koa-router')()
let briefPdf = require('../pdfgenner/brief_pdf')
const send = require('koa-send');
const fs = require('fs');
const path = require('path');

router.prefix('/history')
router.get('/', async (ctx, next) => {
  return { 1: 1 }
})

router.get('/get_device_history_list', async (ctx, next) => {
  let res = await sql_device_rec_history_list(ctx.request.query.device)
  ctx.body = res
})
//获取设备单次业务历史记录
router.get('/get_device_history', async (ctx, next) => {
  device_name = ctx.query.device;
  start_time = ctx.query.start_time;
  last_time = ctx.query.last_time;
  device_type = ctx.query.type;
  id = ctx.query.id;
  let res = await sqlAPI.sql_device_a_rec_all_info_by_time(ctx,device_name, device_type, start_time, last_time)
  ctx.body = res
})

router.get('/gen_report', async (ctx, next) => {
  filename = ctx.query.name;
  device_name = ctx.query.device_name;
  start_time = ctx.query.start_time;
  last_time = ctx.query.last_time;
  device_type = ctx.query.type;
  let data = await briefPdf.genPageData(filename, device_name, device_type, start_time, last_time)
  console.log(data.data.length);
  if (data.data.length > 3) {
    await briefPdf.genPdf(filename, data)
    ctx.body = { success: 1 }
  } else {
    ctx.body = { success: 0 }
  }
})
////////////////////////////////////////////////////////////////////////////
router.get('/get_report', async (ctx, next) => {
  filename = ctx.query.name;
  // 设置头类型, 如果不设置，会直接下载该页面
  ctx.type = 'pdf';
  // 读取文件
  const pathUrl = path.join(__dirname, `/static/${filename}.pdf`);
  console.log("=====================================");
  console.log(pathUrl);
  ctx.body = fs.createReadStream(pathUrl);
  ctx.set('Content-disposition', 'attachment;filename=' + `${filename}.pdf;filename*=UTF-8`);
})


router.post('/set_rec_info', async (ctx, next) => {
  const res = ctx.request.body.data
  await sqlAPI.sql_update_rec_info(res)
  ctx.body = { success: 1 }
})

////////////////////////////////////////////////////////////////////////////
module.exports = router