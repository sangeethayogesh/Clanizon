import React from 'react'
import { Descriptions } from 'antd'

const UserInfoView = (props) => {
  const { lead } = props
  return (
    <>
      {lead && (
        <Descriptions
          size="middle"
          layout="vertical"
          column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="Lead Name">
            {lead.contactName}
          </Descriptions.Item>
          <Descriptions.Item label="Company">
            {lead.companyName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {lead.emailId}
          </Descriptions.Item>
          <Descriptions.Item label="Industry Type">~</Descriptions.Item>
          <Descriptions.Item label="Contact Number">
            {lead.companyContact}
          </Descriptions.Item>
          <Descriptions.Item label="Leaf source">
            {lead.leadSource}
          </Descriptions.Item>
         
          <Descriptions.Item label="Lead contact">
            {lead.leadAgentMobile}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {'-'}
          </Descriptions.Item>
          <Descriptions.Item label="Intrested  area">~</Descriptions.Item>
          <Descriptions.Item label="Next schedule date">
            {new Date(lead.nextScheduleDatetime).toISOString().split('T')[0]}
          </Descriptions.Item>
          
        </Descriptions>
      )}
    </>
  )
}

export { UserInfoView }
