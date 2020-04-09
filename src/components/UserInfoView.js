import React from 'react'
import PropTypes from 'prop-types'
import { Descriptions, Avatar } from 'antd'

const UserInfoView = props => {
  return (
    <>

      <Descriptions
        size="middle"
        layout="vertical"
        column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
      >
        <Descriptions.Item label="Lead Name">Irene sachhi</Descriptions.Item>
        <Descriptions.Item label="Company">M&N Chocolate Museum BEAN TO BAR CHOCOLATE MAKER</Descriptions.Item>
        <Descriptions.Item label="Email">Aede@gmail.com</Descriptions.Item>
        <Descriptions.Item label="Industry Type">CHOCOLATE MAKER</Descriptions.Item>
        <Descriptions.Item label="Contact Number">1234568790 </Descriptions.Item>
        <Descriptions.Item label="Leaf source">Advertisement</Descriptions.Item>
        <Descriptions.Item label="Alternative Contact number">0987654321</Descriptions.Item>
        <Descriptions.Item label="Lead contact">Admin 1 </Descriptions.Item>
        <Descriptions.Item label="Address">
        12,Panimalar,
        Old mahabalipuram road,
        Chennai  600015
        </Descriptions.Item>
        <Descriptions.Item label="Intrested  area">PA104</Descriptions.Item>
        <Descriptions.Item label="Next schedule date">26-2-2020</Descriptions.Item>
        <Descriptions.Item label="Best time to call">11.30 am - 5.30 pm</Descriptions.Item>
      </Descriptions>
    </>
  )
}

UserInfoView.propTypes = {}

export { UserInfoView }
