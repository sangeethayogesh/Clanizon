import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Select } from 'antd'
import '../styles/common.css'
import '../styles/add-agent.css'
const { Option } = Select
const layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
}

const AddPlot = props => {
  const onFinish = values => {
    console.log('Success:', values)
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div >
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="false"
      >
        <Form.Item
          colon={false}
          label="Property name"
          name="property_name"
          rules={[

            {
              required: true,
              message: 'Please enter the name of the property!'
            }

          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          colon={false}
          label="Address"
          name="address"
          rules={[

            {
              required: true,
              message: 'Please enter the address of the property'
            }

          ]}
        >
          <Input placeholder="13/xxx,ttyuuu" />
        </Form.Item>
        <Form.Item
          colon={false}
          label="Property Value (sq.ft)"
          name="property_value"
          rules={[
            {
              required: true,
              message: 'Please enter property value'
            }
          ]}
        >
          <Input placeholder="1570" />
        </Form.Item>

        <Form.Item
          colon={false}
          label="Location"
          name="Location"
          rules={[
            {
              required: true,
              message: 'Please enter location'
            }
          ]}
        >
          <Input placeholder="https://www.google.com/maps/place/" />
        </Form.Item>

        <Form.Item
          colon={false}
          label="Land Value / Sq.Ft ( Rs. )"
          name="land_value"
          rules={[
            {
              required: true,
              message: 'Please enter land value'
            }
          ]}
        >
          <Input placeholder="1700" />
        </Form.Item>

        <Form.Item
          name="select"
          label="Select"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please select the plot type!'
            }
          ]}
        >
          <Select placeholder="Residential Plot">
            <Option value="resident">Residential plot</Option>
            <Option value="commercial">Commercial plot</Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button htmlType="button" style={{ margin: '0 8px' }} >
            Cancel
          </Button>
        </Form.Item>

      </Form>
    </div>
  )
}

AddPlot.propTypes = {
  onClick: PropTypes.func
}

export { AddPlot }
