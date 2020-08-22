import React, { useEffect } from 'react'
import { Carousel, Row, Col } from 'antd'

import { useStoreActions, useStoreState } from 'easy-peasy'

import HeaderBar from '../../components/HeaderBar'
import { LeadTable } from '../../components/LeadTable'
import { AgentMessageCard } from '../../components/AgentMessageCard'
import { OverViewCard } from '../../components/OverViewCard'

import '../../styles/common.css'
import constants from '../../constants'

const AgentHome = (props) => {
  const currentUser = useStoreState((state) => state.auth.user)
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
   getAdminMessages(() => {
     console.log('admin Msg Received')
     })
    getLeadStatusCount(
      constants.URL.GET_LEAD_STATUS_COUNT + '?mobile=' + currentUser.userMobile
    )
  }, [])
  console.log(adminMessages);
  return (
    <HeaderBar>
      <Carousel autoplay dotPosition="bottom">
        
        {adminMessages.map((msg, i) => (
          
          <AgentMessageCard key={i} data={msg} />
        ))}
      </Carousel>
      <Row gutter={[12, 12]}>
        <Col>
          <OverViewCard
            color="#7571c7"
            title="Universe"
            count={leadStatusCount.created}
            showbutton={true}
          ></OverViewCard>
        </Col>
        <Col>
          <OverViewCard
            color="#4cc311"
            title="Market Platform"
            count={leadStatusCount.prospecting}
            showbutton={false}
          ></OverViewCard>
        </Col>
        <Col>
          <OverViewCard
            color="#1890ff"
            title="Working Platform"
            count={leadStatusCount.completed}
            showbutton={false}
          ></OverViewCard>
        </Col>
        <Col>
          <OverViewCard
            color="#ff707c"
            title="Buying Platform"
            count={leadStatusCount.closure}
            showbutton={false}
          ></OverViewCard>
        </Col>
      </Row>
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
        <LeadTable currentUser={currentUser}></LeadTable>
      </Row>
    </HeaderBar>
  )
}

export { AgentHome }
