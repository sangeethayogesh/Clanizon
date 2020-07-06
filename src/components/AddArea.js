import React, { useState, useEffect } from 'react'
import { Map, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import { Layout, Modal, Row, Col, message, Input, Form, Button } from 'antd'
import rest from 'services/http'
import { useStoreActions, useStoreState } from 'easy-peasy'
import constants from '../constants'
import { useHistory } from 'react-router-dom'

const listOfGroups = [
  {
    assetGroupId: 2,
    assetGroupName: 'AAKASH AVENEUE',
    assetGroupPlan: 'TEST',
    assetGroupLat: '13.090346556399028',
    assetGroupLong: '80.24688720703125',
    assetGroupGlink: 'http://google.com',
    assetGroupLocation: 'Alandur',
    assetGroupTypeId: 1
  },
  {
    assetGroupId: 3,
    assetGroupName: 'ERC AVENEUE',
    assetGroupPlan: 'TEST',
    assetGroupLat: '13.0798962968232',
    assetGroupLong: '80.26581287384035',
    assetGroupGlink: 'http://google.com',
    assetGroupLocation: 'Central',
    assetGroupTypeId: 1
  },
  {
    assetGroupId: 4,
    assetGroupName: 'EMPIRE AVENEUE',
    assetGroupPlan: 'TEST',
    assetGroupLat: '13.079436475227778',
    assetGroupLong: '80.28259277343751',
    assetGroupGlink: 'http://google.com',
    assetGroupLocation: 'Rettari',
    assetGroupTypeId: 1
  }
]
const layout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  }
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
}
const AddArea = (props) => {
  const [postion, setPosition] = useState({
    lat: '13.079436475227778',
    lng: '80.28259277343751'
  })
  const [isLoading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const history = useHistory()
  const [clickedLocation, setClickedLocation] = useState({})
  const getAssetGroups = useStoreActions(
    (actions) => actions.assets.getAssetGroups
  )
  const addAssetGroup = useStoreActions((actions) => actions.assets.addNewGroup)
  const listOfGroups = useStoreState((state) => state.assets.assetGroups)

  const handleMapClick = (e) => {
    console.log('clicked Location', e.latlng)
    //setPosition([...postion, e.latlng])
    setClickedLocation(e.latlng)
    form.setFieldsValue({
      asset: {
        assetGroupLat: e.latlng.lat,
        assetGroupLong: e.latlng.lng
      }
    })
    setAddAreaVisible(true)
  }

  const onClickMarker = (group, index) => {
    history.push({ pathname: '/admin/property', groupDetails: group })
  }

  useEffect(() => {
    getAssetGroups(() => {
      setPosition({
        lat: listOfGroups[0].assetGroupLat,
        lng: listOfGroups[0].assetGroupLong
      })
    })
  }, [])
  const [addAreaVisible, setAddAreaVisible] = useState(false)
  const addArea = (data) => {
    // eslint-disable-next-line no-unreachable
    rest
      .post(constants.URL.ADD_NEW_GROUP, data)
      .then((response) => {
        console.log(response.data)
        addAssetGroup(response.data)
        form.resetFields()
        setAddAreaVisible(false)
        message.success('Area added!')
      })
      .catch((error) => {
        console.log(error)
        message.error('Something Failed')
        setAddAreaVisible(false)
      })
  }
  const onFinishArea = (values) => {
    console.log(values)
    var data = values.asset
    // eslint-disable-next-line no-unused-expressions
    ;(data.assetGroupPlan = 'TEST'),
      (data.assetGroupGlink = 'http://google.com'),
      (data.assetGroupTypeId = 1)
    addArea(data)
  }
  const onFinishFailedArea = (errorInfo) => {
    console.log('Failed:', errorInfo)
    message.warning('Please fill mandatory fields')
  }
  const reset = () => {
    form.resetFields()
  }
  const onCancelModel = () => {
    setClickedLocation({})
    setAddAreaVisible(false)
  }
  return (
    <Layout.Content>
      <Modal
        title="Add Area"
        centered
        okText="Save"
        visible={addAreaVisible}
        footer={null}
        onCancel={() => onCancelModel()}
      >
        <Form
          {...layout}
          layout="vertical"
          name="basic"
          form={form}
          initialValues={{
            asset: {
              assetGroupLat: clickedLocation.lat,
              assetGroupLong: clickedLocation.lng
            }
          }}
          onFinish={onFinishArea}
          onFinishFailed={onFinishFailedArea}
          autoComplete="false"
        >
          <Form.Item
            colon={false}
            label="Area / Project Name"
            name={['asset', 'assetGroupName']}
            rules={[
              {
                required: true,
                message: 'Please enter the area name'
              }
            ]}
          >
            <Input placeholder="Area Name" />
          </Form.Item>

          <Form.Item
            colon={false}
            label="Area Location"
            name={['asset', 'assetGroupLocation']}
            rules={[
              {
                required: true,
                message: 'Please enter the area location'
              }
            ]}
          >
            <Input placeholder="Area Location" />
          </Form.Item>
          <Form.Item
            colon={false}
            label="Area Latitude"
            name={['asset', 'assetGroupLat']}
            rules={[
              {
                required: true,
                message: 'Please enter the area latitude'
              }
            ]}
          >
            <Input disabled={true} placeholder="Area Latitude" />
          </Form.Item>
          <Form.Item
            colon={false}
            label="Area Longitude"
            name={['asset', 'assetGroupLong']}
            rules={[
              {
                required: true,
                message: 'Please enter the area longitude'
              }
            ]}
          >
            <Input disabled={true} placeholder="Area Longitude" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Save
            </Button>
            <Button
              disabled={isLoading}
              htmlType="button"
              onClick={() => {
                onCancelModel()
              }}
              style={{ margin: '0 8px' }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Map
        center={postion}
        zoom={9}
        style={{ width: '100%', height: '87vh' }}
        onclick={handleMapClick}
        animate={true}
      >
        <TileLayer
          attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
        />
        {listOfGroups &&
          listOfGroups.map((group, i) => {
            return (
              <Marker
                key={i}
                onClick={() => onClickMarker(group, i)}
                position={[group.assetGroupLat, group.assetGroupLong]}
                onMouseOver={(e) => {
                  e.target.openTooltip()
                }}
              >
                <Tooltip>{group.assetGroupName}</Tooltip>
              </Marker>
            )
          })}
      </Map>
    </Layout.Content>
  )
}

AddArea.propTypes = {}

export { AddArea }
