import React, { useEffect } from 'react'
import { Carousel, Row, Col,Button } from 'antd'
import { useHistory } from 'react-router-dom'

import { useStoreActions, useStoreState } from 'easy-peasy'

import HeaderBar from '../../components/HeaderBar'
import { LeadTable } from '../../components/LeadTable'
import { AgentMessageCard } from '../../components/AgentMessageCard'
import { OverViewCard } from '../../components/OverViewCard'

import '../../styles/common.css'
import constants from '../../constants'

const AgentHome = (props) => {
  const history = useHistory()
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
      <div className="rectangle">
        <div
          style={{
            padding: '1rem'
          }}
        >
          <div className="body-header">Welcome back {currentUser.userFname} </div>
        </div>
      </div>
      <Row style={{
                      justifyContent: "space-evenly"
                    }} 
          gutter={[12, 12]}>
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
      <Row justify="end">      
          <Button style={{fontSize: '15px'}} type="link" 
            onClick={() => history.push('/agent/add-product')} >
            + Add Product
          </Button > 
          <label style={{fontSize: '18px'}}> | </label> 
          <Button style={{fontSize: '15px'}} type="link" onClick={() => history.push('/agent/add-company')} >
            + Add Universe
          </Button > 
          <label style={{fontSize: '18px'}}> | </label>
          <Button style={{fontSize: '15px'}} type="link" onClick={() => history.push('/agent/add-lead')} >
            + Add Market Platform 
          </Button > 
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
          Today Market Platform
        </h5>
        <LeadTable currentUser={currentUser}></LeadTable>
      </Row>
      <Carousel autoplay >
        
        {adminMessages.map((msg, i) => (
          
          <AgentMessageCard key={i} data={msg} />
        ))}
       </Carousel>

    </HeaderBar>

  )
}

export { AgentHome }
