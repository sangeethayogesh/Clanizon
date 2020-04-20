import React from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Row } from 'antd'
import '../styles/common.css'
import mail from '../asssets/mail.svg'
import '../styles/agent-message-card.css'
import Text from 'antd/lib/typography/Text'
const AgentMessageCard = props => {
  return (
    <div className="agent-message-card" style={{ backgroundColor: 'white' }}>
      <Card className=" ag-bg-img">
        <Row>
          <Col span={6}>
          </Col>
          <Col span={18}>
            <Row>
              <Text className="ag-message-title">Hello Agent! </Text>
            </Row>
            <Row>
              <Text className="ag-message-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              </Text>
            </Row>
            <Row>
              <Text className="ag-message-time">
                  2 min ago
              </Text>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

AgentMessageCard.propTypes = {}

export { AgentMessageCard }
