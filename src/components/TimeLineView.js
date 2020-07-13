import React from 'react'
import { Timeline, Layout } from 'antd'
import Text from 'antd/lib/typography/Text'
import '../styles/timeline.css'

const TimeLineView = (props) => {
  return (
    <Layout.Content style={{ backgroundColor: '#fbfbfb', padding: '1rem' }}>
      <h6 className="t-header-title">Lead Timeline</h6>
      <Timeline mode="left" style={{ paddingTop: '0.5rem' }}>
        <Timeline.Item color="green">
          <Text className="t-title">Lead Open</Text>
          <Text className="t-sub-title">20 February 2020</Text>
          <div className="t-desc-area">
            <Text className="t-line">Cold call</Text>
            <Text className="t-line">
              Intrested to buy. Request for site visit
            </Text>
          </div>
        </Timeline.Item>
        <Timeline.Item color="green">
          <Text className="t-title">Lead Open</Text>
          <Text className="t-sub-title">20 February 2020</Text>
          <div className="t-desc-area">
            <Text className="t-line">Cold call</Text>
            <Text className="t-line">
              Intrested to buy. Request for site visit
            </Text>
          </div>
        </Timeline.Item>
        <Timeline.Item color="gray">
          <Text className="t-title">Lead Open</Text>
          <Text className="t-sub-title">20 February 2020</Text>
          <div className="t-desc-area">
            <Text className="t-line">Cold call</Text>
            <Text className="t-line">
              Next scheduled for call on 25 February 2020
            </Text>
          </div>
        </Timeline.Item>
      </Timeline>
    </Layout.Content>
  )
}

export { TimeLineView }
