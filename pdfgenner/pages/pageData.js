require('../assets/simsun-normal')

drawTableHeader = (doc, y) => {
  doc.setDrawColor(60, 60, 60)
  doc.setLineWidth(0.5)
  doc.line(10, y, 200, y)
  doc.line(10, y + 8, 200, y + 8)
  //标题
  doc.setFont('simsun')
  doc.setFontSize(10);
  let str1 = ` 日期     时间    温度(℃)`
  doc.text(12, y + 5, str1)
  doc.text(12 + 47.5, y + 5, str1)
  doc.text(12 + 95, y + 5, str1)
  doc.text(12 + 142.5, y + 5, str1)

  //结束
  doc.line(10, 280, 200, 280)
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.3)
  doc.line(57.5, y, 57.5, 280)
  doc.line(105, y, 105, 280)
  doc.line(152.5, y, 152.5, 280)
}
drawData = (doc, data, y) => {
  doc.setFont('simsun')
  doc.setFontSize(9);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 50; j++) {
      let temp_time = data[i * 50 + j] ? data[i * 50 + j].timestamp : ""
      let temp_temp = data[i * 50 + j] ? data[i * 50 + j].temp.toFixed(2) : ""
      doc.text(11 + i * 47.5, y + 4.6 * (j + 1), `${temp_time}   ${temp_temp}`)
    }
  }
}
module.exports = {
  drawTableHeader,
  drawData,
}