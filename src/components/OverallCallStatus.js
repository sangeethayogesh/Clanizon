/* eslint-disable no-useless-computed-key */
/* eslint-disable space-before-function-paren */
import React, { useEffect, useState } from 'react'
import ProductLead from 'components/ProductLead'
import { useStoreActions } from 'easy-peasy'
import {
  Collapse,
  Row,
  Col,
  Button,
  Form,
  Select,
  DatePicker,
  Divider,
  Radio,
  message,
  Input
} from 'antd'
import '../styles/overall-call-status.css'
import constants from '../constants'
import rest from 'services/http'
import { useHistory } from 'react-router-dom'
import { useStoreState } from 'easy-peasy'
const { Option } = Select
const { Panel } = Collapse


const OverallCallStatus = (props) => {

  const [form] = Form.useForm()
  const currentUser = useStoreState((state) => state.auth.user)
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(false)

const refdata = useStoreState((state) => state.refData.referencedata)
const getUserProduct = useStoreActions((actions) => actions.product.getUserProduct)
var leadItem=[];
var leadItemnew=[];
if(props.leadDetail && props.leadDetail.leadItem){
  leadItem=props.leadDetail.leadItem;
}
const onDataChange = (value) => {
  leadItemnew=value;
  
}

const data = {
  params:
    '?adminMobile=' + currentUser.createdBy,
  callback: () => {
    setLoading(false)
  }
}
useEffect(() => {
  setLoading(true)
  getUserProduct(data)
},[])

form.setFieldsValue({
  leadStatValue: props.leadDetail?props.leadDetail.leadStatus:2,
  advance: (props.leadDetail && props.leadDetail.leadAudit)?(props.leadDetail.leadAudit[0]?props.leadDetail.leadAudit[0].advance : ''):'',
  paymentParts: (props.leadDetail && props.leadDetail.leadAudit)?(props.leadDetail.leadAudit[0]?props.leadDetail.leadAudit[0].paymentParts:''):'',

})
const productList = useStoreState((state) => state.product.userproductList)
  function handleCollapse() {}
  function onCallStatusSave(values) {
   
    var data = { ...values }
    data.leadAuditCreatedUser = props.currentUser.userMobile
    data.leadAuditScheduleDatetime = data.leadAuditScheduleDatetime
      ? data.leadAuditScheduleDatetime.$d
      : undefined
    data.leadAuditLeadId = props.leadId
    data.createdAdmin=props.currentUser.createdBy
    data.leadStatus=data.leadStatValue
    data.leadItem = leadItemnew?leadItemnew:leadItem
    data.leadAuditCreatedDatetime = new Date()
    setIsLoading(true)
    rest
      .post(constants.URL.ADD_NEW_AUDIT, data)
      .then((response) => {
        console.log(response.data)
        message.success('Audit added!')
        setIsLoading(false)
        form.resetFields()
        history.replace('/agent')
      })
      .catch(() => {
        message.error('Audit Failed!')
        setIsLoading(false)
      })
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  // const layout = {
  //   labelCol: {
  //     span: 12
  //   },
  //   wrapperCol: {
  //     span: 12
  //   }
  // }
  const tailLayout = {
    labelCol: {
      span: 24
    },
    wrapperCol: {
      span: 24
    }
  }

  return (
    <Row gutter={[16, 16]}>
      {/* <AttachIntrestedForm
        show={visibleIntrestedForm}
        onClose={onCloseIntrestedForm}
      />
      <AddNote
        visible={visibleNoteForm}
        onClose={onCloseNote}
        onSave={() => onSaveNote}
      /> */}o
      <Col span={24}>
        <Form
          layout="vertical"
          name="form_in_modal"
          // labelCol={{ span: 12 }}
          {...tailLayout}
          form={form}
          initialValues={{
            leadStatValue: props.leadDetail?props.leadDetail.leadStatus:2,
            // advance: (props.leadDetail && props.leadDetail.leadAudit)?props.leadDetail.leadAudit[0].advance:'',
            // paymentParts: (props.leadDetail && props.leadDetail.leadAudit)?props.leadDetail.leadAudit[0].paymentParts:'',
            advance: (props.leadDetail && props.leadDetail.leadAudit)?(props.leadDetail.leadAudit[0]?props.leadDetail.leadAudit[0].advance : ''):'',
            paymentParts: (props.leadDetail && props.leadDetail.leadAudit)?(props.leadDetail.leadAudit[0]?props.leadDetail.leadAudit[0].paymentParts:''):'',

          }}
          onFinish={onCallStatusSave}
          onFinishFailed={onFinishFailed}
        >
          <Collapse
            className="call-status-card"
            defaultActiveKey={['1','2']}
            onChange={handleCollapse}
            expandIconPosition="right"
            expandIcon={() => {
              return <Button type="default">-</Button>
            }}
          >
            <Panel header="Call Status" key="1">
              <Row gutter={[8, 0]}>
                <Col span="8">
                  <Form.Item
                    colon={false}
                    label="Activityies"
                    name="leadAudit1ype"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter the Activity'
                      }
                    ]}
                  >
                    <Select placeholder="Select Activity">
                      <Option value="1">Call</Option>
                      <Option value="2">Presentation</Option>
                      <Option value="3">Proposal Submission</Option>
                      <Option value="4">Demo</Option>
                      <Option value="5">PO Collection</Option>
                      <Option value="6">Payment Collection</Option>
                      <Option value="7">Visit</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span="8">
                  <Form.Item
                    colon={false}
                    label="Lead Status"
                    name="leadStatValue"
                  
                    defaultActiveKey={[props.status]}
                  >
                    <Select placeholder="Select Lead Status">
                     
                    {refdata &&refdata.leadStatus &&
                                refdata.leadStatus.map((leadStatus) => {
                                  if(leadStatus.key!=1){
                                  return (
                                    <Option key={leadStatus.key}>
                                      {leadStatus.value}
                                    </Option>
                                  )}
                                })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span="8">
                  <Form.Item
                    colon={false}
                    label="Activity Status"
                    name="leadAuditStatus"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter the Activity Status'
                      }
                    ]}
                  >
                    <Select placeholder="Activity Status">
                      {refdata && refdata.leadAuditStatus && refdata.leadAuditStatus.map((status, index) => {
                        return (
                          <Option key={status.key}>
                            {status.value}
                          </Option>
                        )
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 0]}>
                {/* <Col span="8">
                  <Form.Item label="Call Duration" name={['call', 'duration']}>
                    <InputNumber onChange={onChangeSec} min={0} />
                    <span> Mins</span>
                  </Form.Item>
                </Col> */}
                <Col span="8">
                  <Form.Item
                    label="Schedule Date"
                    name="leadAuditScheduleDatetime"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter Schedule Date'
                      }
                    ]}
                  >
                    <DatePicker format="YYYY-MM-DD"></DatePicker>
                  </Form.Item>
                </Col>
                
                <Col span="8">
                  <Form.Item
                    label="About the call"
                    name={['leadAuditOutcome', 'auditOutcomeId']}
                    rules={[
                      {
                        required: true,
                        message: 'Please give review'
                      }
                    ]}
                  >
                    <Radio.Group defaultValue="3">
                      <Radio.Button value="1">Positive</Radio.Button>
                      <Radio.Button value="2">Negative</Radio.Button>
                      <Radio.Button value="3">Neutral</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              </Panel>
              <Divider />
              <Panel header="Payment Terms" key="2">
              <Row gutter={[8, 0]}>               
                <Col span="8">
                  <Form.Item
                    colon={false}
                    label="Advance Amount"
                    name="advance"                
                  >
                    <Input placeholder="Advance Payment" />
                  </Form.Item>
                </Col>

                <Col span="8">
                  <Form.Item
                    label="Remaining Amount"
                    name="remaining"
                 
                  >
                    <Input placeholder="Remaining Amount" />
                  </Form.Item>
                </Col>

                <Col span="8">
                  <Form.Item
                    colon={false}
                    label="Payment Parts"
                    name="paymentParts"                 
                  >
                    <Input placeholder="Enter payment terms" />
                  </Form.Item>
                </Col>

               </Row>              
            </Panel>
            <Panel header="Proposal Information" key="3">
                    <ProductLead 
                    productList={productList}
                    refdata={refdata}
                    leadItem={leadItem}
                    allowEdit={false}
                    onDataChange={onDataChange}></ProductLead>
                    </Panel>
                        
           </Collapse>
            <Divider/>
              <Row className="panel-footer-row">
                <div className="btn-wrapper">
                  <Form.Item>
                    <Button
                      title="Save"
                      htmlType="submit"
                      type="primary"
                      className="b-primary"
                      loading={isLoading}
                    >
                      Save
                    </Button>
                    <Button
                      title="Cancel"
                      htmlType="reset"
                      className="b-secondary"
                      disabled={isLoading}
                      onClick={() => history.goBack()}
                    >
                      Cancel
                    </Button>
                  </Form.Item>
                </div>
              </Row>

        </Form>
      </Col>
    </Row>
  )
}

OverallCallStatus.propTypes = {}

export { OverallCallStatus }
