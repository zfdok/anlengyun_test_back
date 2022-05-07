var sqlAPI = require('../mysql/sqlAPI')
const router = require('koa-router')()
let briefPdf = require('../pdfgenner/brief_pdf')
const send = require('koa-send');
const fs = require('fs');
const path = require('path');

router.prefix('/history')

//根据前端传入的type确定产品类型
function get_product_type(ctx, type) {
  let product_id = type
  switch (type) {
    case 'zx':
      product_id = ctx.state.projectID_zx
      break;
    case 'ly':
      product_id = ctx.state.projectID_ly
      break;
    case 'znbwx':
      product_id = ctx.state.projectID_znbwx
      break;
    case 'llc':
      product_id = ctx.state.projectID_llc
      break;
    case 'zhlk':
      product_id = ctx.state.projectID_zhlk
      break;
    case 'lcjzx':
      product_id = ctx.state.projectID_lcjzx
      break;
    case 'ylbwx':
      product_id = ctx.state.projectID_ylbwx
      break;
    default:
      break;
  }
  return product_id;
}

function get_time_str(timestamp) {
  console.log(timestamp);
  let date = new Date(parseInt(timestamp));
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  timestr = year + '-' + month + '-' + day + ' ' + hour + ":" + min + ":" + sec;
  console.log(timestr); // 2018-10-09
  return timestr;
}
// 将生成的PDF传给安冷云主站
function restore_pdf(filename) {
  let to = path.join("/data/anlengyun/report/", `${filename}.pdf`)
  let from = path.join(__dirname, `/static/${filename}.pdf`)
  fs.writeFileSync(to, fs.readFileSync(from));
}
//-------------------------------------------
router.get('/', async (ctx, next) => {
  return { 1: 1 }
})

router.get('/get_device_history_list', async (ctx, next) => {
  console.log(ctx.request.query.device)
  let res = await sqlAPI.sql_device_rec_history_list(ctx.request.query.device)
  console.log(res);
  ctx.body = {
    "success": true,
    code: 200,
    msg: "请求成功",
    data: res
  }
})
//获取设备单次业务历史记录
router.get('/get_device_history', async (ctx, next) => {
  let device_name = ctx.query.device;
  let start_time = ctx.query.start_time;
  let last_time = ctx.query.last_time;
  let device_type = get_product_type(ctx, ctx.query.type)
  id = ctx.query.id;
  let res = await sqlAPI.sql_device_a_rec_all_info_by_time(ctx, device_name, device_type, start_time, last_time)
  console.log("获取某设备一段记录成功");
  ctx.body = {
    "success": true,
    code: 200,
    msg: "请求成功",
    data: res
  }

})
//获取设备某段时间历史记录
router.get('/get_device_historys_by_time', async (ctx, next) => {
  let device_name = ctx.query.device_name;
  let start_time = get_time_str(ctx.query.start_time);
  let last_time = get_time_str(ctx.query.last_time);
  let device_type = get_product_type(ctx, ctx.query.type)
  let res = await sqlAPI.sql_device_a_rec_all_info_by_time(ctx, device_name, device_type, start_time, last_time)
  ctx.body = {
    "success": true,
    code: 200,
    msg: "请求成功",
    data: res
  }
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
    restore_pdf(filename)
    ctx.body = { data: { success: 1, url: `https://anlengyun.com/report/${filename}.pdf` }, code: 200 }
  } else {
    ctx.body = { data: { success: 0 }, code: 400 }
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

////////////////////////////////////////////////////////////////////////////
router.post('/set_rec_info', async (ctx, next) => {
  const res = ctx.request.body.data
  await sqlAPI.sql_update_rec_info(res)
  ctx.body = { success: 1 }
})
router.get('/app_set_rec_info', async (ctx, next) => {
  const res = ctx.query
  console.log(res);
  await sqlAPI.sql_update_rec_info(res)
  ctx.body = { data: { success: 1 }, code: 200 }
})
////////////////////////////////////////////////////////////////////////////
module.exports = router