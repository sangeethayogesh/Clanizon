import React from 'react'
import PropTypes from 'prop-types'
import { Card, Descriptions, Typography } from 'antd'
import '../styles/lead-personal-card.css'
const { Text } = Typography
const LeadPersonalCard = props => {
  function handleOnchange (str) {
    console.log(str)
  }
  return (
    <Card className="lead-card">
      <Descriptions
        colon={false}
        size="middle"
        layout="vertical"
        column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
      >
        <Descriptions.Item label="Lead Name"><Text editable={{ onChange: handleOnchange }}>Irene sachhi</Text></Descriptions.Item>
        <Descriptions.Item label="Email">Aede@gmail.com</Descriptions.Item>
        <Descriptions.Item label="Contact Number">1234568790 </Descriptions.Item>
        <Descriptions.Item label="Alternative Contact number">0987654321</Descriptions.Item>
        <Descriptions.Item label="Address">
        12,Panimalar,
        Old mahabalipuram road,
        Chennai  600015
        </Descriptions.Item>
        <Descriptions.Item label="Lead source">Advertisement</Descriptions.Item>
        <Descriptions.Item label="Lead contact">Admin 1 </Descriptions.Item>
      </Descriptions>
    </Card>
  )
}

LeadPersonalCard.propTypes = {}

export { LeadPersonalCard }
