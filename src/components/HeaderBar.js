import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  Layout,
  Row,
  Col,
  Menu,
  BackTop,
  Badge,
  Drawer,
  Button,
  Mentions,
  Divider
} from 'antd'
import TimeAgo from 'react-timeago'
import {
  HomeOutlined,
  MenuOutlined,
  NotificationOutlined,
  UserOutlined,
  DatabaseOutlined,
  PoweroffOutlined,
  SendOutlined
} from '@ant-design/icons'
import Text from 'antd/lib/typography/Text'
import '../styles/common.css'
import { useStoreState, useStoreActions } from 'easy-peasy'

const { Option } = Mentions
const { Header, Sider, Content } = Layout
function HeaderBar(props) {
  const [users, setUsers] = useState([
    'Deepan',
    'Aswath',
    'Gunalan',
    'Krishnaveni'
  ])
  const [messageValue, setMessageValue] = useState('')
  const [messages, setMessages] = useState([])
  const userName = 'Deepan'
  const currentUser = useStoreState((state) => state.auth.user)
  const setUser = useStoreActions((actions) => actions.auth.setUser)
  const [visible, setVisible] = useState(false)
  const history = useHistory()
  const onClose = () => {
    setVisible(false)
  }
  const logOut = () => {
    setUser(null)
    history.replace('/login')
  }
  const sendMessage = () => {
    setMessageValue('')
    setMessages(messages.concat([{ messageValue, time: +new Date() }]))
  }
  const handleChange = (message) => {
    setMessageValue(message)
  }
  return users.length ? (
    <div style={{ backgroundColor: '#f0f1f4' }}>
      <Layout>
        <Header
          style={{
            position: 'fixed',
            zIndex: 1,
            width: '100%',
            paddingRight: 0
          }}
        >
          <Row justify="left">
            <Col span="19">
              <HomeOutlined className="logo" style={{ color: '#fff' }} />
              <span className="header-title" style={{ padding: '1em' }}>
                &nbsp;CRM
              </span>
            </Col>
            <Col span="1" style={{ textAlign: 'center' }}>
              <div className="divider-left divider-right">
                <MenuOutlined className="header-menu" />
              </div>
            </Col>
            {/* <Col span="1" style={{ textAlign: 'center' }}>
              <div className="divider-right">
                <MessageOutlined className="header-menu" onClick={showDrawer} />
              </div>
            </Col> */}
            <Col span="1" style={{ textAlign: 'center' }}>
              <div className="divider-right">
                <Badge dot>
                  <NotificationOutlined className="header-menu" />
                </Badge>
              </div>
            </Col>
            <Col span="2" style={{ textAlign: 'center' }}>
              <div className="divider-right">
                <UserOutlined className="header-menu" />
                &nbsp;
                <Text>{currentUser.userFname}</Text>
              </div>
            </Col>
            <Col span="1" style={{ textAlign: 'center' }}>
              <Button
                type="link"
                icon={<PoweroffOutlined className="header-menu" />}
                onClick={logOut}
              ></Button>
            </Col>
          </Row>
        </Header>
        <Drawer
          placement="right"
          width="310px"
          closable={false}
          onClose={onClose}
          visible={visible}
          footer={
            <div>
              <Row>
                <Col span="17">
                  <Mentions
                    name="messageBox"
                    onChange={handleChange}
                    value={messageValue}
                    style={{
                      width: '100%',
                      height: '40px',
                      borderRadius: '4px',
                      border: 'solid 1px #eae9e9'
                    }}
                  >
                    {users.map((user, idx) => {
                      return (
                        <Option value={user} key={String(idx)}>
                          {user}
                        </Option>
                      )
                    })}
                  </Mentions>
                </Col>
                <Col span="3"></Col>
                <Col span="2">
                  <Button
                    onClick={sendMessage}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '4px',
                      backgroundColor: '#feae2e'
                    }}
                  >
                    <SendOutlined
                      style={{
                        transform: 'rotate(-30deg)',
                        color: 'white',
                        fontSize: '25px',
                        position: 'absolute',
                        right: '1px',
                        bottom: '-6px'
                      }}
                    />
                  </Button>
                </Col>
              </Row>
              <div className="message-tile-meta">Use @ for select agent</div>
            </div>
          }
        >
          <div
            style={{
              position: 'relative',
              height: 'auto',
              width: '100%',
              bottom: '0px'
            }}
          >
            {messages.map((message, idx) => {
              return (
                <div className="message-tile" key={idx}>
                  {message.messageValue}
                  <Divider
                    style={{
                      backgroundColor: '#ccc9c9',
                      top: '20px'
                    }}
                  />
                  <Row>
                    <Col span="15" className="message-tile-meta">
                      {userName}
                    </Col>
                    <Col span="auto"></Col>
                    <Col span="8" className="message-tile-meta">
                      <TimeAgo date={message.time} minPeriod={10} live={true} />
                    </Col>
                  </Row>
                </div>
              )
            })}
          </div>
        </Drawer>
        <Layout>
          <Sider
            width={props.drawer === false ? 'none' : true}
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              top: '4rem',
              display: props.drawer === false ? 'none' : true
            }}
            className="site-layout-background"
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="1" className="sidemenu">
                <Link to={currentUser.userRole == '1' ? '/admin' : '/agent'}>
                  <HomeOutlined className="menuitem" />
                </Link>
              </Menu.Item>
              <Menu.Item key="2" className="sidemenu">
                <Link
                  to={
                    currentUser.userRole == '1'
                      ? '/admin/overall-product-report'
                      : '/agent/leads'
                  }
                >
                  <DatabaseOutlined className="menuitem" />
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          {/* if drawer is not needed then making the body as a full width content in order to modify it */}
          {props.drawer === false ? (
            <Layout>
              <Content className="site-layout-background">
                <BackTop />
                {props.children}
              </Content>
            </Layout>
          ) : (
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
          )}
        </Layout>
      </Layout>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default HeaderBar
