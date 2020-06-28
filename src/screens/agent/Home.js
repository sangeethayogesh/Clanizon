import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Carousel, Row, Col } from 'antd'

import { useStoreActions, useStoreState } from 'easy-peasy'

import HeaderBar from '../../components/HeaderBar'
import { LeadTable } from '../../components/LeadTable'
import { AgentMessageCard } from '../../components/AgentMessageCard'
import { OverViewCard } from '../../components/OverViewCard'

import '../../styles/common.css'

const AgentHome = (props) => {
  const getAdminMessages = useStoreActions(
    (actions) => actions.broadCastMeassages.getMessages
  )
  const adminMessages = useStoreState(
    (state) => state.broadCastMeassages.messages
  )

  const getLeadStatusCount = useStoreActions(
    (actions) => actions.leads.getLeadStatusCount
  )
  const leadStatusCount = useStoreState((state) => state.leads.statusCount)

  useEffect(() => {
    // Update the document title using the browser API
    console.log('::Agent Home Called::')
    getAdminMessages(() => {
      console.log('admin Msg Received')
    })
    getLeadStatusCount()
  }, [])
  return (
    <HeaderBar>
      <Carousel autoplay dotPosition="bottom">
        {adminMessages.map((msg, i) => (
          <AgentMessageCard key={i} data={msg} />
        ))}
      </Carousel>
      <br></br>
      <Row gutter={[12, 12]}>
        <Col>
          <OverViewCard
            color="#7571c7"
            title="New Leads Added"
            count={leadStatusCount.created}
            showbutton={true}
          ></OverViewCard>
        </Col>
        <Col>
          <OverViewCard
            color="#5dca88"
            title="Prospecting Leads"
            count={leadStatusCount.prospecting}
            showbutton={false}
          ></OverViewCard>
        </Col>
        <Col>
          <OverViewCard
            color="#ff707c"
            title="Completed Leads"
            count={leadStatusCount.completed}
            showbutton={false}
          ></OverViewCard>
        </Col>
      </Row>
      <br></br>
      <Row>
        <h5
          style={{
            fontFamily: 'Lato',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#150e4f'
          }}
        >
          Today Lead List
        </h5>
        <LeadTable></LeadTable>
      </Row>
    </HeaderBar>
  )
}

AgentHome.propTypes = {}

export { AgentHome }
