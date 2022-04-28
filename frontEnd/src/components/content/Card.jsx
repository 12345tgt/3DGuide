import React,{useEffect,useState} from 'react'

import { Card, Col, Row } from 'antd';

import '../../assets/css/component/card.css'

// const gridStyle = {
//   width: '50%',
//   textAlign: 'center',
// };

export default (props) => {
  console.log(props);
  
  
  return (
  <div className="site-card-wrapper">
    <Row gutter={[8,16]}>
      {props.roomName && <Col span={8}>
        <Card title='教室名称' bordered={false}>
          {props.roomName}
        </Card>
      </Col>}
      {props.roomType && <Col span={8}>
        <Card title='教室类型' bordered={false}>
          {props.roomType}
        </Card>
      </Col>}
      {props.equipment.map((item) => {
          return (
            <Col span={8}>
              <Card title={item.name} bordered={false}>
                {item.desc.map((element, index) => {
                  return (
                    // <Card.Grid style={gridStyle}>{element}</Card.Grid>
                    <p key={index}>{element}</p>
                  )
                })}
              </Card>
            </Col>
          )
        })}
    </Row>

    {/* <Row gutter={[8,16]} >
      {props.equipment.map((item) => {
          return (
            <Col span={8}>
              <Card title={item.name} bordered={false}>
                {item.desc.map((element, index) => {
                  return (
                    // <Card.Grid style={gridStyle}>{element}</Card.Grid>
                    <p key={index}>{element}</p>
                  )
                })}
              </Card>
            </Col>
          )
        })}
    </Row> */}
  </div>
)};