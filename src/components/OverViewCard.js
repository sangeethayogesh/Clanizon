import React from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col, Button } from 'antd'
import '../styles/overall-tile.css'
import Text from 'antd/lib/typography/Text'
import { useHistory } from 'react-router-dom'

const OverViewCard = (props) => {
  var history = useHistory()
  return (
    <Card className="overall-tile" style={{ backgroundColor: props.color }}>
      <Row>
        <Col span="4">
          <div className="o-initial-box">
            <Text className="o-initial-text">{props.title[0]}</Text>
          </div>
        </Col>
        <Col span="9" offset={2}>
          <Row>
            <Text className="o-count">{props.count}</Text>
          </Row>
          <Row>
            <Text className="o-title">{props.title}</Text>
          </Row>
        </Col>
        <Col span="8">
          {props.showbutton && (
            <div className="o-center">
              <Button
                className="o-add-btn"
                onClick={() => {
                  history.push('agent/add-lead')
                }}
              >
                + Add Lead
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Card>
  )
}

OverViewCard.propTypes = {
  color: PropTypes.string,
  title: PropTypes.any,
  count: PropTypes.any,
  showbutton: PropTypes.bool.isRequired
}

export { OverViewCard }
