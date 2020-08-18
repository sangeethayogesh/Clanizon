/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { useStoreState, useStoreActions } from 'easy-peasy'
import constants from '../constants'
import { useHistory } from 'react-router-dom'


const DetailedLeadList = (props) => {
  const history = useHistory()
  const columns = [
    {
      title: 'Name',
      width: 200,
      // eslint-disable-next-line react/display-name
      render: (user) => (
        <span style={{ color: '#000000a6', fontWeight: 'bold' }}>
          {user.leadCustomer.userFname}{' '}
          {user.leadCustomer.userSname ? user.leadCustomer.userSname : ''}
        </span>
      )
    },
    {
      title: 'Contact Number',
      width: 150,
      render: (user) => user.leadCustomer.userMobile
    },
    {
      title: 'Email',
      width: 200,
      // eslint-disable-next-line react/display-name
      render: (user) =>
        user.leadCustomer.userEmailid ? user.leadCustomer.userEmailid : '-'
    },
  
    {
      title: 'Status',
      width: 150,
      render: (user) => (
        <span style={{ color: '#4c46a7', fontWeight: 'bold' }}>
          {constants.getLeadStatusById(user.leadStatus)}
        </span>
      )
    },
    //   {
    //     title: 'Status',
    //     width: 150,
    //     render: (user) => {
    //        status
    //       if (user.leadCustomer.leadStatus == 1) status = 'Created'
    //       else if (user.leadCustomer.leadStatus == 2) status = 'Prospecting'
    //       else if (user.leadCustomer.leadStatus == 3) status = 'Closure'
    //       else if (user.leadCustomer.leadStatus == 4) status = 'Converted'
    //       else if (user.leadCustomer.leadStatus == 5) status = 'Completed'
  
    //       return <Tag color="#87d068">{status}</Tag>
    //     }
    //   },
    {
      title: 'Source',
      dataIndex: 'leadSource',
      width: 150
    },
    
    {
      title: 'Address',
      width: 150,
      render: (user) =>
        user.leadCustomer.userAddress ? user.leadCustomer.userAddress : '-'
    },
    {
      title: 'City',
      width: 150,
      render: (user) =>
        user.leadCustomer.userCity ? user.leadCustomer.userCity : '-'
    },
    {
      title: 'Action',
      dataIndex: '',
      // eslint-disable-next-line react/display-name
      render: (user) => (
        <span>
          <a
            onClick={() => {
              history.push('agent/overall-product-report')
            }}
          >
            view leads
          </a>
        </span>
      )
    }
    
  ]
  const tableColumns = columns.map((item, idx) => ({
    ...item,
    ellipsis: true,
    key: idx,
    className: 't-head'
  }))
  const [loading, setLoading] = useState(false)
  const getLeadsByAgent = useStoreActions(
    (actions) => actions.leads.getLeadsByAgent
  )
  const leadsByAgent = useStoreState((state) => state.leads.leadsByAgent)
  const currentUser = useStoreState((state) => state.auth.user)
  const data = {
    url: constants.URL.GET_LEAD_BY_AGENT + '?mobile=' + currentUser.userMobile,
    callback: () => {
      setLoading(false)
    }
  }
  useEffect(() => {
    // Update the document title using the browser API
    console.log('::LIST LEADS Called::')
    setLoading(true)
    getLeadsByAgent(data)
  }, [])
  return (
    <div>
      <Table
        columns={tableColumns}
        size="middle"
        loading={loading}
        dataSource={leadsByAgent}
        pagination={{ pageSize: 8 }}
      ></Table>
    </div>
  )
}


DetailedLeadList.propTypes = {}

export { DetailedLeadList }
