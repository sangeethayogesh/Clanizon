import React, { useState, useEffect } from 'react'

import HeaderBar from '../../components/HeaderBar'
import { Row, Button, Col, Select } from 'antd'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useHistory } from 'react-router-dom'
import { LeadTable } from '../../components/LeadTable'

const { Option } = Select
const OverAllLeadList = (props) => {
  const history = useHistory()
  const [selectedId, setSelectedId] = useState(0)
  
  const [loading, setLoading] = useState(false)
  const getAssetGroups = useStoreActions(
    (actions) => actions.assets.getAssetGroups
  )
  const assetGroups = useStoreState((state) => state.assets.assetGroups)
  const currentUser = useStoreState((state) => state.auth.user)

  function handleChange (id) {
    setSelectedId(id)
  }
  useEffect(() => {
    // Update the document title using the browser API
    console.log('::LIST Assets Called::')
    setLoading(true)
    getAssetGroups(() => {
      setLoading(false)
    })
  }, [])
  return (
    <HeaderBar>
     
      <Row justify="space-between" gutter={[8, 8]}>
        <Col>
            <h5
            style={{
              fontFamily: 'Lato',
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#150e4f',
              paddingLeft:'10px'
            }}
          >
            Over All Lead Status
          </h5>
        </Col>
      </Row>
      <LeadTable currentUser={currentUser}></LeadTable>
    </HeaderBar>
  )
}

export { OverAllLeadList }
