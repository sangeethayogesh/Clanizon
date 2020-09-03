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
const AddProduct = (props) => {
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
  const refdata = useStoreState((state) => state.refData.referencedata)
  useEffect(() => {
    setLoading(true)
    getAllAgents(() => {
      setLoading(false)
    })
  }, [])
  const [properties, setProperties] = useState(null)
  const onFinish = (values) => {
       setIsLoading(true)
       values.createdBy=currentUser.userMobile
	   values.createdAdmin=currentUser.creatdBy
    rest
      .post(constants.URL.ADD_PRODUCT, values)
      .then((res) => {
        addLead(res.data)
        message.success('Product Added!')
        setIsLoading(false)
        form.resetFields()
        history.goBack()
      })
      .catch((err) => {
        message.error('Product Add Failed!')
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
              Add Product
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
                    <Panel header="Product Information" key="1">
                      <Row gutter={[8, 0]}>
                        <Col span="8">
                          <Form.Item
                            label="Product Business"
                            colon={false}
                            name="businessId"
                          >
                            <Select placeholder="Select Product Business">
                            {refdata &&refdata.businesstype &&
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
                            name="productModel"
                            label="Product Model No"
                          >
                            <Input placeholder="Enter product Model No" />
                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            colon={false}
                            name="productName"
                            label="Product Name"
                          >
                            <Input placeholder="product Name" />
                          </Form.Item>
                        </Col>
                        <Col span="16">
                          <Form.Item
                          name="productDescription"
                            label="Product Description"
                            colon={false}
                          >
                            <Input.TextArea placeholder="Description" />
                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            colon={false}
                            name="unitPrice"
                            label="Product Unit price"
                          >
                            <Input placeholder="Product Unit price" />
                          </Form.Item>
                        </Col>

                        <Col span="16">
                          <Form.Item
                          name="productSpecification"
                            label="product Specification"
                            colon={false}
                          >
                            <Input.TextArea placeholder="Specification" />
                          </Form.Item>
                        </Col>
                        <Col span="8">
                          <Form.Item
                            colon={false}
                            name="assetQty"
                            label="Quantity"
                          >
                            <Input placeholder="Quantity" />
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

AddProduct.propTypes = {}

export default AddProduct
