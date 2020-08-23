/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react'
import { Row, Col,Button, Layout, Modal, Table, Input } from 'antd'
import HeaderBar from 'components/HeaderBar'
import ChatBox from 'components/chatbox'

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
import { OverViewCard } from '../../components/OverViewCard'
import constants from '../../constants'
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
// const { SubMenu } = Menu;
const { Content } = Layout

const UserHome = () => {
  const history = useHistory()
  const currentUser = useStoreState((state) => state.auth.user)
  const getAllAgents = useStoreActions((actions) => actions.agents.getAllAgents)
  const agentList = useStoreState((state) => state.agents.list)
  const [visibleAddAgent, setVisibleAddAgent] = useState(false)
  const [visibleAddNewPlot, setVisibleAddNewPlot] = useState(false)
  const [loading, setLoading] = useState(false)
  const getLeadStatusCount = useStoreActions(
    (actions) => actions.leads.getLeadStatusCount
  )
  const leadStatusCount = useStoreState((state) => state.leads.statusCount)
  useEffect(() => {
    setLoading(true)
    getAllAgents(() => {
      setLoading(false)
    })
    getLeadStatusCount(
      constants.URL.GET_LEAD_STATUS_COUNT
    )
  }, [])
  const toggleAddNewPlot = () => {
    setVisibleAddNewPlot(!visibleAddNewPlot)
  }

  const toggleAddAgent = () => {
    console.log('Cancel agent model')
    setVisibleAddAgent(!visibleAddAgent)
  }

  const state = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug'],
    datasets: [
      {
        type:'bar',
        backgroundColor: '#7e31ed',
        // borderColor: 'rgba(0,0,0,1)',
        label: 'Achieved',
        data: [18, 14, 17, 19, 21, 14, 12, 15],
        barThickness: 20,
        borderWidth: 2
      },
      {
        type:'line',
        borderColor: '#EC932F',
        backgroundColor: '#EC932F',
        pointBorderColor: '#EC932F',
        pointBackgroundColor: '#EC932F',
        pointHoverBackgroundColor: '#EC932F',
        pointHoverBorderColor: '#EC932F',
        fill: false,
        // borderColor: 'rgba(0,0,0,1)',
        label: 'Monthly Target',
        barThickness: 20,
        borderWidth: 2,
        data: [20, 20, 20, 20, 20, 20, 20, 20]
      }
    ]
  }

  const state1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Sales',
        type:'line',
        data: [18, 14, 17, 19, 24, 14, 10],
        fill: false,
        borderColor: '#EC932F',
        backgroundColor: '#EC932F',
        pointBorderColor: '#EC932F',
        pointBackgroundColor: '#EC932F',
        pointHoverBackgroundColor: '#EC932F',
        pointHoverBorderColor: '#EC932F',
        yAxisID: 'y-axis-2'
      },{
        type: 'bar',
        label: 'Monthly Target',
        data: [20, 20, 20, 20, 20, 20, 20],
        fill: false,
        backgroundColor: '#71B37C',
        borderColor: '#71B37C',
        hoverBackgroundColor: '#71B37C',
        hoverBorderColor: '#71B37C',
        yAxisID: 'y-axis-1'
      }]
  }

  const columns = [
    {
      title: 'First Name',
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
      title: 'Second Name',
      key: 'secondname',
      render: (agent) => (agent.userSname ? agent.userSname : '')
    },
    {
      title: 'Mobile',
      key: 'mobile',
      render: (agent) => agent.userMobile
    },

    {
      title: 'Email',
      key: 'email',
      render: (agent) => (
        <span className="table-email">{agent.userEmailid}</span>
      )
    },
    {
      title: 'Monthly Target',
      key: 'monthlytarget',
      render: (agent) => (
        <span className="table-email">10</span>
      )
    },
    // {
    //   title: (
    //     <PlusSquareFilled
    //       className="table-icon"
    //       style={{
    //         fontSize: '20px'
    //       }}
    //       onClick={toggleAddAgent}
    //     />
    //   ),
    //   key: 'city',
    //   render: (agent) => agent.userCity
    // },
    // {
    //   title: (
    //     <FunnelPlotOutlined
    //       style={{
    //         fontSize: '20px'
    //       }}
    //     />
    //   ),
    //   key: 'role',
    //   render: (agent) => agent.userOccupation
    // }
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
                  <div className="body-header">Welcome back  {currentUser.userFname} </div>
                  {/* <div className="body-content" style={{ fontSize: '14px' }}>
                    You’ve earned 80% in this week ! Keep it up and improve your
                    goals.
                  </div> */}
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
                title="Add new Employee"
                onCancel={() => toggleAddAgent()}
                footer={null}
                width="40%"
                centered
              >
                <AddAgent doClose={() => toggleAddAgent()} />
              </Modal>
              <Row style={{
                      justifyContent: "space-evenly"
                    }} gutter={[12, 12]}>
                <Col>
                  <OverViewCard
                    color="#7571c7"
                    title="Universe"
                    count={leadStatusCount.created}
                    showbutton={true}
                  ></OverViewCard>
                </Col>
                <Col>
                  <OverViewCard
                    color="#4cc311"
                    title="Market Platform"
                    count={leadStatusCount.prospecting}
                    showbutton={false}
                  ></OverViewCard>
                </Col>
                <Col>
                  <OverViewCard
                    color="#1890ff"
                    title="Working Platform"
                    count={leadStatusCount.completed}
                    showbutton={false}
                  ></OverViewCard>
                </Col>
                <Col>
                  <OverViewCard
                    color="#ff707c"
                    title="Buying Platform"
                    count={leadStatusCount.closure}
                    showbutton={false}
                  ></OverViewCard>
                </Col>
              </Row>
              {/* <Row justify="left">
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
                        <span className="count-desc"> Market Platform
</span>
                      </Col>
                    </Row>
                    <div className="oval"></div>
                    <div className="small-oval"></div>
                    <button
                      style={{ display:  "none" }} className="box-button"
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
                      <Col span="10">
                        <span className="count">256</span>
                        <span className="count-desc">Working Platform</span>
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
                        <span className="count-desc">Buying Platform</span>
                      </Col>
                    </Row>
                    <div className="oval"></div>
                    <div className="small-oval"></div>
                  </div>
                </Col>
              </Row> */}
              <div className="row-gap"></div>
              <Row justify="end">
                  <Button style={{fontSize: '15px'}} type="link" 
                    onClick={toggleAddAgent} >
                    + Add Employees
                  </Button > 
                  <label style={{fontSize: '18px'}}> | </label> 
                  <Button style={{fontSize: '15px'}} type="link" 
                    onClick={() => 
                        currentUser.userRole == '1'
                        ? history.push('/admin/add-product')
                        : history.push('/agent/add-product')} >
                    + Add Product
                  </Button > 
                  <label style={{fontSize: '18px'}}> | </label> 
                  <Button style={{fontSize: '15px'}} type="link" onClick={() => history.push('/admin/add-company')} >
                    + Add Universe
                  </Button > 
                  <label style={{fontSize: '18px'}}> | </label>
                  <Button style={{fontSize: '15px'}} type="link" onClick={() => history.push('/admin/add-lead')} >
                    + Add Market Platform 
                  </Button >
                  <label style={{fontSize: '18px'}}> | </label>
                  <Button style={{fontSize: '15px'}} type="link" onClick={() => history.push('/admin/add-financial-metrics')} >
                  + Add Financial Metrics
                  </Button >            
              </Row>
              <div style={{padding: '.25%'}}></div>
              <Row>
                <Col span="12">
                  <div className="admin-page-column-left">
                    <Table size='small'
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
                          text: 'Employee Performance',
                          fontSize: 15,
                          position: "top"
                        },
                        legend: {
                          display: true,
                          position: 'bottom'
                        }
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      <ChatBox /> 
      </HeaderBar>
    </Layout>
  )
}

export default UserHome
