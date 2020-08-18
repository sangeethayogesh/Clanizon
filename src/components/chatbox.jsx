
import constants from '../constants'
import rest from 'services/http'
import React, { useState, useEffect } from 'react'
import FloatingButton from './floatingButton'
import { Tabs, Form, Input, Button, Row, Col, Select,  message} from 'antd'
import { PaperClipOutlined } from '@ant-design/icons'
import { useStoreState, useStoreActions } from 'easy-peasy'

// const FormItem = Form.Item
const { TextArea } = Input
// import '../../src/App.css'
const { TabPane } = Tabs
const ChatBox = () => {
  const [form] = Form.useForm()
  const [show, setShow] = React.useState(false)
  const [loading, setLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const currentUser = useStoreState((state) => state.auth.user)
  const buttonClick = (e) => {
    e.preventDefault()
    setShow(!show)
  }
  const onFinish = (values) => {
  console.log(values);
  var request = {
    "message":values.message,
    "createdDate":new Date(),
    "createdBy":currentUser.userMobile
  }
  rest
  .post(constants.URL.ADD_NEW_MESSAGE, request)
  .then((res) => {
    message.success('Message Sent!')
    setIsLoading(false)
    form.resetFields()
  })
  .catch((err) => {
    message.error('Message Failed!')
    setIsLoading(false)
    console.error(err)
  })
  }
  const tailLayout = {
    wrapperCol: { offset: 9, span: 16 }
  }
  return (
    <div>
      {show && (
        <div className="floating-box">
          <div className="chatbox-header-text">
            <h4>Contact Agents</h4>
            <p>Want Send message to</p>
          </div>
          <Tabs defaultActiveKey="1" className="chatbox-header">
            <TabPane tab="All" key="1">
              <Form
                labelCol={{ span: 10 }}
                onFinish={onFinish}
                form={form}
                wrapperCol={{ span: 24 }}
                layout="vertical"
              >
                <Form.Item
                  label="Message"
                  name="message"
                  
                  rules={[{ required: true }]}
                  className="chatbox-inputs"
                >
                  <TextArea
                    style={{
                      padding: '10px 20px'
                    }}
                  />
                </Form.Item>
                <Row>
                  <Col span="1"></Col>
                  <Col span="4">
                    <Form.Item>
                      <Button className="chatbox-attachment">
                        <PaperClipOutlined />
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span="5" />
                  <Col span="14">
                    <Form.Item {...tailLayout}>
                      <Button type="primary" htmlType="submit">
                        Send
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form> 
            </TabPane>
           
          </Tabs>
          {/* </div> */}
        </div>
      )}
      <FloatingButton show={show} onClick={buttonClick} />
    </div>
  )
}

export default ChatBox
