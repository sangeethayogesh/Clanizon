
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { useStoreState, useStoreActions } from 'easy-peasy'
const priceformatter = require('priceformatter')
const columns = [
  {
    title: 'Product_Business',
    width: 150
    // eslint-disable-next-line react/display-name

  },
  {
    title: 'Product Model No',
    width: 150

  },
  {
    title: 'Product Name',
    width: 150
    // eslint-disable-next-line react/display-name

  },
  {
    title: 'Product Description',
    width: 150

  },
  {
    title: 'Product Unit price',
    width: 150
    // eslint-disable-next-line react/display-name
  },

  {
    title: 'Product Specification',
    width: 150

  },
  {
    title: 'Quality',
    width: 150

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
const ProductFlatListTable = (props) => {
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

export { ProductFlatListTable }
