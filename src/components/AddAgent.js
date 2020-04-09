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

const AddAgent = props => {
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
          label="Agent Email"
          name="agent_email"
          rules={[

            {
              required: true,
              message: 'Please enter agnet E-mail!'
            },
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            }

          ]}
        >
          <Input placeholder="E-mail"/>
        </Form.Item>
        <Form.Item
          colon={false}
          label="Agent name"
          name="agent_name"
          rules={[
            {
              required: true,
              message: 'Please enter agnet name!'
            }
          ]}
        >
          <Input placeholder="Name"/>
        </Form.Item>

        <Form.Item
          colon={false}
          label="Contact Number"
          name="agent_contact_number"
          rules={[
            {
              required: true,
              message: 'Please input your contact number!'
            }
          ]}
        >
          <Input placeholder="Number"/>
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select
            placeholder="Gender"
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          colon={false}
          label="City"
          name="agent_city"
          rules={[
            {
              required: true,
              message: 'Please input your city!'
            }
          ]}
        >
          <Input placeholder="City"/>
        </Form.Item>
        <Form.Item
          name="select"
          label="Select"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please select your country!'
            }
          ]}
        >
          <Select placeholder="Country">
            <Option value="india">India</Option>
            <Option value="usa">U.S.A</Option>
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

AddAgent.propTypes = {
  onClick: PropTypes.func
}

export { AddAgent }
