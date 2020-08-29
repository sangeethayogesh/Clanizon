import React, { useEffect } from 'react'
import { Carousel, Row, Col,Button } from 'antd'
import { useHistory } from 'react-router-dom'

import { useStoreActions, useStoreState } from 'easy-peasy'

import HeaderBar from '../../components/HeaderBar'
import { LeadTable } from '../../components/LeadTable'
import { AgentMessageCard } from '../../components/AgentMessageCard'
import { OverViewCard } from '../../components/OverViewCard'
import { Bar } from 'react-chartjs-2'
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

  const state = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug'],
    datasets: [
      {
        type:'bar',
        backgroundColor: '#7e31ed',
        // borderColor: 'rgba(0,0,0,1)',
        label: 'Achieved',
        data: [18, 14, 17, 19, 21, 14, 12, 15],
        barThickness: 20,
        borderWidth: 2
      },
      {
        type:'line',
        borderColor: '#EC932F',
        backgroundColor: '#EC932F',
        pointBorderColor: '#EC932F',
        pointBackgroundColor: '#EC932F',
        pointHoverBackgroundColor: '#EC932F',
        pointHoverBorderColor: '#EC932F',
        fill: false,
        // borderColor: 'rgba(0,0,0,1)',
        label: 'Monthly Target',
        barThickness: 20,
        borderWidth: 2,
        data: [20, 20, 20, 20, 20, 20, 20, 20]
      }
    ]
  }  
  useEffect(() => {
    // Update the document title using the browser API
    const leadStat=(currentUser & currentUser.userRole==1)? constants.URL.GET_LEAD_STATUS_COUNT + '?mobile=' + currentUser.userMobile:constants.URL.GET_LEAD_STATUS_AGENT + '?mobile=' + currentUser.userMobile
   getAdminMessages(() => {
     console.log('admin Msg Received')
     })
    getLeadStatusCount(
      leadStat
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
      <div className="row-gap"></div>
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
      <div style={{padding: '1%'}}></div>
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
      <div style={{padding: '.75%'}}></div>
      {/* <Row>
        <h5
          style={{
            fontFamily: 'Lato',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#150e4f'
          }}
        >
          My Task For Today
        </h5>
      </Row> */}
      <Row  >
        <Col span="14">
          <h5
            style={{
              fontFamily: 'Lato',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#150e4f'
            }}
          >
            My Task For Today
          </h5>
          <div className="admin-page-column-left">
            <LeadTable currentUser={currentUser}></LeadTable>
          </div>
        </Col>
        <Col span="10">
          <h5
            style={{
              fontFamily: 'Lato',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#150e4f'
            }}
          >
            My Performance
          </h5>
          <div className="admin-page-column-right">
            <Bar
              data={state}
              options={{
                title: {
                  display: false,
                  text: 'My Performance',
                  fontSize: 15,
                  position: "top"
                },
                legend: {
                  display: true,
                  position: 'bottom'
                }
              }}
            />
          </div>
            </Col>
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
