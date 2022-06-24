const { query } = require("../mysql/query"); //引入异步查询方法
const { INSERT_DATA, QUERY_DATAS_BY_WHERE, QUERY_A_DATA_BY_WHERE, UPDATE_DATA, UPDATE_DATAS, QUERY_DATAS_BY_WHERES, QUERY_DATAS_BY_WHERES_LIMIT, QUERY_DATAS_BY_WHERE_LIMIT, QUERY_SOME_DATAS_BY_WHERES } = require("../mysql/sql"); //部分引入sql库


//--------------------用户方面------------------------------//
let sql_user_by_name = async (name) => {
  res = await query(QUERY_DATAS_BY_WHERES("alyun.users", `username='${name}'`))
  if (res.length) {
    return res[0]
  } else {
    return false
  }
}
// 更新用户信息
let update_user_by_name = async (username, user_group_name, commpany, address, email, sms_span, sms_day_limit, alert_phones) => {
  res = await query(UPDATE_DATAS("alyun.users", `user_group_name = '${user_group_name}',commpany = '${commpany}',address='${address}',email='${email}',sms_day_limit=${sms_day_limit},sms_span=${sms_span},alert_phones='${alert_phones}'`, "username", `'${username}'`));
  return true
}
// 获取用户密码
let sql_use_pass_by_name = async (username) => {
  res = await query(QUERY_DATAS_BY_WHERES("alyun.users", `username='${username}'`))
  if (res.length) {
    return res[0].password
  } else {
    return false
  }
}

// 重置用户单日短信限额
let update_sms_day_count_by_name = async (username, num) => {
  res = await query(UPDATE_DATAS("alyun.users", `sms_day_count=${num}`, "username", `'${username}'`));
  return true
}
// 通过用户名获取用户组名
sql_groupid_by_user = async (username) => {
  await query('set names utf8')
  let query_res = await query(QUERY_A_DATA_BY_WHERE("alyun.users", "username", username, "user_group_id"));
  return query_res[0].user_group_id
}
// 修改用户密码
let update_user_pass = async (username, password) => {
  res = await query(UPDATE_DATAS("alyun.users", `password = '${password}'`, "username", `'${username}'`));
  console.log(res);
  return true
}

