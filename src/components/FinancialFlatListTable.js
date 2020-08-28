
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import constants from '../constants'
import { useStoreState, useStoreActions } from 'easy-peasy'
const priceformatter = require('priceformatter')
const columns = [
  {
    title: 'Product Business',
    width: 120,
    render: (user) => (
      <span style={{ color: '#000000a6', fontWeight: 'bold' }}>
        {constants.getBusinessType(user.businessid)}   
      </span>
    )

  },
  {
    title: 'Product_Code',
    width: 120

  },
  {
    title: 'Quality',
    width: 120
    // eslint-disable-next-line react/display-name

  },
  {
    title: 'Buyer Company',
    width: 120

  },
  {
    title: 'User Name',
    width: 120
    // eslint-disable-next-line react/display-name
  },

  {
    title: 'User Mobile Number',
    width: 120

  },
  {
    title: 'Amount',
    width: 120

  },
  {
    title: 'Date',
    width: 120

  },
  {
    title: 'Sold By',
    width: 120

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
const getUnit = (asset) => {
  var name = ' / Sqft'
  if (asset.assetValueUnit) {
    name = asset.assetValueUnit == 1 ? ' / Sqft' : ' / Flat'
  }
  return name
}
const FinancialFlatListTable = (props) => {
  const [loading, setLoading] = useState(false)
  const assetDetails = useStoreState((state) => state.assets.assetDetails)
  const getMetrics = useStoreActions((actions) => actions.metrics.getMetrics)
  const currentUser = useStoreState((state) => state.auth.user)
  const metric = useStoreState((state) => state.metrics.metricslist)
  console.log(currentUser);
  useEffect(() => {
    const data = {
      param: "?mobile="+currentUser.userMobile,
      callback: () => {
        setLoading(false)
      }
    }
    // Update the document title using the browser API
    setLoading(true)
   // getMetrics(data)
  }
  )
 
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
