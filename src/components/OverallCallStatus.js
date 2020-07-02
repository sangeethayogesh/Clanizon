/* eslint-disable no-useless-computed-key */
/* eslint-disable space-before-function-paren */
import React, { useState } from 'react'
import {
  Collapse,
  Row,
  Col,
  Button,
  Input,
  Form,
  Select,
  DatePicker,
  Divider,
  Radio,
  message
} from 'antd'
import '../styles/overall-call-status.css'
import constants from '../constants'
import rest from 'services/http'
import { useHistory } from 'react-router-dom'
const { Option } = Select
const { Panel } = Collapse

// const AttachIntrestedForm = (props) => {
//   return (
//     <Drawer
//       title="Add Intrest"
//       width={720}
//       onClose={props.onClose}
//       visible={props.show}
//       bodyStyle={{ paddingBottom: 80 }}
//       footer={
//         <div
//           style={{
//             textAlign: 'right'
//           }}
//         >
//           <Button onClick={props.onClose} style={{ marginRight: 8 }}>
//             Cancel
//           </Button>
//           <Button onClick={() => props.onClose} type="primary">
//             Submit
//           </Button>
//         </div>
//       }
//     >
//       <Form layout="vertical" hideRequiredMark>
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item
//               name="name"
//               label="Name"
//               rules={[{ required: true, message: 'Please enter user name' }]}
//             >
//               <Input placeholder="Please enter user name" />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//               name="url"
//               label="Url"
//               rules={[{ required: true, message: 'Please enter url' }]}
//             >
//               <Input
//                 style={{ width: '100%' }}
//                 addonBefore="http://"
//                 addonAfter=".com"
//                 placeholder="Please enter url"
//               />
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item
//               name="owner"
//               label="Owner"
//               rules={[{ required: true, message: 'Please select an owner' }]}
//             >
//               <Select placeholder="Please select an owner">
//                 <Option value="xiao">Xiaoxiao Fu</Option>
//                 <Option value="mao">Maomao Zhou</Option>
//               </Select>
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//               name="type"
//               label="Type"
//               rules={[{ required: true, message: 'Please choose the type' }]}
//             >
//               <Select placeholder="Please choose the type">
//                 <Option value="private">Private</Option>
//                 <Option value="public">Public</Option>
//               </Select>
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item
//               name="approver"
//               label="Approver"
//               rules={[
//                 { required: true, message: 'Please choose the approver' }
//               ]}
//             >
//               <Select placeholder="Please choose the approver">
//                 <Option value="jack">Jack Ma</Option>
//                 <Option value="tom">Tom Liu</Option>
//               </Select>
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//               name="dateTime"
//               label="DateTime"
//               rules={[
//                 { required: true, message: 'Please choose the dateTime' }
//               ]}
//             >
//               <DatePicker.RangePicker
//                 style={{ width: '100%' }}
//                 getPopupContainer={(trigger) => trigger.parentNode}
//               />
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row gutter={16}>
//           <Col span={24}>
//             <Form.Item
//               name="description"
//               label="Description"
//               rules={[
//                 {
//                   required: true,
//                   message: 'please enter url description'
//                 }
//               ]}
//             >
//               <Input.TextArea
//                 rows={4}
//                 placeholder="please enter url description"
//               />
//             </Form.Item>
//           </Col>
//         </Row>
//       </Form>
//     </Drawer>
//   )
// }

const OverallCallStatus = (props) => {
  // console.log(props)
  // const [visibleIntrestedForm, setVisibleIntrestedForm] = useState(false)
  // const [visibleNoteForm, setVisibleNoteForm] = useState(false)
  const [form] = Form.useForm()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)

  function handleCollapse() {}
  function onCallStatusSave(values) {
    var data = { ...values }
    data.leadAuditCreatedUser = {
      userMobile: props.currentUser.userMobile
    }
    data.leadAuditScheduleDatetime = data.leadAuditScheduleDatetime
      ? data.leadAuditScheduleDatetime.$d
      : undefined
    data.leadAuditLeadId = props.leadId
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
      /> */}
      <Col span={24}>
        <Form
          layout="vertical"
          name="form_in_modal"
          // labelCol={{ span: 12 }}
          {...tailLayout}
          form={form}
          initialValues={{
            leadStatus: props.status + '',
            leadInterest: props.interest
          }}
          onFinish={onCallStatusSave}
          onFinishFailed={onFinishFailed}
        >
          <Collapse
            className="call-status-card"
            defaultActiveKey={['1']}
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
                    label="Call type"
                    name={['leadAuditType', 'auditTypeId']}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter the Call type"'
                      }
                    ]}
                  >
                    <Select placeholder="Select Call Type">
                      <Option value="1">Inbound</Option>
                      <Option value="2">Outbound</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span="8">
                  <Form.Item
                    colon={false}
                    label="Lead Status"
                    name="leadStatus"
                    defaultActiveKey={[props.status]}
                  >
                    <Select placeholder="Select Lead Status">
                      <Option key={1} value="1">
                        Created
                      </Option>
                      <Option key={2} value="2">
                        Prospecting
                      </Option>
                      <Option key={3} value="3">
                        Closure
                      </Option>
                      <Option key={4} value="4">
                        Converted
                      </Option>
                      <Option key={5} value="5">
                        Completed
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span="8">
                  <Form.Item
                    colon={false}
                    label="Call purpose"
                    name={['leadAuditStatus', 'auditStatusId']}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter the call purpose'
                      }
                    ]}
                  >
                    <Select placeholder="Call Purpose">
                      {constants.auditStatus.map((status, index) => {
                        return (
                          <Option key={index} value={status.auditStatusId}>
                            {status.auditStatus}
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
                  <Form.Item label="Interested In" name="leadInterest">
                    <Input
                      placeholder="Interested in"
                      defaultValue={props.interest}
                    ></Input>
                  </Form.Item>
                </Col>
                <Col span="8">
                  <Form.Item
                    label="About the call"
                    name={['leadAuditOutcome', 'auditOutcomeId']}
                    rules={[
                      {
                        required: true,
                        message: 'Please give reviewe'
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
              <Divider />
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
            </Panel>
          </Collapse>
        </Form>
      </Col>
    </Row>
  )
}

OverallCallStatus.propTypes = {}

export { OverallCallStatus }