// 修改用户手机号
let update_user_phone = async (username, phone) => {
  res = await query(UPDATE_DATAS("alyun.users", `phone = '${phone}'`, "username", `'${username}'`));
  console.log(res);
  return true
}
//--------------------设备方面------------------------------//
// 通过设备号获取用户组名
let sql_groupid_by_device = async (device_name) => {
  return await query(QUERY_A_DATA_BY_WHERE("alyun.devices", "device_name", device_name, "user_group_id"));
}
// 通过用户组名获取设备信息
let sql_devices_by_groupid = async (groupid) => {
  console.log(groupid);
  let res = await query(QUERY_DATAS_BY_WHERE("alyun.devices", "user_group_id", `${groupid}`));
  if (res.length) {
    return res
  } else {
    return false
  }
}
// 更新设备设置
let update_setting_data = async (device_name, temp_alarm, tempL, tempU, period) => {
  return await query(UPDATE_DATAS("alyun.devices", `temp_alarm = ${temp_alarm},tempL=${tempL},tempU=${tempU},period=${period}`, "device_name", `'${device_name}'`));
}
// 获取某设备记录历史
let sql_device_rec_history_list = async (device_name) => {
  return await query(QUERY_DATAS_BY_WHERE_LIMIT("alyun.device_rec_timerecord", "device_name", device_name, 50, "id", "desc"));
}
// 获取某设备某条记录业务
let sql_rec_timerecord_by_id = async (device_name, start_time) => {
  await query('set names utf8')
  return await query(QUERY_DATAS_BY_WHERES("alyun.device_rec_timerecord", `device_name = '${device_name}' and start_time ='${start_time}'`));
}
// 获取设备历史(时间模式)
let sql_device_rec_by_time = async (device_name, device_type, start_time, last_time) => {
  if (device_type == "zx") {
    return await query(QUERY_SOME_DATAS_BY_WHERES("alyun.zx_device_history", `device_name = '${device_name}' and timestamp between '${start_time}' and '${last_time}'`, "timestamp,temp"));
  }
}
//获取某设备一段记录的所有信息
let sql_device_a_rec_all_info_by_time = async (ctx, device_name, device_type, start_time, last_time) => {
  if (device_type == ctx.state.projectID_zx) {
    console.log("获取某设备一段记录的所有信息");
    return await query(QUERY_DATAS_BY_WHERES("alyun.zx_device_history", `device_name = '${device_name}' and timestamp between '${start_time}' and '${last_time}'`));
  }
}
// 更新设备单次业务信息
let sql_update_rec_info = async (data) => {
  await query('set names utf8')
  return await query(UPDATE_DATAS("alyun.device_rec_timerecord",
    `goods_name = '${data.goods_name}',goods_type='${data.goods_type}',goods_count='${data.goods_count}',goods_all_count='${data.goods_all_count}',
    sender_name='${data.sender_name}',sender_phone='${data.sender_phone}',sender_address='${data.sender_address}',
    transer_name='${data.transer_name}',transer_phone='${data.transer_phone}',
    reciver_name='${data.reciver_name}',reciver_phone='${data.reciver_phone}',reciver_address='${data.reciver_address}'`,
    "id", `'${data.id}'`));
}
//更新devices数据表的前几项要素
let updateDeviceAndGroupInfo = async (deviceInfo) => {
  let query_device_exist = await query(QUERY_A_DATA_BY_WHERE("alyun.devices", "device_name", deviceInfo.device_name, "user_group_id"));
  let query_res
  if (query_device_exist[0]) {
    query_res = await query(UPDATE_DATAS("alyun.devices", `user_group_id = '${deviceInfo.group_id}',product_id='${deviceInfo.product_id}'`, "device_name", `'${deviceInfo.device_name}'`));//异步方法调用
  } else {
    query_res = await query(INSERT_DATA(
      "alyun.devices",
      "device_name,user_group_id,product_id",
      `'${deviceInfo.device_name}','${deviceInfo.group_id}','${deviceInfo.product_id}'`
    ));//异步方法调用
  }
  console.log(query_res);
  return query_res;
}
// 通过设备号获取设备信息
let sql_info_by_device = async (device_name) => {
  let res = await query(QUERY_DATAS_BY_WHERE("alyun.devices", "device_name", `${device_name}`));
  return res
}
// 通过设备名更新标签
let update_tags_by_device = async (device_name, tag) => {
  let res = await query(UPDATE_DATAS("alyun.devices", `tag = '${tag}'`, "device_name", `'${device_name}'`));
  return res
}
//--------------------消息方面------------------------------//
// 获取未读消息
let sql_unreaded_notice = async (username) => {
  await query('set names utf8')
  res = await query(QUERY_DATAS_BY_WHERES("alyun.user_notice", `username='${username}' and readed = 0`))
  return res
}

let sql_unreaded_notices = async (username) => {
  await query('set names utf8')
  res = await query(QUERY_DATAS_BY_WHERES_LIMIT("alyun.user_notice", `username='${username}' and readed = 0`, 50, "msg_id", "desc"))
  return res
}
// 更新已读消息
let update_readed = async (msg_id) => {
  return await query(UPDATE_DATA("alyun.user_notice", "readed", 1, "msg_id", msg_id))
}
// 更新消息初次显示
let update_firstshow = async (msg_id) => {
  return await query(UPDATE_DATA("alyun.user_notice", "first_show", 1, "msg_id", msg_id))
}
//--------------------APP------------------------------//
// 更新APP轮播图
let sql_swiper_list = async () => {
  res = await query(QUERY_DATAS_BY_WHERES_LIMIT("alyun.app_swiper_list", `id>0`, 5, "id", "desc"))
  return res
}

let sql_news_list = async () => {
  res = await query(QUERY_DATAS_BY_WHERES_LIMIT("alyun.news", `id>0`, 20, "id", "desc"))
  return res
}

let sql_app_info = async () => {

  res = await query(QUERY_DATAS_BY_WHERES("alyun.app_info", `idapp_info=1`));
  return res
}

module.exports = {
  sql_user_by_name,
  update_user_pass,
  update_user_phone,
  sql_use_pass_by_name,
  update_sms_day_count_by_name,
  update_user_by_name,
  sql_unreaded_notice,
  sql_unreaded_notices,
  sql_devices_by_groupid,
  sql_device_rec_history_list,
  sql_groupid_by_user,
  sql_groupid_by_device,
  update_setting_data,
  update_readed,
  update_firstshow,
  sql_device_rec_by_time,
  sql_rec_timerecord_by_id,
  sql_update_rec_info,
  sql_device_a_rec_all_info_by_time,
  sql_swiper_list,
  sql_news_list,
  sql_app_info,
  updateDeviceAndGroupInfo,
  sql_info_by_device,
  update_tags_by_device,
}