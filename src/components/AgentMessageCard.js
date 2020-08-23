import React from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Row } from 'antd'
import '../styles/common.css'
import '../styles/agent-message-card.css'
import Text from 'antd/lib/typography/Text'
import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
const AgentMessageCard = props => {
  console.log(props);
  return (
    <div className="agent-message-card" style={{backgroundColor:"white",  minHeight: '40px' }}>
      <Card className="ag-bg-img" >
        <Row>
          <Col span={2}>
          </Col>
          <Col span={18}>
            <Row>
              <Text className="ag-message-title">{props.data.message}   |   {dayjs(props.data.createdDate).fromNow()}</Text>
            </Row>
            {/* <Row>
              <Text className="ag-message-text">
                {props.data.message}
              </Text>
            </Row> */}
            <Row>
              <Text className="ag-message-time">
                {dayjs(props.data.createdDate).fromNow()}
              </Text>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

AgentMessageCard.propTypes = {
  data: PropTypes.object.isRequired
}

export { AgentMessageCard }
