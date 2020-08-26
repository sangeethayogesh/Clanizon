
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { useStoreState, useStoreActions } from 'easy-peasy'
import constants from '../constants'
const priceformatter = require('priceformatter')





const ProductFlatListTable = (props) => {
  const currentUser = useStoreState((state) => state.auth.user)
  const productList = useStoreState((state) => state.product.productList)
  const getAllProduct = useStoreActions((actions) => actions.product.getAllProduct)
  const getUserProduct = useStoreActions((actions) => actions.product.getUserProduct)
  const userproductList = useStoreState((state) => state.product.userproductList)
  useEffect(() => {
    
    getUserProduct(currentUser.userMobile)
  }, [])
  const columns = [
       {
      title: 'Business',
      width: 150,
      render: (user) => (
        <span style={{ color: '#000000a6', fontWeight: 'bold' }}>
          {constants.getBusinessType(user.businessid)}   
        </span>
      )
      
      // eslint-disable-next-line react/display-name
  
    },
    // {
    //   title: 'Product Code',
    //   width: 150,
    //   render: (user) => (
    //     <span style={{ color: '#000000a6', fontWeight: 'bold' }}>
    //       {user.productCode}{' '}          
    //     </span>
    //   )
      
    //   // eslint-disable-next-line react/display-name
  
    // },
    {
      title: 'Product Model No',
      width: 150,
      render: (user) => (
        <span style={{ color: '#000000a6', fontWeight: 'bold' }}>
          {user.productModel}{' '}          
        </span>
      )
  
    },
    {
      title: 'Product Name',
      width: 150,
      render: (user) => (
        <span style={{ color: '#000000a6', fontWeight: 'bold' }}>
          {user.productName}{' '}          
        </span>
      )
      // eslint-disable-next-line react/display-name
  
    },
    {
      title: 'Product Description',
      width: 150,
      render: (user) => (
        <span style={{ color: '#000000a6', fontWeight: 'bold' }}>
          {user.productDescription}{' '}          
        </span>
      )
  
    },
    {
      title: 'Product Unit price',
      width: 150,
      render: (user) => (
        <span style={{ color: '#000000a6', fontWeight: 'bold' ,textAlign: 'right'}}>
          {user.unitPrice}{' '}          
        </span>
      )
      // eslint-disable-next-line react/display-name
    },
  
    {
      title: 'Product Specification',
      width: 150,
      render: (user) => (
        <span style={{ color: '#000000a6', fontWeight: 'bold' }}>
          {user.productSpecification}{' '}          
        </span>
      )
  
    },
    {
      title: 'Quantity',
      width: 150, render: (user) => (
        <span style={{ color: '#000000a6', fontWeight: 'bold' }}>
          {user.assetQty}{' '}          
        </span>
      )
  
    }
  
    
  ]
  const tableColumns = columns.map((item, idx) => ({
    ...item,
    ellipsis: true,
    key: idx,
    className: 't-head'
  }))
  const getUnit = (asset) => {
    var name = ' / Sqft'
    if (asset.assetValueUnit) {
      name = asset.assetValueUnit == 1 ? ' / Sqft' : ' / Flat'
    }
    return name
  }
  const [loading, setLoading] = useState(false)
  const getAssetById = useStoreActions((actions) => actions.assets.getAssetById)
  const assetDetails = useStoreState((state) => state.assets.assetDetails)
  useEffect(() => {
    const data = {
      id: props.id,
      callback: () => {
        setLoading(false)
      }
    }
    // Update the document title using the browser API
    console.log('::LIST Assets Called::')
    setLoading(true)
    getAssetById(data)
  }, [props.id])
  return (
    <div>
      <Table
        columns={tableColumns}
        size="middle"
        loading={loading}
        dataSource={userproductList}
        pagination={{ pageSize: 8 }}
      ></Table>
    </div>
  )
}

export { ProductFlatListTable }
