import React, { useState } from 'react'
import { Row, Button, Input, message, Form, Layout, Radio } from 'antd'
import constants from '../../constants'
import rest from 'services/http'
import { useStoreState, useStoreActions } from 'easy-peasy'
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
  const addAsset = useStoreActions((state) => state.assets.addAsset)
  const onFinishArea = (values) => {
    console.log(values)
    values.assetGroupId = props.group.assetGroupId
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
          initialValues={{ assestStatus: { assetStatusId: 1 } }}
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
            label="Booking Status"
            name={['assetStatus', 'assetStatusId']}
            rules={[
              {
                required: true,
                message: 'Please select status'
              }
            ]}
          >
            <Radio.Group>
              <Radio.Button value="1">Open</Radio.Button>
              <Radio.Button value="2">Booked</Radio.Button>
              <Radio.Button value="3">Blocked</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            colon={false}
            label="Area"
            name="assetArea"
            rules={[
              {
                required: true,
                message: 'Please enter the area'
              },

              { pattern: /^[0-9]+$/, message: 'Enter a valid number' }
            ]}
          >
            <Input placeholder="Area" />
          </Form.Item>
          <Form.Item
            colon={false}
            label="Property Facing"
            name="assestFacing"
            rules={[
              {
                required: true,
                message: 'Please enter the facing'
              }
            ]}
          >
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
