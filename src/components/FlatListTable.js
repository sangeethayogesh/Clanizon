/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { useStoreState, useStoreActions } from 'easy-peasy'
const priceformatter = require('priceformatter')
const columns = [
  {
    title: 'Name',
    width: 200,
    // eslint-disable-next-line react/display-name
    render: (asset) => (
      <span style={{ color: '#000000a6', fontWeight: 'bold' }}>
        {asset.assetNumber}
      </span>
    )
  },
  {
    title: 'Flat Value',
    width: 150,
    render: (asset) =>
      priceformatter(asset.assetValue).toString() + getUnit(asset)
  },
  {
    title: 'Flat Dimension',
    width: 200,
    // eslint-disable-next-line react/display-name
    render: (asset) => asset.assetDimen + ' / Sqft'
  },
  {
    title: 'Flat Facing',
    width: 200,
    // eslint-disable-next-line react/display-name
    render: (asset) => (asset.assetFacing ? asset.assetFacing : '-')
  },

  {
    title: 'Flat Status',
    width: 200,
    render: (asset) => (
      <span style={{ color: '#4c46a7', fontWeight: 'bold' }}>
        {asset.assetStatus.assetStatus}
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
const getUnit = (asset) => {
  var name = ' / Sqft'
  if (asset.assetValueUnit) {
    name = asset.assetValueUnit == 1 ? ' / Sqft' : ' / Flat'
  }
  return name
}
const FlatListTable = (props) => {
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

export { FlatListTable }
