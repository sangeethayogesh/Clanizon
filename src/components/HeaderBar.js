import React from 'react'
import { Layout, Row, Col, Menu, BackTop, Badge, Divider } from 'antd'
import {
  HomeOutlined,
  ConsoleSqlOutlined,
  FileTextOutlined,
  UnorderedListOutlined,
  MenuOutlined,
  NotificationOutlined,
  UserOutlined

} from '@ant-design/icons'
import Text from 'antd/lib/typography/Text'
import '../styles/common.css'
const { Header, Sider, Content } = Layout
function HeaderBar (props) {
  return (
    <div style={{ backgroundColor: '#f0f1f4' }}>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Row justify="left">
            <Col span="20">
              <HomeOutlined className="logo" style={{ color: '#fff' }} />
              <span className="header-title" style={{ padding: '1em' }}>&nbsp;Booking</span>
            </Col>
            <Col span="auto"><Divider type="vertical" style={{
              margin: '0px 10px',
              height: '5em'
            }}/><MenuOutlined /><Divider type="vertical" style={{
              margin: '0px 10px',
              height: '5em'
            }} />
            </Col>

            <Col span="auto" >
              <div>
                <Badge dot >
                  <NotificationOutlined />
                </Badge>
                <Divider type="vertical" style={{
                  margin: '0px 10px',
                  height: '5em'
                }} />
              </div>

            </Col>
            <Col span="auto">
              <UserOutlined />
              <Text>Admin</Text>
              <Divider type="vertical" style={{
                margin: '0px 10px',
                height: '5em'
              }} />
            </Col>
          </Row>
        </Header>
        <Layout>
          <Sider width={80} style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: '4rem'
          }} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="1" className="sidemenu">
                <ConsoleSqlOutlined className="menuitem" />
              </Menu.Item>
              <Menu.Item key="2" className="sidemenu">
                <FileTextOutlined className="menuitem" />
              </Menu.Item>
              <Menu.Item key="3" className="sidemenu">
                <UnorderedListOutlined className="menuitem" />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '1rem 1rem 1rem' }}>
            <Content
              className="site-layout-background"
              style={{
                marginTop: 64,
                minHeight: '100vh',
                marginLeft: '5rem'
              }}
            >
              <BackTop />
              {props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}

export default HeaderBar
