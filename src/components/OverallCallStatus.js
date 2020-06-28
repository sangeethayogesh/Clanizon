/* eslint-disable no-useless-computed-key */
/* eslint-disable space-before-function-paren */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Collapse,
  Row,
  Col,
  Button,
  Input,
  Form,
  Select,
  TimePicker,
  InputNumber,
  DatePicker,
  Divider,
  Tooltip,
  Drawer,
  Radio,
  message
} from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import '../styles/overall-call-status.css'
import { useForm } from 'antd/lib/form/util'
import { AddNote } from './drawer/AddNote'
import constants from '../constants'
import rest from 'services/http'
import { useHistory } from 'react-router-dom'
const { Option } = Select
const { Panel } = Collapse

const AttachIntrestedForm = (props) => {
  return (
    <Drawer
      title="Add Intrest"
      width={720}
      onClose={props.onClose}
      visible={props.show}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: 'right'
          }}
        >
          <Button onClick={props.onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={() => props.onClose} type="primary">
            Submit
          </Button>
        </div>
      }
    >
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <Input placeholder="Please enter user name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="url"
              label="Url"
              rules={[{ required: true, message: 'Please enter url' }]}
            >
              <Input
                style={{ width: '100%' }}
                addonBefore="http://"
                addonAfter=".com"
                placeholder="Please enter url"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="owner"
              label="Owner"
              rules={[{ required: true, message: 'Please select an owner' }]}
            >
              <Select placeholder="Please select an owner">
                <Option value="xiao">Xiaoxiao Fu</Option>
                <Option value="mao">Maomao Zhou</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true, message: 'Please choose the type' }]}
            >
              <Select placeholder="Please choose the type">
                <Option value="private">Private</Option>
                <Option value="public">Public</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="approver"
              label="Approver"
              rules={[
                { required: true, message: 'Please choose the approver' }
              ]}
            >
              <Select placeholder="Please choose the approver">
                <Option value="jack">Jack Ma</Option>
                <Option value="tom">Tom Liu</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="dateTime"
              label="DateTime"
              rules={[
                { required: true, message: 'Please choose the dateTime' }
              ]}
            >
              <DatePicker.RangePicker
                style={{ width: '100%' }}
                getPopupContainer={(trigger) => trigger.parentNode}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: 'please enter url description'
                }
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="please enter url description"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}

const OverallCallStatus = (props) => {
  const [visibleIntrestedForm, setVisibleIntrestedForm] = useState(false)
  const [visibleNoteForm, setVisibleNoteForm] = useState(false)
  const [form] = Form.useForm()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const onCloseIntrestedForm = () => {
    setVisibleIntrestedForm(false)
  }

  const onCloseNote = () => {
    setVisibleNoteForm(false)
  }
  const onSaveNote = (d) => {
    setVisibleNoteForm(false)
    console.log('Note Saved::', d)
  }

  function handleCollapse() {}
  function onCallStatusSave(values) {
    var data = { ...values }
    data.leadStatus = data.leadStatus.value
    data.leadAuditCreatedUser = {
      userMobile: constants.currentAgent.mobile || '8122723731'
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
        history.goBack()
      })
      .catch(() => {
        message.error('Audit Failed!')
        setIsLoading(false)
      })
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  function onChangeSec(value) {
    form.setFieldsValue({ call: { duration: value } })
  }
  function onCallTypeChange(value) {
    // form.setFieldsValue({ callType: value })
  }
  function formatter(value) {
    return `${value}%`
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
      <AttachIntrestedForm
        show={visibleIntrestedForm}
        onClose={onCloseIntrestedForm}
      />
      <AddNote
        visible={visibleNoteForm}
        onClose={onCloseNote}
        onSave={() => onSaveNote}
      />
      <Col span={24}>
        <Form
          layout="vertical"
          name="form_in_modal"
          // labelCol={{ span: 12 }}
          {...tailLayout}
          form={form}
          defaultValue={{
            leadStatus: props.status
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
                    rules={[
                      {
                        required: true,
                        message: 'Please select lead status'
                      }
                    ]}
                  >
                    <Select
                      labelInValue
                      defaultValue={{ key: props.status + '' }}
                      placeholder="Select Lead Status"
                    >
                      <Option value="1">Created</Option>
                      <Option value="2">Prospecting</Option>
                      <Option value="3">Closure</Option>
                      <Option value="4">Converted</Option>
                      <Option value="5">Completed</Option>
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
                  >
                    <DatePicker format="YYYY-MM-DD"></DatePicker>
                  </Form.Item>
                </Col>
                <Col span="8">
                  <Form.Item label="Description" name="leadAuditDescription">
                    <Input.TextArea placeholder="Description"></Input.TextArea>
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
              {/* <Row>
                <Col span="22">
                  <Divider orientation="left">Add Intrested Item -></Divider>
                </Col>
                <Col span="2">
                  <Tooltip title="add instresed item">
                    <Button
                      style={{
                        marginInlineEnd: 5,
                        marginTop: '0.5rem',
                        marginLeft: '0.5rem'
                      }}
                      type="primary"
                      shape="circle"
                      icon={<PlusOutlined />}
                      onClick={() => setVisibleIntrestedForm(true)}
                    />
                  </Tooltip>
                </Col>
              </Row>
              <Row>
                <Col span="22">
                  <Divider orientation="left">Add Note -></Divider>
                </Col>
                <Col span="2">
                  <Tooltip title="Add note">
                    <Button
                      style={{
                        marginInlineEnd: 5,
                        marginTop: '0.5rem',
                        marginLeft: '0.5rem'
                      }}
                      type="primary"
                      shape="circle"
                      icon={<PlusOutlined />}
                      onClick={() => setVisibleNoteForm(true)}
                    />
                  </Tooltip>
                </Col>
              </Row>
                    */}
              {/* <Row gutter={[8, 8]} style={{ float: 'right' }}>
                <Col span="24">
                  <Tooltip title="search">
                    <Button
                      style={{ marginInlineEnd: 5 }}
                      type="primary"
                      shape="circle"
                      icon={<SearchOutlined />}
                    />
                  </Tooltip>

                  <Tooltip title="Add Note">
                    <Button
                      style={{ marginInlineEnd: 5 }}
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => setIntrestedVisible(true)}
                    >
                      Add Intrested Item
                    </Button>
                  </Tooltip>
                </Col>
              </Row> */}
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
