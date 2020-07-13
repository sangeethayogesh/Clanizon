/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react'
import { Row, Button, Input, message, Form, Layout, Tabs, Select } from 'antd'
import constants from '../../constants'
import rest from 'services/http'
import { useStoreActions } from 'easy-peasy'
const layout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  }
}
const { TabPane } = Tabs
const { Option } = Select
const FlatEditForm = (props) => {
  const { flat, status, onSuccess } = props
  const [isLoading, setLoading] = useState(false)
  const [cStatus, setCStatus] = useState(status)
  const [valueUnit, setValueUnit] = useState('1')
  const [form] = Form.useForm()
  const updateAsset = useStoreActions((state) => state.assets.updateAsset)
  useEffect(() => {
    setCStatus(status)
    setValueUnit(flat.assetValueUnit)
  }, [])

  function callback(key) {
    setCStatus(key)
  }
  const onFinishArea = (values) => {
    const data = { ...values }
    data.assetId = flat.assetId
    data.assetGroupId = flat.assetGroupId
    data.assetStatus = {
      assetStatusId: values.bookingStatus
    }
    // eslint-disable-next-line no-unused-expressions
    setLoading(true)
    rest
      .post(constants.URL.ADD_ASSET, data)
      .then((response) => {
        updateAsset(response.data)
        message.success('Updated!')
        onSuccess()
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        message.error('Update Failed')
      })
  }
  const onFinishFailedArea = (errorInfo) => {
    console.log('Failed:', errorInfo)
    message.warning('Please fill mandatory fields')
  }
  return (
    <Layout.Content>
      <Row justify="center" gutter={[0, 0]}>
        <Form
          {...layout}
          name="basic"
          form={form}
          initialValues={{
            bookingStatus: cStatus,
            assetNumber: flat.assetNumber,
            assetDimen: flat.assetDimen,
            assetValue: flat.assetValue,
            assetValueUnit: valueUnit,
            assetFacing: flat.assetFacing
          }}
          onFinish={onFinishArea}
          onFinishFailed={onFinishFailedArea}
          autoComplete="false"
        >
          <Form.Item
            colon={false}
            label="Flat Name/Number"
            name="assetNumber"
            rules={[
              {
                required: true,
                message: 'Please enter the Flat name'
              }
            ]}
          >
            <Input placeholder="Flat name" />
          </Form.Item>

          <Form.Item
            colon={false}
            label="Property Size (sqft)"
            name="assetDimen"
            rules={[
              {
                required: true,
                message: 'Please enter the size'
              }
            ]}
          >
            <Input placeholder="Property Size" />
          </Form.Item>
          <Form.Item
            colon={false}
            label="Property Value"
            name="assetValue"
            rules={[
              {
                required: true,
                message: 'Please enter the value'
              }
            ]}
          >
            <Input placeholder="Property value" />
          </Form.Item>
          <Form.Item
            colon={false}
            label="Value unit"
            name="assetValueUnit"
            rules={[
              {
                required: true,
                message: 'Please enter the unit'
              }
            ]}
          >
            <Select defaultValue={valueUnit}>
              <Option value="1">SqFt</Option>
              <Option value="2">Flat</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Booking Status"
            name="bookingStatus"
            rules={[
              {
                required: true,
                message: 'Please select status'
              }
            ]}
          >
            {/* <Radio.Group buttonStyle="solid" defaultValue={cStatus}>
              <Radio.Button value="1">Open</Radio.Button>
              <Radio.Button value="2">Booked</Radio.Button>
              <Radio.Button value="3">Blocked</Radio.Button>
            </Radio.Group> */}
            <Tabs
              defaultActiveKey={cStatus + ''}
              onChange={callback}
              style={{ margin: 0 }}
            >
              <TabPane tab="Open" key="1"></TabPane>
              <TabPane tab="Blocked" key="2"></TabPane>
              <TabPane tab="Booked" key="3"></TabPane>
            </Tabs>
          </Form.Item>

          <Form.Item colon={false} label="Property Facing" name="assetFacing">
            <Input placeholder="Property facing" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Update
            </Button>
            <Button
              disabled={isLoading}
              htmlType="button"
              onClick={() => {
                onSuccess()
              }}
              style={{ margin: '0 8px' }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </Layout.Content>
  )
}

export { FlatEditForm }
