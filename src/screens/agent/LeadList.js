import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Carousel, Row, Col } from 'antd'

import { useStoreActions, useStoreState } from 'easy-peasy'

import '../../styles/common.css'
import constants from '../../constants'
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
