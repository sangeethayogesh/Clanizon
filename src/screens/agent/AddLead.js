import React, { useState, useEffect } from 'react'
import ProductLead from 'components/ProductLead'
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
  message,
  Select
} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import '../../styles/common.css'
import { useHistory } from 'react-router-dom'
import constants from '../../constants'
import rest from 'services/http'
import { useStoreActions, useStoreState } from 'easy-peasy'
const { Panel } = Collapse
const { Option } = Select
const { RangePicker } = TimePicker
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
  var companyData;
  tomorrow.setDate(today.getDate() + 1)
  const history = useHistory()
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const addLead = useStoreActions((actions) => actions.leads.addLead)
  
  const getAllAgents = useStoreActions((actions) => actions.agents.getAllAgents)
  const getAllCompany = useStoreActions((actions) => actions.company.getAllCompany)
  const agentList = useStoreState((state) => state.agents.list)
  const getAllProduct = useStoreActions((actions) => actions.product.getAllProduct)
  const productList = useStoreState((state) => state.product.productList)
  const companyList = useStoreState((state) => state.company.companyList)
  const refdata = useStoreState((state) => state.refData.referencedata)
  const currentUser = useStoreState((state) => state.auth.user)
  const [loading, setLoading] = useState(false)
  var leadItem;
  
  useEffect(() => {
    setLoading(true)
    getAllAgents(() => {
      setLoading(false)
    })
    getAllCompany(() => {
      setLoading(false)
     
    })
    getAllProduct(() => {
      setLoading(false)
     
    })
  }, [])
  const [properties, setProperties] = useState(null)
  const  [contactlist, setContactlist] = useState(null)
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
      leadAgentMobile:data.agentMobile,
      leadSource: 'AD',      
      leadStatus: 2,
      companyid:data.companyName,
      "orderValue":100,
       "partPayment":50,
      "fullPayment":12,
      leadCreateDate: new Date(),
      nextScheduleDatetime: tomorrow,
      leadItem: leadItem
    }        
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

  const onDataChange = (value) => {
    leadItem=value;
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
      .post(constants.URL.GET_ASSET_BY_GROUP_ID + '?groupId=' + id)
      .then((res) => {
       
        
        setProperties(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
      })
  }

  const handleCompanyChange = (value) =>{
    setIsLoading(true)
    console.log(value);
    rest
      .get(constants.URL.GET_COMPANY_DETAIl + '?companyid=' + value)
      .then((res) => {
        console.log(res);
        form.setFieldsValue(res.data);
        setContactlist(res.data.contactInformation);
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
      })
  }
  const handleContactChange= (value) =>{
    contactlist.map((contact) => {
  if(contact.userMobile==value){
    form.setFieldsValue(contact);
  }

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
              Create New Lead
            </h5>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form
                  {...tailLayout}
                  layout="vertical"
                  name="basic"
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="false"
                >
                  <Collapse
                    defaultActiveKey={['1', '2', '3']}
                    onChange={callback}
                  >
                   <Panel header="Company Information" key="1">
                    <Row gutter={[8, 0]}>
                    <Col span="8">
                          <Form.Item
                            label="Company"
                            colon={false}
                            name="companyName"
                          >
                            <Select
                              mode="single"
                              placeholder="Select a Company"
                              onChange={handleCompanyChange}
                            >   
                            {companyList &&
                                companyList.map((company) => {
                                  return (
                                    <Option key={company.companyid}>
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
                            label="Bank Name"
                            name="bankName"
                          >
                            <Input placeholder="Enter bank Name" />
                          </Form.Item>
                        </Col>

                        <Col span="8">
                          <Form.Item
                            colon={false}
                            label="Branch"
                            name="branch"
                          >
                            <Input placeholder="Enter Bank Branch" />
                          </Form.Item>
                        </Col>
                        </Row> 
                      <Row gutter={[8, 0]}>
                        <Col span="16">
                          <Form.Item
                            label="Address"
                            colon={false}
                            name="address"
                          >
                            <Input.TextArea placeholder="Address" />
                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            label="City"
                            colon={false}
                            name="city"
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
                            name="state"
                          >
                            <Input placeholder="State" />
                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            label="Country"
                            colon={false}
                            name="country"
                          >
                            <Input placeholder="Country" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Panel>
                    <Panel header="Contact Information" key="1">
                      <Row gutter={[8, 0]}>
                        <Col span="8">
                        <Form.Item
                            label="Contact Name"
                            colon={false}
                            name="userFname"
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
                            label="Department"
                            name="department"
                          >
                            <Input placeholder="Department" />
                          </Form.Item>
                        </Col>

                        <Col span="8">
                          <Form.Item
                            colon={false}
                            label="Email Id"
                            name="userEmailid"
                            rules={[
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
                            name= "userMobile"                           
                          >
                            <Input placeholder="Mobile" />
                          </Form.Item>
                        </Col>

                        <Col span="8">
                          <Form.Item
                            colon={false}
                            label="Alternate Contact Number"
                            name={['lead', 'userMobileAlt']}
                            rules={[
                              {
                                pattern: /^\d{10}$/,
                                message: 'Enter a valid contact number'
                              }
                            ]}
                          >
                            <Input placeholder="Alternative Mobile" />
                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            label="Assign to Agent"
                            colon={false}
                            name="agentMobile"
                          >
                            <Select
                              mode="single"
                              placeholder="Assign an Agent"
                             
                            >
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
                      </Row>
                    </Panel>
                    
                    <Panel header="Proposal Information" key="3">
                    <ProductLead 
                    productList={productList}
                    refdata={refdata}
                    onDataChange={onDataChange}></ProductLead>
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
