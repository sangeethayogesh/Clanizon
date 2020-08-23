import React, { useState, useEffect } from 'react'
import HeaderBar from 'components/HeaderBar'
import {
  Row,
  Col,
  Layout,
  Divider,
  Input,
  Button,
  Form,
  Collapse,
  message,
  Select,
  Checkbox,
  DatePicker,
  Space
} from 'antd'
import moment from 'moment'
import { ArrowLeftOutlined } from '@ant-design/icons'
import '../../styles/common.css'
import { useHistory } from 'react-router-dom'
import constants from '../../constants'
import rest from 'services/http'
import { useStoreActions, useStoreState } from 'easy-peasy'
const { Panel } = Collapse
const { Option } = Select
const { RangePicker } = DatePicker
const { Content, Header } = Layout
const dateFormat = 'YYYY/MM/DD'
const tailLayout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  }
}
const AddFinancialMetrics = (props) => {
  var today = new Date()
  var tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  const history = useHistory()
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const addLead = useStoreActions((actions) => actions.leads.addLead)
  const getAllAgents = useStoreActions((actions) => actions.agents.getAllAgents)
  const agentList = useStoreState((state) => state.agents.list)
  const currentUser = useStoreState((state) => state.auth.user)
  const [loading, setLoading] = useState(false)
  const [groups, setGroups] = useState(null)
  useEffect(() => {
    setLoading(true)
    getAllAgents(() => {
      setLoading(false)
    })
  }, [])
  const [properties, setProperties] = useState(null)
  const onFinish = (values) => {
    const data = values
    data.lead.userOccupation = '-'
    data.lead.userPassword = data.lead.userMobile
    data.lead.userMobileAlt = data.lead.userMobile
    data.lead.preferredCallStart = values.best_call_time
      ? values.best_call_time[0].$d.toTimeString().split(' ')[0]
      : null
    data.lead.preferredCallEnd = values.best_call_time
      ? values.best_call_time[1].$d.toTimeString().split(' ')[0]
      : null

    var leadList = []
    for (var i = 0; i < data.leadItemAssetId.length; i++) {
      var leaditem = {}
      leaditem.leadItemAssetId = data.leadItemAssetId[i]
      leadList.push(leaditem)
    }
    const request = {
      leadAgentMobile: data.agentMobile,
      leadSource: data.leadSource ? data.leadSource : '-',
      leadCustomer: data.lead,
      leadStatus: 1,
      leadInterest: data.leadInterest,
      leadCreateDate: new Date(),
      nextScheduleDatetime: tomorrow,
      leadItem: leadList
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
  function callback (key) {
    console.log(key)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
    message.warning('Please fill mandatory fields')
  }
  const getGroups = () => {
    setIsLoading(true)
    rest
      .get(constants.URL.GET_ASSET_GROUPS)
      .then((res) => {
        setGroups(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
      })
  }

  const onChangeArea = (id) => {
    setIsLoading(true)
    rest
      .get(constants.URL.GET_ASSET_BY_GROUP_ID + '?groupId=' + id)
      .then((res) => {
        setProperties(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
      })
  }
  useEffect(() => {
    getGroups()
  }, [])
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
                {/* <Search
                  placeholder="Enter Locality"
                  onSearch={(value) => console.log(value)}
                  style={{ width: '100%' }}
                /> */}
              </Col>
              <Col span="6" />
              <Col span="2">
                {/* <Button>
                  <CompressOutlined />
                </Button> */}
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
              Add Financial Metrics
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
                    <Panel header="Financial Metrics Information" key="1">
                      <Row gutter={[8, 0]}>
                        <Col span="8">
                          <Form.Item
                            label="Product_Business"
                            colon={false}
                          >
                            <Select placeholder="Product_Business">
                              <Option>UPS</Option>
                              <Option>Connectivity</Option>
                              <Option>Racks</Option>
                              <Option>Industrial & service</Option>
                            </Select>

                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            colon={false}
                            label="Product_Code"
                          >
                            <Select placeholder="Product_Business">
                              <Option>Code 1</Option>
                              <Option>Code 2</Option>
                              <Option>Code 3</Option>
                              <Option>Code 4</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            colon={false}
                            label="Sold By"
                          >
                            <Select placeholder="Product_Business">
                              <Option>Salesman 1</Option>
                              <Option>Salesman 2</Option>
                              <Option>Salesman 3</Option>
                              <Option>Salesman 4</Option>
                            </Select>

                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            colon={false}
                            label="Quality"

                          >
                            <Input placeholder="Quality" />
                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            label="Buyer Company"
                            colon={false}
                          >
                            <Input placeholder="Company Name" />
                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            colon={false}
                            label="User"
                          >
                            <Input placeholder="User" />
                          </Form.Item>
                        </Col>

                        <Col span="8">
                          <Form.Item
                            label="User Mobile Number"
                            colon={false}
                            rules={[
                              {
                                pattern: /^\d{10}$/,
                                message: 'Enter a valid contact number'
                              }
                            ]}
                          >
                            <Input placeholder="User Mobile" />
                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            colon={false}
                            label="Amount"
                          >
                            <Input placeholder="Amount" />
                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            colon={false}
                            label="Date"
                          >
                            <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} style={{ width: 420, height: 32 }}/>
                          </Form.Item>
                        </Col>

                        <Col span="8">
                          <Form.Item
                            colon={false}
                            label="Sold By"
                          >
                            <Input placeholder="Sold By" />
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

AddFinancialMetrics.propTypes = {}

export default AddFinancialMetrics