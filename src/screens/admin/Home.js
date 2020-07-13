/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react'
import { Row, Col, Layout, Modal, Table } from 'antd'
import HeaderBar from 'components/HeaderBar'

import {
  // HomeOutlined,
  // ConsoleSqlOutlined,
  // FileTextOutlined,
  // UnorderedListOutlined,
  // MessageOutlined,
  PlusSquareFilled,
  FunnelPlotOutlined
} from '@ant-design/icons'
import { AddPlot } from 'components/AddPlot'
import { AddAgent } from 'components/AddAgent'
import { Bar } from 'react-chartjs-2'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useHistory } from 'react-router-dom'

// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
// const { SubMenu } = Menu;
const { Content } = Layout

const UserHome = () => {
  const history = useHistory()
  const getAllAgents = useStoreActions((actions) => actions.agents.getAllAgents)
  const agentList = useStoreState((state) => state.agents.list)
  const [visibleAddAgent, setVisibleAddAgent] = useState(false)
  const [visibleAddNewPlot, setVisibleAddNewPlot] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getAllAgents(() => {
      console.log('DATA RECEIVED::')
      setLoading(false)
    })
  }, [])
  const toggleAddNewPlot = () => {
    setVisibleAddNewPlot(!visibleAddNewPlot)
  }

  const toggleAddAgent = () => {
    console.log('Cancel agent model')
    setVisibleAddAgent(!visibleAddAgent)
  }

  const state = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        backgroundColor: '#7e31ed',
        // borderColor: 'rgba(0,0,0,1)',
        label: 'performance',
        barThickness: 20,
        borderWidth: 2,
        data: [65, 59, 80, 81, 56, 100, 90]
      }
    ]
  }

  const columns = [
    {
      title: 'Agents',
      key: 'name',
      render: (agent) => (
        <span>{agent.userFname}</span>
        // <div>
        //   <span className="table-name">
        //     <span className="table-inner-name">{record.name}</span>
        //     <br />
        //     {/* <span className="table-designation">{record.designation}</span> */}
        //   </span>
        // </div>
      )
    },
    {
      key: 'secondname',
      render: (agent) => (agent.userSname ? agent.userSname : '')
    },
    {
      key: 'mobile',
      render: (agent) => agent.userMobile
    },

    {
      key: 'email',
      render: (agent) => (
        <span className="table-email">{agent.userEmailid}</span>
      )
    },
    {
      title: (
        <PlusSquareFilled
          className="table-icon"
          style={{
            fontSize: '20px'
          }}
          onClick={toggleAddAgent}
        />
      ),
      key: 'city',
      render: (agent) => agent.userCity
    },
    {
      title: (
        <FunnelPlotOutlined
          style={{
            fontSize: '20px'
          }}
        />
      ),
      key: 'role',
      render: (agent) => agent.userOccupation
    }
  ]
  // const addNewPlot = () => {
  //   setNewPlot(!newPlot)
  // }
  return (
    <Layout>
      <HeaderBar>
        <Layout>
          {/* <Sider width={80} className="site-layout-background">
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
              >
                <Menu.Item key="1" className="sidemenu">
                  <ConsoleSqlOutlined className="menuitem"/>
                </Menu.Item>
                <Menu.Item key="2" className="sidemenu">
                  <FileTextOutlined className="menuitem"/>
                </Menu.Item>
                <Menu.Item key="3" className="sidemenu">
                  <UnorderedListOutlined className="menuitem"/>
                </Menu.Item>

              </Menu>
            </Sider> */}
          <Layout>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
            <Content
              className="site-layout-background"
              style={{
                margin: 0,
                minHeight: '100vh'
              }}
            >
              <div className="rectangle">
                <div
                  style={{
                    padding: '1rem'
                  }}
                >
                  <div className="body-header">Welcome back Admin</div>
                  <div className="body-content" style={{ fontSize: '14px' }}>
                    You’ve earned 80% in this week ! Keep it up and improve your
                    goals Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </div>
                </div>
              </div>
              <Modal
                visible={visibleAddNewPlot}
                title="Add new plot"
                onCancel={() => toggleAddNewPlot()}
                footer={null}
                width="40%"
                centered
              >
                <AddPlot />
              </Modal>
              <Modal
                visible={visibleAddAgent}
                title="Add new agent"
                onCancel={() => toggleAddAgent()}
                footer={null}
                width="40%"
                centered
              >
                <AddAgent doClose={() => toggleAddAgent()} />
              </Modal>
              <Row justify="left">
                <Col span="8">
                  <div
                    className="box-content"
                    style={{
                      backgroundColor: '#7571c7'
                    }}
                  >
                    <Row justify="left">
                      <Col span="6">
                        <div className="letter-box">
                          <span className="letter">N</span>
                        </div>
                      </Col>
                      <Col span="6">
                        <span className="count">198</span>
                        <span className="count-desc"> New plots added</span>
                      </Col>
                    </Row>
                    <div className="oval"></div>
                    <div className="small-oval"></div>
                    <button
                      className="box-button"
                      onClick={() => history.push('/admin/add-plot-area')}
                    >
                      {' '}
                      + Add Plot
                    </button>
                  </div>
                </Col>
                <Col span="8">
                  <div
                    className="box-content"
                    style={{
                      backgroundColor: '#5dca88'
                    }}
                  >
                    <Row>
                      <Col span="6">
                        <div className="letter-box">
                          <span className="letter">A</span>
                        </div>
                      </Col>
                      <Col span="6">
                        <span className="count">256</span>
                        <span className="count-desc">Available Plots</span>
                      </Col>
                    </Row>
                    <div className="oval"></div>
                    <div className="small-oval"></div>
                  </div>
                </Col>
                <Col span="8">
                  <div
                    className="box-content"
                    style={{
                      backgroundColor: '#ff707c'
                    }}
                  >
                    <Row>
                      <Col span="6">
                        <div className="letter-box">
                          <span className="letter">B</span>
                        </div>
                      </Col>
                      <Col span="6">
                        <span className="count">198</span>
                        <span className="count-desc">Booked Plots</span>
                      </Col>
                    </Row>
                    <div className="oval"></div>
                    <div className="small-oval"></div>
                  </div>
                </Col>
              </Row>
              <div className="row-gap"></div>
              <Row>
                <Col span="12">
                  <div className="admin-page-column-left">
                    <Table
                      loading={loading}
                      dataSource={agentList}
                      columns={columns}
                    />
                  </div>
                </Col>
                <Col span="12">
                  <div className="admin-page-column-right">
                    <Bar
                      data={state}
                      options={{
                        title: {
                          display: true,
                          text: 'Overall Performance',
                          fontSize: 20
                        },
                        legend: {
                          display: true,
                          position: 'right'
                        }
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
        {/* <ChatBox /> */}
      </HeaderBar>
    </Layout>
  )
}

export default UserHome
