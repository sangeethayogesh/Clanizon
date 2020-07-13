import React, { useState } from 'react'
import { Form, Input, Button, Layout, Card, Divider, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useStoreActions } from 'easy-peasy'
import { useHistory } from 'react-router-dom'
import rest from 'services/http'
import constants from '../constants'
const LoginForm = () => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const setCurrentUser = useStoreActions((actions) => actions.auth.setUser)
  const onFinish = (data) => {
    console.log('Received values of form: ', data)
    // rest.post(constants.URL.LOGIN,data.user){
    // }
    setIsLoading(true)
    rest
      .post(constants.URL.LOGIN, data.user)
      .then((response) => {
        setIsLoading(false)
        if (response.data) {
          setCurrentUser(response.data)
          if (!response.data.userRole) {
            message.warn('User role not found')
          } else if (response.data.userRole == '2') {
            history.replace('/agent')
            // return <Redirect to="/agent" />
          } else if (response.data.userRole == '1') {
            history.replace('/admin')
          }
        } else {
          message.error('Invalid user')
        }
      })
      .catch((error) => {
        setIsLoading(false)
        console.log('LOGIN ERROR::', error)
      })
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Card
        headStyle={{ textAlign: 'center' }}
        title="Login"
        bordered={false}
        style={{ width: 400 }}
        className="login-card"
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name={['user', 'userMobile']}
            rules={[
              {
                required: true,
                message: 'Please enter the mobile number'
              },
              {
                pattern: /^\d{10}$/,
                message: 'Enter a valid mobile number'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Mobile Number"
            />
          </Form.Item>
          <Form.Item
            name={['user', 'userPassword']}
            rules={[
              {
                required: true,
                message: 'Please input your Password!'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item style={{ textAlign: 'center' }}>
            <div>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={isLoading}
              >
                Log in
              </Button>
              <Divider type="vertical"></Divider>
              <a href="">Register</a>
            </div>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <span>Or</span>
            <br></br>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </div>
        </Form>
      </Card>
    </Layout>
  )
}
export default LoginForm
