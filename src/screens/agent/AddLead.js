import React from 'react'
import HeaderBar from 'components/HeaderBar'
import { Row, Col, Layout, Divider, Input, Button, Form, Select, TimePicker, Tabs, Radio } from 'antd'

import {
  ArrowLeftOutlined,
  CompressOutlined
} from '@ant-design/icons'

import '../../styles/common.css'

const { TabPane } = Tabs

const { RangePicker } = TimePicker
const { Search } = Input
const { Option } = Select

const { Content, Header } = Layout

const AddLead = props => {
  const onFinish = values => {
    console.log('Success:', values)
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  const radioStyle = {
    display: 'block',
    width: '100%',
    textAlign: 'center',
    height: '40px'
  }
  return (
    <div>
      <HeaderBar drawer={false}>

        <Content style={{ backgroundColor: '#f0f1f4' }}>
          {/* To match the height one dummy header is used */}
          <Header/>
          <Divider style={{ width: '100%', margin: 0 }} />
          <Header>
            <Row>
              <Col span="3">
                <span className="back">
                  <ArrowLeftOutlined /> &nbsp;Back
                </span>
              </Col>
              <Col span="6"></Col>
              <Col span="7">
                <Search
                  placeholder="Enter Locality"
                  onSearch={value => console.log(value)}
                  style={{ width: '100%' }}
                />
              </Col>
              <Col span="6"/>
              <Col span="2"><Button><CompressOutlined /></Button></Col>
            </Row>
          </Header>
          <Divider style={{ width: '100%', margin: 0 }} />
          <div style={{
            padding: '3rem'
          }}>
            <Row>
              <Col className="add-lead-col" span="18">
                <div style={{ padding: '1.5rem' }}>
                  <img src="https://www.myvaastu.in/images/content/vastu-diagonal.jpg" />
                </div>
              </Col>
              <Col span="1"></Col>
              <Col className="add-lead-col" span="5" style={{ padding: '12px' }}>
                <h3>Lead Details</h3>
                <Divider style={{ width: '100%', margin: 0 }} />
                <Form
                  layout= "vertical"
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
                    label="Lead Name"
                    name="lead_name"
                    rules={[

                      {
                        required: true,
                        message: 'Please enter the name of the lead'
                      }
                    ]}
                  >
                    <Input placeholder="Name"/>
                  </Form.Item>
                  <Form.Item
                    colon={false}
                    label="Contact Number"
                    name="contact_number"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter the contact number'
                      }
                    ]}
                  >
                    <Input placeholder="Mobile"/>
                  </Form.Item>
                  <Form.Item
                    colon={false}
                    label="Alternative Contact Number"
                    name="al_contact_number"

                  >
                    <Input placeholder="Alternative Mobile"/>
                  </Form.Item>
                  <Form.Item label="Residential Address">
                    <Form.Item
                      colon={false}
                      name={['address', 'door_no']}
                    >
                      <Input placeholder="DoorNo / Plot No"/>
                    </Form.Item>
                    <Form.Item
                      colon={false}
                      name={['address', 'street_name']}
                    >
                      <Input placeholder="Street Name"/>
                    </Form.Item>
                    <Form.Item
                      colon={false}
                      name={['address', 'city']}
                    >
                      <Input placeholder="City"/>
                    </Form.Item>
                    <Input.Group compact>
                      <Form.Item
                        name={['address', 'state']}
                        noStyle
                        rules={[{ required: true, message: 'State is required' }]}
                      >
                        <Select placeholder="Select State">
                          <Option value="Zhejiang">Zhejiang</Option>
                          <Option value="Jiangsu">Jiangsu</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name={['address', 'country']}
                        noStyle
                        rules={[{ required: true, message: 'Country is required' }]}
                      >
                        <Select placeholder="Select Country">
                          <Option value="Zhejiang">India</Option>
                          <Option value="Jiangsu">Swiss</Option>
                        </Select>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                  <Form.Item
                    colon={false}
                    label="Best Time to call"
                    name="call_time"
                  >
                    <RangePicker />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
            <br />
            <Row>
              <Col span="18" className="add-lead-col" style={{ padding: '12px' }}>
                <h3>Feeds about interested plots</h3>
                <Divider style={{ width: '100%', margin: 0 }} />
                <Tabs defaultActiveKey="1" >
                  <TabPane tab="Plot CA301" key="1">
                    <Form
                      layout= "vertical"
                      name="basic"
                      initialValues={{
                        remember: true
                      }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="false"
                    >
                      <Row>
                        <Col span="18" style={{
                          padding: '2rem'
                        }}>
                          <Form.Item
                            colon={false}
                            label="Notes"
                            name="notes"
                          >
                            <Input.TextArea rows={4} placeholder="Add your notes here..."/>
                          </Form.Item>

                        </Col>
                        <Col span="6" style={{
                          padding: '2rem'
                        }}>
                          <Form.Item
                            colon={false}
                            label="Positive Lead Score"
                            name="postivive_lead"

                          >
                            <Input placeholder="Ex: 90%"/>
                          </Form.Item>
                          <Form.Item
                            colon={false}
                            label="Negative Lead Score"
                            name="negative_lead"

                          >
                            <Input placeholder="Ex: 90%"/>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </TabPane>
                  <TabPane tab="Plot CA304" key="2">
      Content of Tab Pane 2
                  </TabPane>
                  <TabPane tab="Plot CA305" key="3">
      Content of Tab Pane 3
                  </TabPane>
                </Tabs>
              </Col>
              <Col span="1"></Col>
              <Col span="5" className="add-lead-col" style={{ padding: '25px' }}>
                <h3>Plot Status</h3>
                <Divider style={{ width: '100%', margin: 0 }} />
                <br />
                <Radio.Group defaultValue="open" style={{ width: '100%' }}>
                  <Radio.Button style={radioStyle} value="open">Open</Radio.Button>
                  <Radio.Button style={radioStyle} value="book">Book</Radio.Button>
                  <Radio.Button style={radioStyle} value="block">Block</Radio.Button>
                </Radio.Group>
              </Col>
            </Row>
          </div>
        </Content>
      </HeaderBar>

    </div>
  )
}

AddLead.propTypes = {}

export default AddLead
