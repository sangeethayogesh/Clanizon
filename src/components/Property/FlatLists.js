import React, { useEffect, useState } from 'react'
import { Row, Col, Spin } from 'antd'
import { useStoreActions, useStoreState } from 'easy-peasy'
const FlatLists = (props) => {
  console.log(props.group)
  const [loading, setLoading] = useState(false)
  const getAssetByGroupId = useStoreActions(
    (actions) => actions.assets.getAssetById
  )
  const assetList = useStoreState((state) => state.assets.assetDetails)
  const data = {
    id: props.group.assetGroupId,
    callback: () => {
      setLoading(false)
    }
  }
  useEffect(() => {
    setLoading(true)
    getAssetByGroupId(data)
  }, [props.group])
  return (
    <div style={{ padding: '1rem' }}>
      <h5
        style={{
          fontFamily: 'Lato',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#150e4f'
        }}
      >
        {assetList ? assetList.length : 0} Flats in{' '}
        {props.group.assetGroupName || ''}
      </h5>
      {/* {props.flatLists.map((flat, idx) => {
        return ( */}
      <Spin spinning={loading}>
        <Row justify="start" gutter={[8, 8]}>
          {assetList &&
            assetList.map((asset, id) => {
              var className = 'tile '
              if (asset.assetStatus.assetStatusId == '1') {
                className += 'tile-available'
              } else if (asset.assetStatus.assetStatusId == '2') {
                className += 'tile-booked'
              } else {
                className += 'tile-disabled'
              }

              return (
                <Col key={id} className={className} span={3}>
                  {id + 1}
                </Col>
              )
            })}
        </Row>
      </Spin>
      {/* )
      })} */}
    </div>
  )
}

export { FlatLists }
