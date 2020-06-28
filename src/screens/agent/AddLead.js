import React, { useState } from 'react'
import HeaderBar from 'components/HeaderBar'
import {
  Row,
  Col,
  Layout,
  Divider,
  Input,
  Button,
  Form,
  TimePicker,
  Collapse,
  message
} from 'antd'
import { ArrowLeftOutlined, CompressOutlined } from '@ant-design/icons'
import '../../styles/common.css'
import { useHistory } from 'react-router-dom'
import constants from '../../constants'
import rest from 'services/http'
import { useStoreActions } from 'easy-peasy'
const { Panel } = Collapse
const { RangePicker } = TimePicker
const { Search } = Input
const { Content, Header } = Layout
const tailLayout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  }
}
const AddLead = (props) => {
  var today = new Date()
  var tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  const history = useHistory()
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const addLead = useStoreActions((actions) => actions.leads.addLead)

  const onFinish = (values) => {
    const data = values
    data.lead.userOccupation = 'default'
    data.lead.userPassword = data.lead.userMobile
    data.lead.userMobileAlt = data.lead.userMobile
    data.lead.preferredCallStart = values.best_call_time
      ? values.best_call_time[0].$d.toTimeString().split(' ')[0]
      : null
    data.lead.preferredCallEnd = values.best_call_time
      ? values.best_call_time[1].$d.toTimeString().split(' ')[0]
      : null

    const request = {
      leadAgentMobile: constants.currentAgent.mobile || '8122723731',
      leadSource: data.leadSource,
      leadCustomer: data.lead,
      leadStatus: 1,
      leadCreateDate: new Date(),
      nextScheduleDatetime: tomorrow
    }
    console.log('Success:', request)
    setIsLoading(true)
    rest
      .post(constants.URL.ADD_NEW_LEAD, request)
      .then((res) => {
        addLead(res.data)
        message.success('Lead Added!')
        setIsLoading(false)
        form.resetFields()
      })
      .catch((err) => {
        message.error('Failed!')
        setIsLoading(false)
        console.error(err)
      })
  }
  function callback(key) {
    console.log(key)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
    message.warning('Please fill mandatory fields')
  }
  return (
    <div>
      <HeaderBar drawer={false}>
        <Content style={{ backgroundColor: '#f0f1f4' }}>
          {/* To match the height one dummy header is used */}
          <Header />
          <Divider style={{ width: '100%', margin: 0 }} />
          <Header>
            <Row>
              <Col span="3">
                <span
                  className="back"
                  onClick={() => {
                    history.goBack()
                  }}
                >
                  <ArrowLeftOutlined /> &nbsp;Back
                </span>
              </Col>
              <Col span="6"></Col>
              <Col span="7">
                <Search
                  placeholder="Enter Locality"
                  onSearch={(value) => console.log(value)}
                  style={{ width: '100%' }}
                />
              </Col>
              <Col span="6" />
              <Col span="2">
                <Button>
                  <CompressOutlined />
                </Button>
              </Col>
            </Row>
          </Header>
          <Divider style={{ width: '100%', margin: 0 }} />
          <div
            style={{
              padding: '1rem'
            }}
          >
            <h5
              style={{
                fontFamily: 'Lato',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#150e4f'
              }}
            >
              Create New Lead
            </h5>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form
                  {...tailLayout}
                  layout="vertical"
                  name="basic"
                  form={form}
                  initialValues={{}}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="false"
                >
                  <Collapse
                    defaultActiveKey={['1', '2', '3']}
                    onChange={callback}
                  >
                    <Panel header="Contact Information" key="1">
                      <Row gutter={[8, 0]}>
                        <Col span="8">
                          <Form.Item
                            colon={false}
                            label="Lead First Name"
                            name={['lead', 'userFname']}
                            rules={[
                              {
                                required: true,
                                message: 'Please enter the first name'
                              }
                            ]}
                          >
                            <Input placeholder="First Name" />
                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            colon={false}
                            label="Lead Last Name"
                            name={['lead', 'userSname']}
                            rules={[
                              {
                                required: true,
                                message: 'Please enter the last name'
                              }
                            ]}
                          >
                            <Input placeholder="Last Name" />
                          </Form.Item>
                        </Col>

                        <Col span="8">
                          <Form.Item
                            colon={false}
                            label="Email Id"
                            name={['lead', 'userEmailid']}
                            rules={[
                              {
                                required: true,
                                message: 'Please enter the email id'
                              },
                              {
                                type: 'email',
                                message: 'Please enter valid email id'
                              }
                            ]}
                          >
                            <Input placeholder="Email Id" />
                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            colon={false}
                            label="Contact Number"
                            name={['lead', 'userMobile']}
                            rules={[
                              {
                                required: true,
                                message: 'Please enter the contact number'
                              }
                            ]}
                          >
                            <Input placeholder="Mobile" />
                          </Form.Item>
                        </Col>

                        <Col span="8">
                          <Form.Item
                            colon={false}
                            label="Alternate Contact Number"
                            name={['lead', 'userMobileAlt']}
                          >
                            <Input placeholder="Alternative Mobile" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Panel>
                    <Panel header="Residential Information" key="2">
                      <Row gutter={[8, 0]}>
                        <Col span="16">
                          <Form.Item
                            label="Address"
                            colon={false}
                            name={['lead', 'userAddress']}
                          >
                            <Input.TextArea placeholder="Address" />
                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            label="City"
                            colon={false}
                            name={['lead', 'userCity']}
                          >
                            <Input placeholder="City Name" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={[8, 0]}>
                        <Col span="8">
                          <Form.Item
                            label="State"
                            colon={false}
                            name={['lead', 'userState']}
                          >
                            <Input placeholder="State" />
                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            label="Country"
                            colon={false}
                            name={['lead', 'userCountry']}
                          >
                            <Input placeholder="Country" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Panel>
                    <Panel header="Business Information" key="3">
                      <Row gutter={[8, 0]}>
                        <Col span="8">
                          <Form.Item
                            colon={false}
                            label="Best Time to call"
                            name="best_call_time"
                          >
                            <RangePicker
                              format="HH:mm a"
                              minuteStep={30}
                              use12Hours={true}
                            />
                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            label="Lead Source"
                            colon={false}
                            name="leadSource"
                          >
                            <Input placeholder="Lead Source" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Panel>
                  </Collapse>
                  <Row
                    gutter={[24, 24]}
                    style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
                  >
                    <Col span="24">
                      <Button
                        block
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                      >
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
            <br />
          </div>
        </Content>
      </HeaderBar>
    </div>
  )
}

AddLead.propTypes = {}

export default AddLead
