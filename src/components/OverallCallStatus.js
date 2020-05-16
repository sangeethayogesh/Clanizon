import React from 'react'
import PropTypes from 'prop-types'
import { Collapse, Row, Col, Button, Input, Form, Select, TimePicker, InputNumber, DatePicker, Tabs, Slider } from 'antd'
import { FrownOutlined, SmileOutlined } from '@ant-design/icons'
import '../styles/overall-call-status.css'
const { Option } = Select
const { Panel } = Collapse
const { TabPane } = Tabs
const OverallCallStatus = props => {
  const [form] = Form.useForm()
  function handleCollapse () {

  }
  function onCallStatusSave (values) {
    var r = form.getFieldsValue()
    console.log(r)
  }
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  function onChangeSec (value) {
    form.setFieldsValue({ callDurationMin: value })
  }
  function onCallTypeChange (value) {
    form.setFieldsValue({ callType: value })
  }
  function formatter (value) {
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
      <Col span={24}>

        <Collapse className="call-status-card"
          defaultActiveKey={['1']}
          onChange={handleCollapse}
          expandIconPosition="right"
          expandIcon={() => {
            return <Button type="default">-</Button>
          }}
        >
          <Panel header="Call Status" key="1">
            <Form
              layout="vertical"
              name="form_in_modal"
              labelCol={{ span: 12 }}
              form={form}
              {...tailLayout}
              onFinish={onCallStatusSave}
              onFinishFailed ={onFinishFailed}
            >
              <Row gutter={[24, 0]}>
                <Col span={8}>
                  <Form.Item
                    name="contactName"
                    label="Contact Name"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                  >
                    <Input placeholder="Name"/>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="callPurpose"
                    label="Call Purpose"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                  >
                    <Input placeholder="Purpose"/>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="callType"
                    label="Call Type"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                  >
                    <Select
                      placeholder="Select Call Type"
                      onChange={onCallTypeChange}
                    >
                      <Option value="inbound">Inbound</Option>
                      <Option value="outbound">Outbound</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[24, 0]}>
                <Col span={8}>
                  <Form.Item
                    name="callDurationMin"
                    label="Call Duration"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                  >
                    <InputNumber placeholder="Mins" suffix="Mins" min={0} onChange={onChangeSec}/><span> Mins</span>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="scheduleDate"
                    label="Schedule Date"

                  >
                    <DatePicker/>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="scheduleTime"
                    label="Schedule Time"
                  >
                    <TimePicker use12Hours format="h:mm a"/>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[24, 0]}>
                <Col span={24}>
                  <Form.Item
                    name="callResult"
                    label="Call Result"
                  >
                    <Input.TextArea placeholder="Add your note here…" rows={3}></Input.TextArea>
                  </Form.Item>
                </Col>
              </Row>
              <Row >
                <h5>Plot Details</h5>
                <Tabs tabPosition="top" style={{ width: '100%', padding: '0.2rem' }}>
                  <TabPane tab="Plot CA301" key="1">
                    <Row>
                      <Col span="24">
                        <Form.Item
                          colon={false}
                          label="Notes"
                          name="notes"
                        >
                          <Input.TextArea rows={3} placeholder="Add your notes here..."/>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="24">
                        <Form.Item
                          colon={false}
                          label="Score"
                          name="score"
                        >
                          <Slider tipFormatter={formatter} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tab="Plot CA302" key="2">
                    <Row>
                      <Col span="24">
                        <Form.Item
                          colon={false}
                          label="Notes"
                          name="notes"
                        >
                          <Input.TextArea rows={3} placeholder="Add your notes here..."/>
                        </Form.Item>
                      </Col>
                    </Row>
                  </TabPane>

                </Tabs>
              </Row>

              <Row className="panel-footer-row">
                <div className="btn-wrapper">
                  <Form.Item>
                    <Button title="Save" htmlType="submit" type="primary" className="b-primary">Save</Button>
                    <Button title="Cancel" htmlType="reset" className="b-secondary">Cancel</Button>
                  </Form.Item>
                </div>
              </Row>
            </Form>

          </Panel>
        </Collapse>

      </Col>
    </Row>
  )
}

OverallCallStatus.propTypes = {}

export { OverallCallStatus }
