import React from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col, Avatar, Button } from 'antd'
import { CalendarTwoTone } from '@ant-design/icons'
import '../styles/report-card.css'
import Text from 'antd/lib/typography/Text'
const ReportCard = (props) => {
  const { lead } = props
  // const [state, setState] = useState(InitialState);
  return (
    <>
      {lead && (
        <Card gutter={6} bordered={false} className="r-card-box" {...props}>
          <Row gutter={6}>
            <Col>
              <Avatar
                style={{
                  color: '#e13f56',
                  backgroundColor: '#f9f3ef',
                  fontFamily: 'Lato'
                }}
              >
                {lead.leadCustomer.userFname.slice(0, 2)}
              </Avatar>
            </Col>
            <Col>
              <Row>
                <span className="r-user-name">
                  {lead.leadCustomer.userFname || ''}
                </span>
              </Row>
              <Row>
                <span className="r-user-status">
                  {lead.leadCustomer.userEmailid}
                </span>
              </Row>
            </Col>
            <Col justify="space-between">
              <Button type="link" className="badge-label badge-label-success">
                {lead.leadOutcome ? lead.leadOutcome : 'no status'}
              </Button>
            </Col>
          </Row>
          <Row gutter={[6, 6]}>
            <Col span="12">
              <Text className="r-by-code">
                {lead.leadCustomer.userCity || '-'}
              </Text>
            </Col>
            <Col span="9">
              <Text className="r-by-name">{lead.leadAgentMobile}</Text>
            </Col>
            <Col span="3">
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                style={{ float: 'right' }}
              />
            </Col>
          </Row>
          <Row gutter={[6, 6]}>
            <Col span="12">
              <Text className="r-source">{lead.leadSource || '-'}</Text>
            </Col>
            <Col span="3">
              <CalendarTwoTone
                twoToneColor="#bababa"
                style={{ float: 'right' }}
              />
            </Col>
            <Col span="9">
              <Text className="r-date no-over-due">-24 days overdue</Text>
            </Col>
          </Row>
        </Card>
      )}
    </>
  )
}

ReportCard.propTypes = {
  onShowDetailReport: PropTypes.func,
  onClick: PropTypes.func
}

export { ReportCard }
