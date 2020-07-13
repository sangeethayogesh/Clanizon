import React, { useState, useEffect } from 'react'
import HeaderBar from '../../components/HeaderBar'
import { Row, Spin, Select } from 'antd'
import { FlatListTable } from '../../components/FlatListTable'
import { useStoreActions, useStoreState } from 'easy-peasy'
const { Option } = Select
const AreaList = (props) => {
  const [selectedId, setSelectedId] = useState(0)
  const [loading, setLoading] = useState(false)
  const getAssetGroups = useStoreActions(
    (actions) => actions.assets.getAssetGroups
  )
  const assetGroups = useStoreState((state) => state.assets.assetGroups)

  function handleChange(id) {
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
        <h5
          style={{
            fontFamily: 'Lato',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#150e4f'
          }}
        >
          All Flats
        </h5>
        <br></br>
      </Row>
      <Spin spinning={loading}>
        <Select
          style={{ width: 120 }}
          onChange={handleChange}
          placeholder="Select Area"
        >
          {assetGroups &&
            assetGroups.map((group, index) => {
              return (
                <Option key={index} value={group.assetGroupId}>
                  {group.assetGroupName}
                </Option>
              )
            })}
        </Select>
      </Spin>
      <br></br>
      <FlatListTable id={selectedId} />
    </HeaderBar>
  )
}

export { AreaList }
