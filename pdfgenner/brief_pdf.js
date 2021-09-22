const js_PDF = require('jspdf')
var sqlAPI = require('../mysql/sqlAPI')
const drawtools = require('./drawtools/drawtools')
const pageOne = require('./pages/pageOne')
const pageData = require('./pages/pageData')

require('./assets/regular-normal')
require('./assets/shbold-bold3')

genPageData = async (filename, device_name, device_type, start_time, last_time) => {
  let data = {
    reportNo: filename,
    reportTitle: '智能温度监测数据监测报告',
  }
  //1. 获取数据 
  let data_list = await sqlAPI.sql_device_rec_by_time(device_name, device_type, start_time, last_time)
  let data_info = await sqlAPI.sql_rec_timerecord_by_id(device_name, start_time)
  //2. 整理data
  //2.1. 数据记录表
  data.data = data_list
  //2.2. 页面统计
  data.pageCount = Math.floor(data.data.length / 200) + 2
  //2.3 货物信息
  data.hwxx = {
    name: data_info[0].goods_name,
    type: data_info[0].goods_type,
    count: data_info[0].goods_count,
    all_count: data_info[0].goods_all_count,
    lowerLimit: data_info[0].tempL,
    upperLimit: data_info[0].tempU,
  }
  //2.4 承运信息
  data.cyxx = {
    sender_name: data_info[0].sender_name,
    sender_phone: data_info[0].sender_phone,
    sender_address: data_info[0].sender_address,
    sender_timestamp: start_time,
    transer_name: data_info[0].transer_name,
    transer_phone: data_info[0].transer_phone,
    transer_start_timestamp: start_time,
    transer_end_timestamp: last_time,
    reciver_name: data_info[0].reciver_name,
    reciver_phone: data_info[0].reciver_phone,
    reciver_address: data_info[0].reciver_address,
    reciver_timestamp: data_info[0].last_time,
  }
  //2.5 承运信息
  let over_upper_count = 0
  let over_lower_count = 0
  data_list.forEach(data => {
    if (data.temp > data_info[0].tempU)
      over_upper_count++
    if (data.temp < data_info[0].tempL)
      over_lower_count--
  });
  data.fxjg = {
    start_timestamp: start_time,
    last_timestamp: last_time,
    lowerLimit: data_info[0].tempL,
    upperLimit: data_info[0].tempU,
    over_lower_count: over_lower_count,
    over_upper_count: over_upper_count,
    recspan: data_info[0].recspan,
    count: data_list.length,
    rw_flag: over_lower_count + over_upper_count == 0 ? true : false
  }
  //2.6
  if (device_type == "zx") {
    data.device = {
      type: "在线监测仪",
      name: device_name,
      sencer: {
        type: "数字温湿度",
        precision: 0.5,
        resolution: 0.1
      },
      network_type: "2G/GSM",
    }
  }

  return data
}

genPdf = async (filename, data) => {
  const doc = new js_PDF.jsPDF();
  data.reportNo = filename
  await draw_pageOne(doc, data)
  await draw_pageDatas(doc, data)
  doc.save(`./routes/static/${filename}.pdf`);
}

draw_pageOne = async (doc, data) => {
  doc.setFont('regular');
  let ybase = 10;
  drawtools.drawHeader(doc, data.reportNo, ybase);
  drawtools.drawLogo(doc, 140, 14, 1.7);
  ybase += 20;
  drawtools.drawTitles(doc, data.reportTitle, 25, 50, ybase);
  ybase += 10;
  pageOne.drawHwxx(doc, data.hwxx, ybase);
  ybase += 25;
  pageOne.drawCyxx(doc, data.cyxx, ybase);
  ybase += 65;
  pageOne.drawFxjg(doc, data.fxjg, ybase);
  pageOne.drawRWIcon2(doc, data.fxjg.rw_flag, 172, ybase + 5);
  ybase += 35;
  pageOne.drawDevice(doc, data.device, ybase);
  ybase += 25;
  pageOne.drawChart(doc, data.data, data.hwxx.upperLimit, data.hwxx.lowerLimit, ybase);
  drawtools.drawPageNo(doc, 1, data.pageCount)
  doc.addPage();
}

draw_pageDatas = async (doc, data) => {
  //整理数据
  let page_count = data.pageCount - 1
  for (let i = 0; i < page_count; i++) {
    let page_data = data.data.slice(200 * i, 200 * (i + 1))
    draw_pageData(doc, data, page_data, i + 2)
    if (i != page_count - 1) {
      doc.addPage();
    }
  }
}

//绘制页面
draw_pageData = async (doc, data, page_data, page_No) => {
  doc.setFont('regular');
  let ybase = 10;
  drawtools.drawHeader(doc, data.reportNo, ybase);
  drawtools.drawLogo(doc, 140, 14, 1.7);
  ybase += 20;
  drawtools.drawTitles(doc, "监测数据记录表", 25, 70, ybase);
  ybase += 10;
  pageData.drawTableHeader(doc, ybase)
  ybase += 8;
  pageData.drawData(doc, page_data, ybase)





  drawtools.drawPageNo(doc, page_No, data.pageCount)
}
module.exports = { genPageData, genPdf }