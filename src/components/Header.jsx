import React from 'react'
// import PropTypes from 'prop-types';
import { Row, Col, Layout } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
const { Header } = Layout
const HeaderBar = () => {
  // const [state, setState] = useState(InitialState);
  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <Row justify="left">
        <Col span="4">
          <HomeOutlined className="logo" style={{ color: '#fff' }} />
          <span className="header-title">&nbsp;CRM</span>
        </Col>
      </Row>
    </Header>
  )
}

// Header.propTypes = {};

export default HeaderBar
