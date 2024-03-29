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
  Space,
  InputNumber
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

  const currentUser = useStoreState((state) => state.auth.user)
  const [loading, setLoading] = useState(false)
  const [groups, setGroups] = useState(null)
  const [contactlist, setContactlist] = useState(null)

  const getAllAgentByAdmin = useStoreActions((actions) => actions.agents.getAllAgentByAdmin)
  const getUserCompany = useStoreActions((actions) => actions.company.getUserCompany)
  const getUserProduct = useStoreActions((actions) => actions.product.getUserProduct)

  const agentList = useStoreState((state) => state.agents.agentlistAdmin)
  const userProdList = useStoreState((state) => state.product.userproductList)
  const companyList = useStoreState((state) => state.company.userCompany)

  const refdata = useStoreState((state) => state.refData.referencedata)
  const data = {
    params:
      '?adminMobile=' + currentUser.createdBy,
    callback: () => {
      setLoading(false)
    }
  }

  const data1 = {
    params:
      '?mobile=' + currentUser.createdBy,
    callback: () => {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    getAllAgentByAdmin(currentUser.createdBy)
    getUserCompany(data1)
    getUserProduct(data)
  }, [])
  const [properties, setProperties] = useState(null)
  const onFinish = (values) => {
    const request = values

    request.createdBy = currentUser.userMobile
    request.createdAdmin = currentUser.createdBy
    request.date = (values && values.date) ? values.date : new Date()
    setIsLoading(true)
    rest
      .post(constants.URL.ADD_FINANCIAL_METRICS, request)
      .then((res) => {
        addLead(res.data)
        message.success('Metrics Added!')
        setIsLoading(false)
        form.resetFields()
        history.goBack()
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

  const handleContactChange = (value) => {
    contactlist.map((contact) => {
      if (contact.userMobile == value) {
        form.setFieldsValue(contact);
      }
    })
  }

  const handleCompanyChange = (value) => {
    setIsLoading(true)

    rest
      .get(constants.URL.GET_COMPANY_DETAIl + '?companyid=' + value)
      .then((res) => {
        console.log(res);
        setIsLoading(false)
        setContactlist(res.data.contactInformation);
        form.setFieldsValue({
          bankName: res.data.bankName,
          branch: res.data.branch,
          country: res.data.country,
          state: res.data.state,
          city: res.data.city
        });
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
      })
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
                            label="Product Business"
                            colon={false}
                            name="productBusiness"
                          >
                            <Select placeholder="Product Business">
                              {refdata && refdata.businesstype &&
                                refdata.businesstype.map((business) => {
                                  return (
                                    <Option key={business.key}>
                                      {business.value}
                                    </Option>
                                  )
                                })}
                            </Select>

                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            colon={false}
                            label="Product Code"
                            name="productId"
                            rules={[
                              { required: true }
                            ]}
                          >
                            <Select placeholder="Product Code">
                              {userProdList &&
                                userProdList.map((product) => {
                                  return (
                                    <Option key={product.productId}>
                                      {product.productModel}
                                    </Option>
                                  )
                                })}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            colon={false}
                            label="Sold By"
                            name="soldBy"
                            rules={[
                              { required: true }
                            ]}
                          >
                            <Select placeholder="Select an Agent">
                              {agentList &&
                                agentList.map((agent) => {
                                  return (
                                    <Option key={agent.userMobile}>
                                      {agent.userFname}
                                    </Option>
                                  )
                                })}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            colon={false}
                            label="Quantity"
                            name="qty"
                            rules={[
                              { required: true, },
                              { pattern: /^[0-9\b]+$/, message: 'Enter valid Quantity number' }
                            ]}
                          >
                            <InputNumber placeholder="Quantity" min={1} />
                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            label="Buyer Company"
                            colon={false}
                            name="buyerCompany"
                            rules={[
                              { required: true }
                            ]}
                          >
                            <Select placeholder="Select Company Name"
                              mode="single"
                              placeholder="Select a Company"
                              onChange={handleCompanyChange}

                            >
                              {companyList &&
                                companyList.map((company) => {
                                  return (
                                    <Option key={company.companyName}>
                                      {company.companyName}
                                    </Option>
                                  )
                                })}
                            </Select>

                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            colon={false}
                            label="Contact"
                            name="userName"
                          >
                            <Select
                              mode="single"
                              placeholder="Select a Contact"
                              onChange={handleContactChange}
                            >
                              {contactlist &&
                                contactlist.map((contact) => {
                                  return (
                                    <Option key={contact.userMobile}>
                                      {contact.userFname}
                                    </Option>
                                  )
                                })}


                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            colon={false}
                            label="Amount"
                            name="amount"
                            rules={[
                              { required: true },
                              { pattern: /^[0-9\b]+$/, message: 'Enter a valid amount number' }
                            ]}
                          >

                            <InputNumber placeholder="Amount" min={1} />
                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            colon={false}
                            label="GC Profit"
                            name="profit"
                          >
                            <Input placeholder="Profit" />
                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            colon={false}
                            label="Date"
                            name="date"
                          >
                            <DatePicker defaultValue={moment('2020/09/09', dateFormat)} format={dateFormat} style={{ width: 420, height: 32 }} />
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
