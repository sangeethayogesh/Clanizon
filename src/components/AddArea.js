import React, { useState, useEffect } from 'react'
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet'
import { Layout, Modal, message, Input, Form, Button, Upload, Card } from 'antd'
import rest from 'services/http'
import { useStoreActions, useStoreState } from 'easy-peasy'
import constants from '../constants'
import { useHistory } from 'react-router-dom'
import { s3 } from '../utils/s3.js'
import {
  CloudUploadOutlined,
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
  EllipsisOutlined
} from '@ant-design/icons'
import FileUpload from './FileUpload'

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
  const [files, setFiles] = useState([])
  const changeSuccess = (res) => {
    const tfiles = [...files]
    for (var i = 0; i < tfiles.length; i++) {
      if (res.key.includes(tfiles[i].name)) {
        tfiles[i].status = 'success'
      }
    }
    setFiles(tfiles)
  }
  const handleUpload = (e) => {
    var vaild = beforeUpload(e)
    if (!vaild) {
      return false
    }
    const fname = new Date().getTime()
    var fi = {
      name: fname,
      status: 'start',
      location: '',
      file: e
    }

    setFiles((prevValues) => [...prevValues, fi])
    console.log(files)
    s3.uploadFile(e, fname)
      .then((response) => {
        message.success('Uploaded!')
        changeSuccess(response)
      })
      .catch((err) => {
        console.log(err)
        message.error('Upload failed!')
      })
  }

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
  const onCancelModel = () => {
    setClickedLocation({})
    setAddAreaVisible(false)
  }
  function startUpload() {}
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
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
