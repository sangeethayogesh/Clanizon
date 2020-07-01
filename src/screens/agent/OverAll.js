import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import HeaderBar from '../../components/HeaderBar'
import { SubNavBar } from '../../components/SubNavBar'
import { Row, Col, Descriptions, Card, Layout } from 'antd'
import { LeadPersonalCard } from '../../components/LeadPersonalCard'
import '../../styles/agent-overall.css'
import { OverallCallStatus } from '../../components/OverallCallStatus'
import { useHistory } from 'react-router-dom'
import constants from '../../constants'
import { useStoreState } from 'easy-peasy'
const OverAll = (props) => {
  const history = useHistory()
  console.log(history)
  const lead = history.location.leadDetail
  const currentUser = useStoreState((state) => state.auth.user)
  useEffect(() => {
    if (lead === undefined) history.goBack()
  }, [])
  return (
    <HeaderBar drawer={false}>
      <SubNavBar></SubNavBar>
      <Layout.Content id="lead-section" style={{ padding: '1rem' }}>
        <Row gutter={[16, 16]}>
          {lead && lead.leadStatus && (
            <>
              <Col span={16}>
                <OverallCallStatus
                  leadId={lead.leadId}
                  status={lead.leadStatus}
                  currentUser={currentUser}
                ></OverallCallStatus>
              </Col>
              <Col span={8}>
                <Card className="lead-card">
                  <Descriptions
                    colon={false}
                    size="middle"
                    layout="vertical"
                    column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                  >
                    <Descriptions.Item label="Lead Status">
                      {constants.getLeadStatusById(lead.leadStatus)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Best time to call">
                      {lead.leadCustomer.preferredCallStart +
                        '-' +
                        lead.leadCustomer.preferredCallEnd}
                    </Descriptions.Item>
                    {/* <Descriptions.Item label="Intrested  area">
                Adayar{' '}
              </Descriptions.Item>
              <Descriptions.Item label="Intrested  plots">
                Plot CA301, Plot CA304, Plot CA308,Plot CA308
              </Descriptions.Item> */}
                  </Descriptions>
                </Card>
                <div style={{ paddingTop: '1rem' }}>
                  <LeadPersonalCard
                    lead={lead.leadCustomer}
                    source={lead.leadSource}
                  ></LeadPersonalCard>
                </div>
              </Col>
            </>
          )}
        </Row>
      </Layout.Content>
      <Layout.Content></Layout.Content>
    </HeaderBar>
  )
}

OverAll.propTypes = {}

export { OverAll }
