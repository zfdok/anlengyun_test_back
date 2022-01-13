const { query } = require("../mysql/query"); //引入异步查询方法
const { QUERY_DATAS_BY_WHERE,QUERY_A_DATA_BY_WHERE, UPDATE_DATA, UPDATE_DATAS, QUERY_DATAS_BY_WHERES, QUERY_DATAS_BY_WHERE_LIMIT, QUERY_SOME_DATAS_BY_WHERES } = require("../mysql/sql"); //部分引入sql库


//--------------------用户方面------------------------------//
QUERY_DATAS_BY_WHERE
let sql_user_by_name = async(name)=>{
  res = await query(QUERY_DATAS_BY_WHERES("alyun.users", `username='${name}'`))
  console.log(res);
  if (res.length) {
    return res[0]
  }else{
    return false
  }
}

let update_user_by_name = async(username,user_group_name,commpany,address,email,sms_span,sms_day_limit)=>{
  res = await query(UPDATE_DATAS("alyun.users",  `user_group_name = '${user_group_name}',commpany = '${commpany}',address='${address}',email='${email}',sms_day_limit=${sms_day_limit},sms_span=${sms_span}`, "username", `'${username}'`));
  return true
}

//--------------------消息方面------------------------------//

let sql_unreaded_notice = async (username) => {
  console.log(username);
  await query('set names utf8')
  res = await query(QUERY_DATAS_BY_WHERES("alyun.user_notice", `username='${username}' and readed = 0`))
  return res
}
sql_groupid_by_user = async (username) => {
  await query('set names utf8')
  let query_res = await query(QUERY_A_DATA_BY_WHERE("alyun.users", "username", username, "user_group_id"));
  return query_res[0].user_group_id
}
sql_groupid_by_device = async (device_name) => {
  return await query(QUERY_A_DATA_BY_WHERE("alyun.devices", "device_name", device_name, "user_group_id"));
}
update_setting_data = async (device_name, temp_alarm, tempL, tempU, period) => {
  return await query(UPDATE_DATAS("alyun.devices", `temp_alarm = ${temp_alarm},tempL=${tempL},tempU=${tempU},period=${period}`, "device_name", `'${device_name}'`));
}
update_readed = async (msg_id) => {
  return await query(UPDATE_DATA("alyun.user_notice", "readed", 1, "msg_id", msg_id))
}

update_firstshow = async (msg_id) => {
  return await query(UPDATE_DATA("alyun.user_notice", "first_show", 1, "msg_id", msg_id))
}

sql_device_rec_history_list = async (device_name) => {
  return await query(QUERY_DATAS_BY_WHERE_LIMIT("alyun.device_rec_timerecord", "device_name", device_name, 20, "id", "desc"));
}

sql_rec_timerecord_by_id = async (device_name, start_time) => {
  await query('set names utf8')
  return await query(QUERY_DATAS_BY_WHERES("alyun.device_rec_timerecord", `device_name = '${device_name}' and start_time ='${start_time}'`));
}

sql_device_rec_by_time = async (device_name, device_type, start_time, last_time) => {
  if (device_type == "zx") {
    return await query(QUERY_SOME_DATAS_BY_WHERES("alyun.zx_device_history", `device_name = '${device_name}' and timestamp between '${start_time}' and '${last_time}'`, "timestamp,temp"));
  }
}

//获取一段记录的所有信息
sql_device_a_rec_all_info_by_time = async (ctx,device_name, device_type, start_time, last_time) => {
  if (device_type == ctx.state.projectID_zx) {
    return await query(QUERY_DATAS_BY_WHERES("alyun.zx_device_history", `device_name = '${device_name}' and timestamp between '${start_time}' and '${last_time}'`));
  }
}
sql_update_rec_info = async (data) => {
  await query('set names utf8')
  return await query(UPDATE_DATAS("alyun.device_rec_timerecord",
    `goods_name = '${data.goods_name}',goods_type='${data.goods_type}',goods_count='${data.goods_count}',goods_all_count='${data.goods_all_count}',
    sender_name='${data.sender_name}',sender_phone='${data.sender_phone}',sender_address='${data.sender_address}',
    transer_name='${data.transer_name}',transer_phone='${data.transer_phone}',
    reciver_name='${data.reciver_name}',reciver_phone='${data.reciver_phone}',reciver_address='${data.reciver_address}'`,
    "id", `'${data.id}'`));
}


module.exports = {
  sql_user_by_name,
  update_user_by_name,
  sql_unreaded_notice,
  sql_groupid_by_user,
  sql_groupid_by_device,
  update_setting_data,
  update_readed,
  update_firstshow,
  sql_device_rec_by_time,
  sql_rec_timerecord_by_id,
  sql_update_rec_info,
  sql_device_a_rec_all_info_by_time,
}