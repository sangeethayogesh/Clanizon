import React from 'react'
import PropTypes from 'prop-types'
import HeaderBar from '../../components/HeaderBar'
import { LeadTable } from '../../components/LeadTable'
import { AgentMessageCard } from '../../components/AgentMessageCard'
import { Carousel, Row, Col } from 'antd'
import '../../styles/common.css'
import { OverViewCard } from '../../components/OverViewCard'
const AgentHome = props => {
  return (
    <HeaderBar>
      <Carousel autoplay dotPosition="right">
        <AgentMessageCard></AgentMessageCard>
        <AgentMessageCard></AgentMessageCard>
        <AgentMessageCard></AgentMessageCard>
      </Carousel><br></br>
      <Row gutter={[12, 12]}>
        <Col>
          <OverViewCard color="#7571c7" title="New Leads Added" count="200" showbutton={true}></OverViewCard>
        </Col>
        <Col>
          <OverViewCard color="#5dca88" title="Closer Level Leads" count="160"></OverViewCard>
        </Col>
        <Col>
          <OverViewCard color="#ff707c" title="Completed Leads" count="80"></OverViewCard>
        </Col>
      </Row>
      <br></br>
      <Row>
        <h5 style={{
          fontFamily: 'Lato',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#150e4f'
        }}>Lead's List</h5>
        <LeadTable></LeadTable>
      </Row>

    </HeaderBar>
  )
}

AgentHome.propTypes = {}

export { AgentHome }
