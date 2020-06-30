import React from 'react'
import { Form, Input, Button, Layout, Card, Divider } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useStoreActions } from 'easy-peasy'
import { useHistory, Redirect } from 'react-router-dom'
const user = {
  userMobile: '7418767014',
  userPassword: 'password',
  userFname: 'Chennai',
  userSname: 'Chennai',
  userRole: '2',
  userEmailid: 'aswath@gmail.com',
  userMobileAlt: '7418767014',
  userAddress: 'No4 Tree Sakthi Amman  ',
  userCompany: 'Clanizon',
  userCity: 'Chennai',
  userState: 'TamilNadu',
  userOccupation: 'IT',
  preferredCallStart: '09:20:00',
  preferredCallEnd: '09:20:00',
  userCreatedDate: '2020-07-01T00:00:00.000+0000'
}
const LoginForm = () => {
  const history = useHistory()
  const setCurrentUser = useStoreActions((actions) => actions.auth.setUser)
  const onFinish = (data) => {
    console.log('Received values of form: ', data)
    // rest.post(constants.URL.LOGIN,data.user){
    // }
    setCurrentUser(user)
    if (user.userRole == '2') {
      history.go('/agent')
      // return <Redirect to="/agent" />
    } else if (user.userRole == '3') {
      history.go('/admin')
    }
  }

  return (
    <Layout
      style={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Card
        headStyle={{ textAlign: 'center' }}
        title="Login"
        bordered={false}
        style={{ width: 400 }}
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
            name={['user', 'email']}
            rules={[
              {
                required: true,
                message: 'Please enter your email!'
              },
              {
                type: 'email',
                message: 'Please enter valid email'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name={['user', 'password']}
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
