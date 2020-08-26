import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Select, message } from 'antd'
import '../styles/common.css'
import '../styles/add-agent.css'
import constants from '../constants'
import { useStoreActions, useStoreState } from 'easy-peasy'
import rest from 'services/http'
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

const AddAgent = (props) => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const currentUser = useStoreState((state) => state.auth.user)
  const addNewAgent = useStoreActions((actions) => actions.agents.addNewAgent)

  const onFinish = (values) => {
    console.log('Success:', values)
    const data = values
    data.agent.userPassword = data.agent.userMobile
    data.agent.createdBy = currentUser.userMobile
    data.agent.userMobileAlt = data.agent.userMobileAlt
      ? data.agent.userMobileAlt
      : '0123456789'
    data.agent.userRole = 2
    setIsLoading(true)
    rest
      .post(constants.URL.ADD_NEW_AGENT, data.agent)
      .then((res) => {
        addNewAgent(res.data)
        message.success('Agent Added')
        setIsLoading(false)
        form.resetFields()
        props.doClose()
      })
      .catch((err) => {
        message.error('Failed!')
        console.error(err)
        setIsLoading(false)
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const reset = () => {
    form.resetFields()
    props.doClose()
  }

  return (
    <div>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true
        }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="new-email"
      >
        <Form.Item
          colon={false}
          label="First name"
          name={['agent', 'userFname']}
          rules={[
            {
              required: true,
              message: 'Please enter First name!'
            }
          ]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          colon={false}
          label="Second name"
          name={['agent', 'userSname']}
        >
          <Input placeholder="Second Name" />
        </Form.Item>
        <Form.Item
          colon={false}
          label="Agent Email"
          name={['agent', 'userEmailid']}
        >
          <Input placeholder="E-mail" />
        </Form.Item>

        <Form.Item
          label="Mobile Number"
          name={['agent', 'userMobile']}
          colon={false}
          rules={[
            { required: true, message: 'Mobile Number is required' },
            { pattern: /^\d{10}$/, message: 'Enter a valid mobile number' }
          ]}
        >
          <Input style={{ width: '50%' }} placeholder="Mobile Number" />
        </Form.Item>
        <Form.Item
          label="Alt Mobile Number"
          name={['agent', 'userMobileAlt']}
          colon={false}
        >
          <Input
            style={{ width: '50%' }}
            placeholder="Alternate Mobile Number"
          />
        </Form.Item>

        <Form.Item
          colon={false}
          name={['agent', 'userAddress']}
          label="Address"
        >
          <Input.TextArea placeholder="Address"></Input.TextArea>
        </Form.Item>
        <Form.Item
          colon={false}
          label="Occupation"
          name={['agent', 'userOccupation']}
        >
          <Input placeholder="Occupation" />
        </Form.Item>
        <Form.Item colon={false} label="City" name={['agent', 'userCity']}>
          <Input placeholder="City" />
        </Form.Item>
        <Form.Item name={['agent', 'userCountry']} label="Country">
          <Select placeholder="Country">
            <Option value="India">India</Option>
          </Select>
        </Form.Item>

        <Form.Item name={['agent', 'userTarget']} label="Monthly Target">
          <Input placeholder="Monthly Buying Platform Target " />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Save
          </Button>
          <Button
            disabled={isLoading}
            htmlType="button"
            onClick={() => {
              reset()
            }}
            style={{ margin: '0 8px' }}
          >
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
