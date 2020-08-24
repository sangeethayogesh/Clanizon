import React from 'react'
import { Card, Descriptions, Typography } from 'antd'
import '../styles/lead-personal-card.css'
const { Text } = Typography
const LeadPersonalCard = (props) => {
  const { lead, source } = props

  return (
    <Card className="lead-card">
      <Descriptions
        colon={false}
        size="middle"
        layout="vertical"
        column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
      >
        <Descriptions.Item label="Lead Name">
          <Text>{lead.companyName}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Email">{lead.emailId}</Descriptions.Item>
        <Descriptions.Item label="Contact Number">
          {lead.companyContact}
        </Descriptions.Item>
        <Descriptions.Item label="Alternative Contact number">
          {lead.userMobileAlt}
        </Descriptions.Item>
        
        <Descriptions.Item label="Lead source">{source}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}

LeadPersonalCard.propTypes = {}

export { LeadPersonalCard }
