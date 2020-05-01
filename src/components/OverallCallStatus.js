import React from 'react'
import PropTypes from 'prop-types'
import { Collapse, Row, Col, Button, Input, Form, Select, TimePicker, InputNumber, DatePicker } from 'antd'
import '../styles/overall-call-status.css'
const { Option } = Select
const { Panel } = Collapse
const { RangePicker } = TimePicker
const OverallCallStatus = props => {
  const [form] = Form.useForm()
  function handleCollapse () {

  }
  function onCallTypeChange (value) {
    form.setFieldsValue({ callType: value })
  };
  const layout = {
    labelCol: {
      span: 12
    },
    wrapperCol: {
      span: 12
    }
  }
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
      <Col span={16}>

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
              initialValues={{ modifier: 'public' }}
              form={form}
              {...tailLayout}
            >
              <Row gutter={[24, 0]}>
                <Col span={8}>
                  <Form.Item
                    name="contactName"
                    label="Contact Name"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                  >
                    <Input/>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="callPurpose"
                    label="Call Purpose"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                  >
                    <Input/>
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
                    rules={[{ required: true, message: 'Please input the title of collection!' }, { type: 'number', message: 'Please enter valid number' }]}
                  >

                    <InputNumber suffix="Mins" min={0} /><span> Mins</span>

                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="scheduleDate"
                    label="schedule Date"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                  >
                    <DatePicker/>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="scheduleTime"
                    label="schedule Time"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                  >
                    <TimePicker use12Hours format="h:mm a"/>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[24, 0]}>
                <Col span={24}>
                  <Form.Item
                    name="scheduleTime"
                    label="schedule Time"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                  >
                    <Input.TextArea rows={3}></Input.TextArea>
                  </Form.Item>
                </Col>
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
