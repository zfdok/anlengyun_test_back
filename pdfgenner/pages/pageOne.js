require('../assets/simsun-normal')

let titleSize = 18
let titleXOffset = 13
let textSize = 12
let textXOffset = 35
let textXOffset2 = 140

drawHwxx = (doc, hwxx, y) => {
  doc.setDrawColor(60, 60, 60)
  doc.setLineWidth(0.5)
  doc.line(10, y, 200, y)
  //标题
  doc.setFont('simsun')
  doc.setFontSize(titleSize);
  doc.text(titleXOffset, y + 10, `货物`)
  doc.text(titleXOffset, y + 10 * 2, `信息`)
  //信息
  doc.setFontSize(textSize);
  doc.text(textXOffset, y + 10, `名称: ${hwxx.name}`)
  doc.text(textXOffset2, y + 10, `品类: ${hwxx.type}`)
  doc.text(textXOffset, y + 2 * 10, `数量: 第${hwxx.count}件, 共${hwxx.all_count}件`)
  doc.text(textXOffset2, y + 2 * 10, `温度限定: ${hwxx.lowerLimit}℃~${hwxx.upperLimit}℃`)
  //结束
  doc.line(10, y + 25, 200, y + 25)
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.3)
  doc.line(30, y + 3, 30, y + 25 - 3)
}
drawCyxx = (doc, cyxx, y) => {
  doc.setDrawColor(60, 60, 60)
  doc.setLineWidth(0.5)
  doc.line(10, y, 200, y)
  //标题
  doc.setFont('simsun')
  doc.setFontSize(titleSize);
  doc.text(titleXOffset, y + 10 * 2, `货物`)
  doc.text(titleXOffset, y + 10 * 3, `承运`)
  doc.text(titleXOffset, y + 10 * 4, `信息`)
  //信息
  doc.setFontSize(textSize);
  doc.text(textXOffset, y + 10, `发货方: ${cyxx.sender_name}`)
  doc.text(textXOffset2, y + 10, `联系方式: ${cyxx.sender_phone}`)
  doc.text(textXOffset, y + 2 * 10, `发货地点: ${cyxx.sender_address}`)
  doc.text(textXOffset2, y + 2 * 10, `发货时间: ${cyxx.sender_timestamp}`)

  doc.text(textXOffset, y + 3 * 10, `承运方: ${cyxx.transer_name}`)
  doc.text(textXOffset2, y + 3 * 10, `联系方式: ${cyxx.transer_phone}`)
  doc.text(textXOffset, y + 4 * 10, `发货时间: ${cyxx.transer_start_timestamp}`)
  doc.text(textXOffset2, y + 4 * 10, `交付时间: ${cyxx.transer_end_timestamp}`)

  doc.text(textXOffset, y + 5 * 10, `收货方: ${cyxx.reciver_name}`)
  doc.text(textXOffset2, y + 5 * 10, `联系方式: ${cyxx.reciver_phone}`)
  doc.text(textXOffset, y + 6 * 10, `收货地点: ${cyxx.reciver_address}`)
  doc.text(textXOffset2, y + 6 * 10, `收货时间: ${cyxx.reciver_timestamp}`)
  //结束
  doc.line(10, y + 65, 200, y + 65)
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.3)
  doc.line(30, y + 3, 30, y + 65 - 3)
  doc.line(35, y + 23.75, 200, y + 23.75)
  doc.line(35, y + 43.75, 200, y + 43.75)
}
drawFxjg = (doc, fxjg, y) => {
  doc.setDrawColor(60, 60, 60)
  doc.setLineWidth(0.5)
  doc.line(10, y, 200, y)
  //标题
  doc.setFont('simsun')
  doc.setFontSize(titleSize);
  doc.text(titleXOffset, y + 10 * 1, `数据`)
  doc.text(titleXOffset, y + 10 * 2, `监测`)
  doc.text(titleXOffset, y + 10 * 3, `结果`)
  // 信息
  doc.setFontSize(textSize);
  doc.text(textXOffset, y + 10, `本次运输过程中,自${fxjg.start_timestamp}起,至${fxjg.last_timestamp}止,`)
  doc.text(textXOffset, y + 20, `每${fxjg.recspan}分钟记录一次,共记录${fxjg.count}条数据. 预设温度上限:${fxjg.upperLimit}℃,超限${fxjg.over_upper_count}次.`)
  doc.text(textXOffset, y + 30, `预设温度下限:${fxjg.lowerLimit}℃,超限${fxjg.over_lower_count}次.运输过程${fxjg.rw_flag ? '符合' : '不符合'}要求!`)
  //结束
  doc.line(10, y + 35, 200, y + 35)
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.3)
  doc.line(30, y + 3, 30, y + 35 - 3)
  doc.line(170, y + 3, 170, y + 35 - 3)
}
drawRWIcon = (doc, rw_flag, x, y) => {
  rightImage = 'data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NSA3OS4xNjM0OTksIDIwMTgvMDgvMTMtMTY6NDA6MjIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2MEIyQkI3QTEyMDUxMUVDODQwMEVCQ0IxMzg4NjYyMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2MEIyQkI3QjEyMDUxMUVDODQwMEVCQ0IxMzg4NjYyMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjYwQjJCQjc4MTIwNTExRUM4NDAwRUJDQjEzODg2NjIzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjYwQjJCQjc5MTIwNTExRUM4NDAwRUJDQjEzODg2NjIzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAZABkAwERAAIRAQMRAf/EAJkAAQADAQEBAQAAAAAAAAAAAAAEBgcBBQIIAQEAAgMBAQAAAAAAAAAAAAAABQYBAwQHAhAAAgIBAgMFBAgGAwAAAAAAAQIABAMRBSFBBjFRYRIykdFCFPBxgbHBIuIT4VJiwiNDUxUHEQACAQIEAwcDAgcAAAAAAAAAAQIDBBExEgUhQVFhseEyshMzccEigdHwkaHxUnIG/9oADAMBAAIRAxEAPwD9UwBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQDy9/wCoKmz1v3Mn58zcMWEHQsfp2zlurqNGOLz5I4b+/hbQ1Sz5Lqfex75U3emM+E6ZBwy4j2q3P7PGfdvcRqx1RPuyvYXENcP1XQ9GbzrEAQBAEAQBAEAQBAPK6g6gq7PVLufNnbhhwjtY+7vM5bq6jRji8+SOG/v4W0NUs+S6mWbhuFrcLT2bL+fI3Z3AclHgJUq1eVWTlLM88ubqdebnN8e76H1te6XNstrZqt5WHqX4WHcwn3b3EqUtUTZZ3k7eeuH6rqarse+VN3qDPgPlccMuI9qmW22uY1Y6onoVlewuIa4fquh6M3nWIAgCAIAgCAIB5XUHUNTaKpfIfPnbhiwg8Sfw+uct1dxoxxefJHDf38LaGqWfJdTK9w3C1ftPZsv5sj8uQHco5CVOtWlVlqlmee3V1OvNzm+Pd2EeajnEAmbTuV3bruOxUJ/c1AOPiQ4J9JA750W1edKeMf5dTssbupQqKUM+nXsNa+csf9X838u37/7Xn+W1Gvm018uuukuGp6ccOOGX2PR9ctGrT+WHl+xLn2bTjuiIzuwVFBLMToABzMw3gYbSWLK3T652yzu7UvRgP5cFluAd+f1A/D3yOp7nTlU0cuTIWjvtGdZ08lyl1f8AGRZZJE2IAgHk9Q9QVdoql3PmzvqMWIdpP8Oc5bq6jRji8+SOHcL+FtDVLPkuplu4bhav2ns2X8+RvYo/lXXlKlXrSqy1SzPPLq6nXm5zfHu+hGms0CAdVSzBVGrE6ADtJMJY8DKi28FmaH0h0gtMJfvLraPHFiP+v9Us237eqa1S8/cXjaNnVBe5U+T0+JbZKk+cd0RS7sFVRqzE6ACYbwMNpLFmb9W9XPuLtTpMVoKfzuOBykf2+HOVvcNwdT8YeXv8Ck7xvDrP26fx+rwKvIorxeejusOKbbuL8Totewx9iOfxk7t245Qm/o/3Lbs2844Uqr/1l9n9mXgEEajiDJ0tZ5PUPUNXaKxZyHsMP8WHmT7vGct1dRoxxefJHDuF/C2hqlnyXUyy/ftX7T2bLl8j+wDkBKnXrSqy1SzPPLq5nXm5zfHu7CPNRoEA6qszBVBZmOiqOJJPIQk28EZjFt4LM0LpDpFaipfvLraYa4sZ7EBH3yzbft/trVLz9xeNo2dUF7lT5PT4lukqT4gFC/8AQN43IZxt3kbBTYebz/8AN7PhHdIDd7iaejDCL/qVH/oruqmqeGmm+f8Al/boUuQaKqIxAjEFu2XrzNU2/JXuK2fLjXStk5n+lye7vkza7s4Qanxay/ZlmsP+gdOm41E5NL8e3sf7lZv37V+09my/myOfsA7gOQkVXrSqy1SzIC6uZ15uc3x7uxEeajQJkHVVmYKoLMToFHEk+AhJt4IzGLbwWZoXSPSC1FW9eUNZYa48Z0IQH26mWbb9vVNapefuLxs+zqgvcqfJ6fEt0lSfEAQCFu+0U90ptVsrqDxRx6lbkyzTXoRqx0yyOe6tYV4OE1wMq3nZbm02zXsDVTxxZR6XXw8e8Sp3VrKjLB5cmee39hO2npllyfUgTmOEQBAEAQDqqzMFUasx0AHaSYSxeCMxTbwWZofSPSK01W9eUG0Rrjxn/X+qWbb9v9tapefuLxs+0KgvcqfJ6fEtslSfEAQBAEAhbvtFTdKbVrK6g8UcepW5EGaa9CNWOmWRz3VrCvBwmuBlW87Nc2m41ewNR24so9Lr3j3Sp3VrKjLB5cmee39hO2npllyfUgTmOEQBAOqrOwRAWdiAqgakk9gAhJvgjMYtvBZmh9I9IrTVb15Q1phrjxniEBH3nXjLNt+3qn+UvP3F42jZ1QWup8np8S2yVJ8QBAEAQBAEAhbvtFPdajVrK6jtRx6lbvWaa9CNWOmWRz3VrCvBwmuBlW87Nc2m2a9gag6nFlHpdRzEqd1ayoyweXJ9Tz2/sJ209MsuT6kCcxwnVVmYKoLMx0VQNSSe4Qk28EZjFt4LM0PpHpFaarevKGtMNceM6EID7Rr4/Q2bb9vVNapefu8S8bPs6oLXU+T0+JbZKk+IAgCAIAgCAIAgELd9oqbpTatYXXXij/ErciJpr0I1Y6ZHPdWsK8HCa4d3aZXu+x3tsu/K5kLFz/gcDg4J0Gnj4SqXNpOlPS+OOXaefX23VLepoaxx8r6+PYXXpHpFaSrevL5rZGuND2Yx7+/6azm37eqa1S8/cWraNnVBe5U+T0+JbJKk+IAgCAIAgCAIAgCAIB8ZMGDIytkxq7JxQsoJBI04a9kw0mfLinmsj7mT6EAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQD/2Q=='
  wrongImage = 'data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NSA3OS4xNjM0OTksIDIwMTgvMDgvMTMtMTY6NDA6MjIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDREYzQTNDMjEyMDUxMUVDQkE1QThDODEzOEJEQzNBOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDREYzQTNDMzEyMDUxMUVDQkE1QThDODEzOEJEQzNBOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNERjNBM0MwMTIwNTExRUNCQTVBOEM4MTM4QkRDM0E4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNERjNBM0MxMTIwNTExRUNCQTVBOEM4MTM4QkRDM0E4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJ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'
  if (rw_flag) {
    doc.addImage(rightImage, "JPEG", x, y, 25, 25);
  } else {
    doc.addImage(wrongImage, "JPEG", x, y, 25, 25);
  }
}
drawRWIcon2 = (doc, rw_flag, x, y) => {
  if (rw_flag) {
    doc.setDrawColor(0, 255, 0)
    doc.setFillColor(0, 255, 0)
    pot1 = { x: x + 3, y: y + 12 }
    pot2 = { x: x + 0, y: y + 15 }
    pot3 = { x: x + 10, y: y + 25 }
    pot4 = { x: x + 10, y: y + 19 }
    pot5 = { x: x + 22, y: y + 3 }
    pot6 = { x: x + 25, y: y + 6 }
    doc.triangle(pot1.x, pot1.y, pot2.x, pot2.y, pot3.x, pot3.y, 'F')
    doc.triangle(pot1.x, pot1.y, pot3.x, pot3.y, pot4.x, pot4.y, 'F')
    doc.triangle(pot6.x, pot6.y, pot4.x, pot4.y, pot3.x, pot3.y, 'F')
    doc.triangle(pot4.x, pot4.y, pot5.x, pot5.y, pot6.x, pot6.y, 'F')
  } else {
    doc.setDrawColor(255, 0, 0)
    doc.setFillColor(255, 0, 0)
    pot1 = { x: x + 0, y: y + 3 }
    pot2 = { x: x + 3, y: y + 0 }
    pot3 = { x: x + 0, y: y + 22 }
    pot4 = { x: x + 3, y: y + 25 }
    pot5 = { x: x + 22, y: y + 0 }
    pot6 = { x: x + 25, y: y + 3 }
    pot7 = { x: x + 22, y: y + 25 }
    pot8 = { x: x + 25, y: y + 22 }
    doc.triangle(pot1.x, pot1.y, pot2.x, pot2.y, pot7.x, pot7.y, 'F')
    doc.triangle(pot2.x, pot2.y, pot7.x, pot7.y, pot8.x, pot8.y, 'F')
    doc.triangle(pot3.x, pot3.y, pot4.x, pot4.y, pot5.x, pot5.y, 'F')
    doc.triangle(pot4.x, pot4.y, pot5.x, pot5.y, pot6.x, pot6.y, 'F')
  }
}
drawDevice = (doc, device, y) => {
  doc.setDrawColor(60, 60, 60)
  doc.setLineWidth(0.5)
  doc.line(10, y, 200, y)
  //标题
  doc.setFont('simsun')
  doc.setFontSize(titleSize);
  doc.text(titleXOffset, y + 10, `监测`)
  doc.text(titleXOffset, y + 10 * 2, `仪器`)
  //信息
  doc.setFontSize(textSize);
  doc.text(textXOffset, y + 10, `仪器类型: ${device.type}`)
  doc.text(90, y + 10, `仪器编号: ${device.name}`)
  doc.text(160, y + 10, `网络类型: ${device.network_type}`)
  doc.text(textXOffset, y + 20, `传感器类型: ${device.sencer.type}`)
  doc.text(90, y + 20, `分辨率: ±${device.sencer.precision}℃`)
  doc.text(160, y + 20, `精度: ±${device.sencer.resolution}℃`)

  //结束
  doc.line(10, y + 25, 200, y + 25)
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.3)
  doc.line(30, y + 3, 30, y + 25 - 3)
}
drawChart = (doc, data, upper, lower, y) => {
  doc.setDrawColor(60, 60, 60)
  doc.setLineWidth(0.5)
  doc.line(10, y, 200, y)
  //标题
  doc.setFont('simsun')
  doc.setFontSize(titleSize);
  doc.text(titleXOffset, y + 10 * 3, `温度`)
  doc.text(titleXOffset, y + 10 * 4, `监测`)
  doc.text(titleXOffset, y + 10 * 5, `曲线`)
  //信息
  doc.setFontSize(textSize);
  //纸张坐标系映射x，y坐标系
  let basex = 40;
  let basey = y + 75
  let posx = (pot_x) => {
    return pot_x + basex
  }
  let posy = (pot_y) => {
    return basey - pot_y
  }
  let x_length = 150
  let x_span = x_length / (data.length)
  let y_length = 65
  let y_span = 65 / 6
  //Y轴映射温度

  let temp_range = (parseInt((upper - lower) * 0.11) + 1) * 10
  let temp_span = temp_range / 5
  let temp_lowest = Math.floor(lower / temp_span) * temp_span
  let tempy = (temp) => {
    return posy((temp - temp_lowest) * y_span / temp_span)
  }
  // 坐标轴文字
  doc.text(posx(-3), posy(y_length + 2), `温度`)
  doc.text(posx(x_length + 2), posy(-1), `时间`)
  //温度轴刻度
  for (let i = 0; i <= 6; i++) {
    doc.setLineWidth(0.1)
    doc.setDrawColor(150, 150, 150)
    doc.setFontSize(8);
    doc.text(34, tempy(temp_lowest + temp_span * i) + 1, `${temp_lowest + temp_span * i}`)
    doc.line(posx(0), tempy(temp_lowest + temp_span * i), posx(x_length), tempy(temp_lowest + temp_span * i))
  }
  // 坐标系
  doc.setLineWidth(0.4)
  doc.setDrawColor(0)
  doc.line(posx(0), posy(0), posx(0), posy(y_length))
  doc.triangle(posx(0), posy(y_length), posx(-1), posy(y_length - 3), posx(1), posy(y_length - 3), 'FD')
  doc.line(posx(0), posy(0), posx(x_length), posy(0))
  doc.triangle(posx(x_length), posy(0), posx(x_length - 3), posy(1), posx(x_length - 3), posy(-1), 'FD')
  //上下限绘制
  doc.setLineWidth(0.4)
  doc.setDrawColor(255, 0, 0)
  doc.line(posx(0), tempy(upper), posx(x_length), tempy(upper))
  doc.line(posx(0), tempy(lower), posx(x_length), tempy(lower))
  doc.setFontSize(10);
  doc.text(posx(x_length + 1), tempy(upper), `${upper}℃`)
  doc.text(posx(x_length + 1), tempy(lower), `${lower}℃`)
  //  绘制图形
  doc.setLineWidth(0.6)
  doc.setDrawColor(0, 0, 255)
  oldpot = data[0].temp
  let x = 0
  for (let i = 1; i < data.length; i++) {
    newpot = data[i].temp;
    doc.line(posx(x), tempy(oldpot), posx(x + x_span), tempy(newpot))
    oldpot = data[i].temp
    x += x_span
  }
  // 时间轴刻度
  let t = 0
  if (data.length > 5) {
    for (let i = 0; i < data.length; i += (Math.floor(data.length / 5))) {
      var splitTitle = doc.splitTextToSize(`${data[i].timestamp}`, 20);
      doc.text(posx(t - 5), posy(-6), splitTitle)
      t += 150 / 5
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      var splitTitle = doc.splitTextToSize(`${data[i].timestamp}`, 20);
      doc.text(posx(t - 5), posy(-6), splitTitle)
      t += 150 / 5
    }
  }
  // var splitTitle = doc.splitTextToSize(`${data[data.length - 1].timestamp}`, 20);
  // doc.text(posx(150 - 5), posy(-6), splitTitle)

  //结束
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.3)
  doc.line(30, y + 3, 30, y + 80 - 3)
}

module.exports = {
  drawHwxx,
  drawCyxx,
  drawFxjg,
  drawRWIcon,
  drawDevice,
  drawChart,
  drawRWIcon2,
}