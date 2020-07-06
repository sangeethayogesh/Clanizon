import React, { useEffect, useState } from 'react'
import { Row, Col, Spin } from 'antd'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useHistory } from 'react-router-dom'
const FlatLists = ({ group, onFlatClick }) => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const getAssetByGroupId = useStoreActions(
    (actions) => actions.assets.getAssetById
  )
  const assetList = useStoreState((state) => state.assets.assetDetails)
  const data = {
    id: group ? group.assetGroupId : history.replace('/login'),
    callback: () => {
      setLoading(false)
    }
  }
  const onClickFlat = (flat) => {
    onFlatClick(flat)
  }
  useEffect(() => {
    setLoading(true)
    getAssetByGroupId(data)
  }, [])
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
        {assetList ? assetList.length : 0} Flats in {group.assetGroupName || ''}
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
              } else if (asset.assetStatus.assetStatusId == '3') {
                className += 'tile-booked'
              } else {
                className += 'tile-disabled'
              }

              return (
                <Col
                  key={id}
                  className={className}
                  span={3}
                  onClick={() => onClickFlat(asset)}
                >
                  {asset.assetNumber}
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
