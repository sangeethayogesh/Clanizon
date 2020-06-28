import React from 'react'
import { Row } from 'antd'

import '../../styles/common.css'
import HeaderBar from 'components/HeaderBar'
import { DetailedLeadList } from 'components/DetailedLeadList'

const LeadList = (props) => {
  return (
    <HeaderBar>
      <Row gutter={[8, 8]}>
        <h5
          style={{
            fontFamily: 'Lato',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#150e4f'
          }}
        >
          All Leads
        </h5>
        <DetailedLeadList></DetailedLeadList>
      </Row>
    </HeaderBar>
  )
}

LeadList.propTypes = {}

export { LeadList }
