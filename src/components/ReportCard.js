import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col, Avatar, Badge, Button } from 'antd'
import { CalendarTwoTone } from '@ant-design/icons'
import '../styles/report-card.css'
import Text from 'antd/lib/typography/Text'
const ReportCard = props => {
  // const [state, setState] = useState(InitialState);
  return (<>
    <Card gutter={6} bordered={false} className="r-card-box" onClick={props.onShowDetailReport}>
      <Row gutter={6}>
        <Col>
          <Avatar style={{ color: '#e13f56', backgroundColor: '#f9f3ef', fontFamily: 'Lato' }}>IS</Avatar>
        </Col>
        <Col>
          <Row>
            <span className="r-user-name">Iren Sachi</span>
          </Row>
          <Row>
            <span className="r-user-status">Payment  preparation for the plot</span>
          </Row>
        </Col>
        <Col justify="space-between">
          <Button type="link" className="badge-label badge-label-success"> Positive</Button>
        </Col>
      </Row>
      <Row gutter={[6, 6]}>
        <Col span="12"><Text className="r-by-code">PA108</Text></Col>
        <Col span="9"><Text className="r-by-name">Paul walker</Text></Col>
        <Col span="3"><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{ float: 'right' }} /></Col>
      </Row>
      <Row gutter={[6, 6]}>
        <Col span="12"><Text className="r-source">Websource</Text></Col>
        <Col span="3"><CalendarTwoTone twoToneColor="#bababa" style={{ float: 'right' }} /></Col>
        <Col span="9"><Text className="r-date no-over-due">-24 days overdue</Text></Col>
      </Row>
    </Card>
  </>)
}

ReportCard.propTypes = {
  onShowDetailReport: PropTypes.func
}

export { ReportCard }
