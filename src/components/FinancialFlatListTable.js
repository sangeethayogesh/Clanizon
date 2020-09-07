
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import constants from '../constants'
import { useStoreState, useStoreActions } from 'easy-peasy'


const priceformatter = require('priceformatter')

const getUnit = (asset) => {
  var name = ' / Sqft'
  if (asset.assetValueUnit) {
    name = asset.assetValueUnit == 1 ? ' / Sqft' : ' / Flat'
  }
  return name
}
const FinancialFlatListTable = (props) => {
  const refdata = useStoreState((state) => state.refData.referencedata)
  const [loading, setLoading] = useState(false)
  const assetDetails = useStoreState((state) => state.assets.assetDetails)
  const getMetrics = useStoreActions((actions) => actions.metrics.getMetrics)
  const currentUser = useStoreState((state) => state.auth.user)
  const getUserProduct = useStoreActions((actions) => actions.product.getUserProduct)
  const userProdList = useStoreState((state) => state.product.userproductList)
  const metric = useStoreState((state) => state.metrics.metriclist)
  console.log(currentUser);
  const data = {
    params:
      '?adminMobile=' + currentUser.createdBy,
    callback: () => {
      setLoading(false)
    }
  }
  const data1 = {
    params:
      '?mobile=' + currentUser.createdBy,
    callback: () => {
      setLoading(false)
    }
  }
  useEffect(() => {
    setLoading(true)
    getUserProduct(data)
  },[])
  useEffect(() => {
    setLoading(true)
    getMetrics(data1)
  },[])

 
  
  const columns = [
    {
      title: 'Product Business',
      width: 120,
      render: (data) => (
        <span style={{ color: '#000000a6', fontWeight: 'bold' }}>
          {constants.getBusinessType(data.productBusiness,refdata.businesstype)}   
        </span>
      )
  
    },
    {
      title: 'Product Code',
      width: 120,
      render: (data) => (
        <span style={{ color: '#000000a6', fontWeight: 'bold' }}>
          {constants.getproductModel(data.productId,userProdList)}   
        </span>
      )
      
  
    },
    {
      title: 'Quantity',
      width: 120,
      render: (data) => (
        <span style={{ color: '#000000a6', fontWeight: 'bold' }}>
          {data.qty}   
        </span>
      )
      // eslint-disable-next-line react/display-name
  
    },
    {
      title: 'Buyer Company',
      width: 120,
      render: (data) => (
        <span style={{ color: '#000000a6', fontWeight: 'bold' }}>
          {data.buyerCompany}   
        </span>
      )
      
  
    },
    {
      title: 'User Name',
      width: 120,
      render: (data) => (
        <span style={{ color: '#000000a6', fontWeight: 'bold' }}>
          {data.createdBy}   
        </span>
      )     
      
      // eslint-disable-next-line react/display-name
    },
  
    {
      title: 'User Mobile Number',
      width: 120,
      render: (data) => (
        <span style={{ color: '#000000a6', fontWeight: 'bold' }}>
          {data.userMobile}   
        </span>
      )     
    },
    {
      title: 'Amount',
      width: 120,
      render: (data) => (
        <span style={{ color: '#000000a6', fontWeight: 'bold' }}>
          {data.amount}   
        </span>
      )    
    },
    {
      title: 'Date',
      width: 120,
      render: (data) => (
        <span style={{ color: '#000000a6', fontWeight: 'bold' }}>
          {new Date(data.date).toISOString().split('T')[0]} 
        </span>
      )
     
  
    },
    {
      title: 'Sold By',
      width: 120,
      render: (data) => (
        <span style={{ color: '#000000a6', fontWeight: 'bold' }}>
          {data.soldBy
         }   
        </span>
      )
    }
  
    //   {
    //     title: 'Action',
    //     dataIndex: '',
    //     // eslint-disable-next-line react/display-name
    //     render: (agent) => (
    //       <span>
    //         <a>Add Call</a>
    //       </span>
    //     )
    //   }
  ]
  const tableColumns = columns.map((item, idx) => ({
    ...item,
    ellipsis: true,
    key: idx,
    className: 't-head'
  }))
 
  return (
    <div>
      <Table
        columns={tableColumns}
        size="small"
        loading={loading}
        dataSource={metric}
        pagination={{ pageSize: 8 }}
      ></Table>
    </div>
  )
}

export { FinancialFlatListTable }
