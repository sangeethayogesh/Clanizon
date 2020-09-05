/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react'
import { Select,Row, Radio, Col,Button, Layout, Modal, Table, Input } from 'antd'
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
  const { Option } = Select
  const currentUser = useStoreState((state) => state.auth.user)
  const getAllAgents = useStoreActions((actions) => actions.agents.getAllAgents)
  const [selectionType, setSelectionType] = useState('radio');

  //Chart data
  const getOverAllPerformance = useStoreActions((actions) => actions.perfData.getOverAllPerformance)
  const perfList = useStoreState((state) => state.perfData.perflist)
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getRadioProps: record => ({
    
      name: record.userMobile,
    }),
  };
  const getAllAgentByAdmin = useStoreActions((actions) => actions.agents.getAllAgentByAdmin)
  const agentListAdmin = useStoreState((state) => state.agents.agentlistAdmin)
  const [visibleAddAgent, setVisibleAddAgent] = useState(false)
  const [visibleAddNewPlot, setVisibleAddNewPlot] = useState(false)
  const [isLoading, setIsLoading] = useState(false)



  const getPerformanceByAgent = useStoreActions((actions) => actions.perfData.getPerformanceByAgent)
  const perfListAgent = useStoreState((state) => state.perfData.agentperflist)
  const [adminChart, setAdminChart] = useState(true)
  const [loading, setLoading] = useState(false)
  const getLeadStatusCount = useStoreActions(
    (actions) => actions.leads.getLeadStatusCount
  )
  const leadStatusCount = useStoreState((state) => state.leads.statusCount)
  useEffect(() => {
    getAllAgentByAdmin(currentUser.createdBy)
   
    getLeadStatusCount(
      constants.URL.GET_LEAD_STATUS_COUNT + '?mobile=' + currentUser.userMobile
    )

    getOverAllPerformance(
      '?adminMobile='+currentUser.createdBy
    )
  }, [])
  const toggleAddNewPlot = () => {
    setVisibleAddNewPlot(!visibleAddNewPlot)
  }

   
  const handleAgentChange = (value) =>{
    setIsLoading(true)
    console.log(value);
    if(value=="All"){
       setAdminChart(true);
    }else{
      setAdminChart(false);
    const data = {
      params:
        '?agentMobile=' + value,
      callback: () => {
        setLoading(false)
      }
    }
    
    getPerformanceByAgent(data)
  }
  }

  const toggleAddAgent = () => {
    console.log('Cancel agent model')
    setVisibleAddAgent(!visibleAddAgent)
  }

  const state = {
    labels:  (!adminChart && perfListAgent)?perfListAgent.Label:perfList?perfList.Label:[],
    datasets: [
      {
        
        backgroundColor: '#7571c7',
        label: 'Universe',
        data: (!adminChart && perfListAgent)?perfListAgent.UPL:perfList?perfList.UPL:[],
        barThickness: 20,
        borderWidth: 2
      },
      {
        
        backgroundColor: '#4cc311',
        // borderColor: 'rgba(0,0,0,1)',
        label: 'Marketing Platform',
        data: (!adminChart && perfListAgent)?perfListAgent.MPL:perfList?perfList.MPL:[],
        barThickness: 20,
        borderWidth: 2
      },
      {
        
        backgroundColor: '#1890ff',
        label: 'Working Platform',
        data: (!adminChart && perfListAgent)?perfListAgent.WPL:perfList?perfList.WPL:[],
        barThickness: 20,
        borderWidth: 2
      },
      {
       
        backgroundColor: '#ff707c',
        label: 'Buying Platform',
        data: (!adminChart && perfListAgent)?perfListAgent.BPL:perfList?perfList.BPL:[],
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
        data: (!adminChart && perfListAgent)?perfListAgent.TL:[0,0,0,0]
      }
    ]
  }

 

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'userFname'
      
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
        <span className="table-email">{agent.targetLead}</span>
      )
    },
  
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
              {/* <div className="row-gap"></div> */}
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
              <div style={{padding: '1%'}}></div>
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
              {}
              <div style={{padding: '1%'}}></div>
              <Row>
                <Col span="12">
                  <h5
                    style={{
                      fontFamily: 'Lato',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#150e4f'
                    }}
                  >
                    Employees
                  </h5>
                  
                  <div className="admin-page-column-left">
                    <Table size='small'
                      loading={loading}
                     
                      dataSource={agentListAdmin}
                      columns={columns}
                    />
                  </div>
                </Col>
                <Col span="12">
                  <h5
                      style={{
                        fontFamily: 'Lato',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#150e4f'
                      }}
                    >
                      Employee Performance
                      </h5>
                      <Select
                              mode="single"
                              placeholder="Select a Agent"
                              onChange={handleAgentChange}
                            >   

                          <Option key="All">
                                     All-Agent
                                    </Option>
                            {agentListAdmin &&
                                agentListAdmin.map((agent) => {
                                  return (
                                    
                                    <Option key={agent.userMobile}>
                                      {agent.userFname}
                                    </Option>
                                  )
                                })}
                   </Select>   
                
                  <div className="admin-page-column-right">
                    <Bar
                      data={state}
                      options={{
                        scales:{
                         yAxes:[{stacked:true,
                          gridLines:{
                            drawBorder:false,
                          }
                        }],
                        xAxes:[{stacked:true,
                          gridLines:{
                            display:false,
                          },
                          barThickness:40
                        }]
                        },
                        title: {
                          display: false,
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
