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
            Products
          </h5>
        </Col>
        <Col span="3">
          {/* <Button block type="primary"  onClick={() => 
                      currentUser.userRole == '1'
                      ? history.push('/admin/add-product')
                      : history.push('/agent/add-product')}>
            Add Product
          </Button> */}
          <Button style={{fontSize: '15px', paddingRight:'10px'}} type="link" 
                    onClick={() => 
                        currentUser.userRole == '1'
                        ? history.push('/admin/add-product')
                        : history.push('/agent/add-product')} >
                    + Add Product
          </Button >
        </Col>
      </Row>
      <ProductFlatListTable id={selectedId} />
    </HeaderBar>
  )
}

export { ProductList }
