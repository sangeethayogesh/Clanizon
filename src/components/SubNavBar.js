import React from 'react'
import PropTypes from 'prop-types'
import { PageHeader, Button } from 'antd'
import '../styles/agent-overall.css'
const SubNavBar = props => {
  return (<div>
    <PageHeader
      className="site-page-subheader"
      ghost={true}
      onBack={() => window.history.back()}
      title="Back"
      extra={[
        <Button className="book-btn" key="2">Book</Button>,
        <Button key="1">. . .</Button>
      ]}
    ></PageHeader>
  </div>)
}

SubNavBar.propTypes = {}

export { SubNavBar }
