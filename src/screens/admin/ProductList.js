import React, { useState, useEffect } from 'react'

import HeaderBar from '../../components/HeaderBar'
import { Row, Button, Col, Select } from 'antd'
import { ProductFlatListTable } from '../../components/ProductFlatListTable'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useHistory } from 'react-router-dom'
const { Option } = Select
const ProductList = (props) => {
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
      <Row gutter={[8, 8]}>

        <Col span="3">
          <Button block type="primary"  onClick={() => history.push('/admin/add-product')}>
            Add Product
          </Button>
        </Col>
        <br></br>
      </Row>

      <br></br>
      <ProductFlatListTable id={selectedId} />
    </HeaderBar>
  )
}

export { ProductList }
