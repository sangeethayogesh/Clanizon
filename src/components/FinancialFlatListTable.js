
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { useStoreState, useStoreActions } from 'easy-peasy'
const priceformatter = require('priceformatter')
const columns = [
  {
    title: 'Product_Business',
    width: 120
    // eslint-disable-next-line react/display-name

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
        dataSource={assetDetails}
        pagination={{ pageSize: 8 }}
      ></Table>
    </div>
  )
}

export { FinancialFlatListTable }
