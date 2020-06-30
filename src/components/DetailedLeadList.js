/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { useStoreState, useStoreActions } from 'easy-peasy'
import constants from '../constants'
const columns = [
  {
    title: 'Name',
    width: 200,
    // eslint-disable-next-line react/display-name
    render: (user) => (
      <div>
        <span className="table-name">
          <span className="table-inner-name">
            {user.leadCustomer.userFname + ' ' + user.leadCustomer.userSname}
          </span>
        </span>
      </div>
    )
  },
  {
    title: 'Email',
    width: 200,
    // eslint-disable-next-line react/display-name
    render: (user) => user.leadCustomer.userEmailid
  },
  {
    title: 'Contact Number',
    width: 150,
    render: (user) => user.leadCustomer.userMobile
  },
  {
    title: 'Status',
    width: 150,
    render: (user) => (
      <p style={{ color: '#4c46a7', fontWeight: 'bold' }}>
        {constants.getLeadStatusById(user.leadStatus)}
      </p>
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
    title: 'Occupation',
    width: 150,
    render: (user) => user.leadCustomer.userOccupation
  },
  {
    title: 'Address',
    width: 150,
    render: (user) => user.leadCustomer.userAddress
  },
  {
    title: 'City',
    width: 150,
    render: (user) => user.leadCustomer.userCity
  }
  //   {
  //     title: 'Action',
  //     dataIndex: '',
  //     // eslint-disable-next-line react/display-name
  //     render: (agent) => (
  //       <span>
  //         <a>Add Call</a>
  //       </span>
  //     )
  //   }
]
const tableColumns = columns.map((item, idx) => ({
  ...item,
  ellipsis: true,
  key: idx,
  className: 't-head'
}))

const DetailedLeadList = (props) => {
  const [loading, setLoading] = useState(false)
  const getLeadsByAgent = useStoreActions(
    (actions) => actions.leads.getLeadsByAgent
  )
  const leadsByAgent = useStoreState((state) => state.leads.leadsByAgent)

  useEffect(() => {
    // Update the document title using the browser API
    console.log('::LIST LEADS Called::')
    setLoading(true)
    getLeadsByAgent(() => {
      setLoading(false)
    })
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
