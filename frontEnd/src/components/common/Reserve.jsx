import React from 'react'

import { DatePicker, TimePicker, Space, Button } from 'antd';

import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

const format = 'HH:mm';
let reserveDate = '';
let reserveTime = ['', ''];

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current) {
  // 限制不能选今天之前的日期
  return current && current < moment().subtract(1, 'days').endOf('day');
}

function disabledRangeTime() {
// 限制小时8~22
  return {
    disabledHours: () => [0,1,2,3,4,5,6,7,23]
  };
}

function onDateChange(date, dateString) {
  reserveDate = dateString;
  console.log(dateString);
}

function onTimeChange(time, timeString) {
  reserveTime = timeString
  console.log(timeString);
}

function reserve() {
  console.log(reserveDate, reserveTime);
  if(reserveDate == '' || reserveTime[0] == '') {
    
    alert('请填写完整时间')
    return;
  }
  console.log('预约');
}

export default function Reserve() {
  

  return (
    <div>
      <div >预约日期：
        <DatePicker 
          onChange={onDateChange} 
          disabledDate={disabledDate} 
          locale={locale}
          showToday={false}
        />
      </div>
      <div>预约时间：
        <TimePicker.RangePicker 
          onChange={onTimeChange}
          hideDisabledOptions={true}
          minuteStep={30}
          showNow={false}
          format={format}
          disabledTime={disabledRangeTime}
          suffixIcon={null}
        />
      </div>
      <Button onClick={reserve}>预约</Button>
      {/* <Space>
        开始时间：<TimePicker defaultValue={moment('12:08', format)} format={format} />
        结束时间：<TimePicker defaultValue={moment('12:08', format)} format={format} />
        
      </Space> */}
    </div>
    
  )
}
  