import React, { useState } from 'react'
import { Row, Button, Input, message, Form, Layout, Radio, Tabs,Select } from 'antd'
import constants from '../../constants'
import rest from 'services/http'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useHistory } from 'react-router-dom'

const { TabPane } = Tabs
const { Option } = Select
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
    offset: 24,
    span: 24
  }
}

const FlatForm = (props) => {
  const [isLoading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const history = useHistory()
  const [cStatus, setCStatus] = useState(1)
  const addAsset = useStoreActions((state) => state.assets.addAsset)
  function callback(key) {
    setCStatus(key)
  }
  const onFinishArea = (values) => {
    console.log(values)
    values.assetGroupId = props.group
      ? props.group.assetGroupId
      : history.replace('/login')
    values.assestStatus = { assetStatusId: cStatus }
    // eslint-disable-next-line no-unused-expressions
    setLoading(true)
    rest
      .post(constants.URL.ADD_ASSET, values)
      .then((response) => {
        console.log(response.data)
        addAsset(response.data)
        message.success('Added!')
        form.resetFields()
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        message.error('Failed to add')
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
          initialValues={{ assetStatus: { assetStatusId: 1 } }}
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
            label="Property Value (sqft)"
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
            <Select placeholder="Select unit">
                      <Option value="1">SqFt</Option>
                      <Option value="2">Flat</Option>
                    </Select>
          </Form.Item>
          <Form.Item
            label="Booking Status"
            name={['assetStatus', 'assetStatusId']}
            rules={[
              {
                required: true,
                message: 'Please select status'
              }
            ]}
          >
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
              Save
            </Button>
            <Button
              disabled={isLoading}
              htmlType="button"
              onClick={() => {
                form.resetFields()
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

export { FlatForm }
