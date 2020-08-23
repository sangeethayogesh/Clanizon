import React, { useState, useEffect } from 'react'

import HeaderBar from '../../components/HeaderBar'
import { Row, Button, Col, Select } from 'antd'
import { FinancialFlatListTable } from '../../components/FinancialFlatListTable'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useHistory } from 'react-router-dom'
const { Option } = Select
const FinancialList = (props) => {
  const history = useHistory()
  const [selectedId, setSelectedId] = useState(0)
  const [loading, setLoading] = useState(false)
  const getAssetGroups = useStoreActions(
    (actions) => actions.assets.getAssetGroups
  )
  const assetGroups = useStoreState((state) => state.assets.assetGroups)

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
      <h5
        style={{
          fontFamily: 'Lato',
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#150e4f',
          paddingLeft:'10px'
        }}
      >
        Financial Metrics
      </h5>
      <Row justify="end" gutter={[8, 8]}>

        <Col span="4">
          {/* <Button block type="primary" onClick={() => history.push('/admin/add-financial-metrics')} >
            Add Financial Metrics
          </Button > */}
          <Button style={{fontSize: '15px', paddingRight:'10px'}} type="link" onClick={() => history.push('/admin/add-financial-metrics')} >
                  + Add Financial Metrics
          </Button >  
        </Col>
        <br></br>
      </Row>

      <br></br>
      <FinancialFlatListTable id={selectedId} />
    </HeaderBar>
  )
}

export { FinancialList }
