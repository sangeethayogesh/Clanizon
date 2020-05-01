import React from 'react'
import PropTypes from 'prop-types'
import HeaderBar from '../../components/HeaderBar'
import { SubNavBar } from '../../components/SubNavBar'
import { Row, Col, Descriptions, Card, Layout } from 'antd'
import { LeadPersonalCard } from '../../components/LeadPersonalCard'
import '../../styles/agent-overall.css'
import { OverallCallStatus } from '../../components/OverallCallStatus'

const OverAll = props => {
  return (
    <HeaderBar>
      <SubNavBar></SubNavBar>
      <Layout.Content id='lead-section' style={{ paddingTop: '1rem' }}>
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <LeadPersonalCard></LeadPersonalCard>
          </Col>
          <Col span={8}>
            <Card className="lead-card">
              <Descriptions
                colon={false}
                size="middle"
                layout="vertical"
                column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
              >
                <Descriptions.Item label="Lead Status">Not contacted</Descriptions.Item>
                <Descriptions.Item label="Best time to call">11.30 am - 5.30 pm</Descriptions.Item>
                <Descriptions.Item label="Intrested  area">Adayar </Descriptions.Item>
                <Descriptions.Item label="Intrested  plots">Plot CA301, Plot CA304, Plot CA308,Plot CA308</Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      </Layout.Content>
      <Layout.Content>
        <OverallCallStatus></OverallCallStatus>
      </Layout.Content>
    </HeaderBar>
  )
}

OverAll.propTypes = {}

export { OverAll }
