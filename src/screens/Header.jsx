import React, { Component } from 'react'
import { Layout } from 'antd'
const { Header } = Layout

class HeaderApp extends Component {
  render () {
    return (
      <Header>
        <div className="logo" />
      </Header>
    )
  }
}
export default HeaderApp
