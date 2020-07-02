/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import { Layout, Table } from 'antd'
import { SmileTwoTone } from '@ant-design/icons'
// import { Smile } from '../asssets/smile'
// import { Sad } from '../asssets/sad.svg'
// import { Normal } from '../asssets/normal.svg'

import '../styles/lead-table.css'
import '../styles/common.css'
import { useHistory } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'
import constants from '../constants'

const LeadTable = (props) => {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const getTodayLeads = useStoreActions(
    (actions) => actions.leads.getTodayLeads
  )

  const todayLeads = useStoreState((store) => store.leads.today_leads)
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
    {
      title: 'Next Schedule',
      width: 150,
      // eslint-disable-next-line react/display-name
      render: (user) => (
        <span>
          {new Date(user.nextScheduleDatetime).toISOString().split('T')[0]}
        </span>
      )
    },
    {
      title: 'Source',
      width: 150,
      render: (user) => (user.leadSource ? user.leadSource : '-')
    },
    {
      title: 'Score Summary',
      // eslint-disable-next-line react/display-name
      render: (user) => (
        <div className="icons-list">
          {user.leadOutcome.slice(0, 3).map((score, i) => {
            let color
            if (score.outCome == 'Positive') {
              color = '#5ccb88'
            } else if (score.outCome == 'Negative') {
              color = '#f51044'
            } else {
              color = '#faad14'
            }
            return (
              <span key={i} style={{ paddingRight: '1rem' }}>
                <SmileTwoTone twoToneColor={color} />
              </span>
            )
          })}
        </div>
      )
    },
    {
      title: 'Action',
      dataIndex: '',
      // eslint-disable-next-line react/display-name
      render: (agent) => (
        <span>
          <a
            onClick={() => {
              history.push({ pathname: 'agent/overall', leadDetail: agent })
            }}
          >
            Add Audit
          </a>
        </span>
      )
    }
  ]
  const tableColumns = columns.map((item, index) => ({
    ...item,
    ellipsis: true,
    className: 't-head'
  }))
  const data = {
    url:
      constants.URL.GET_TODAY_LEADS + '&mobile=' + props.currentUser.userMobile,
    callback: () => {
      setLoading(false)
    }
  }
  useEffect(() => {
    setLoading(true)
    getTodayLeads(data)
  }, [])

  return (
    <Layout.Content>
      <Table
        columns={tableColumns}
        size="middle"
        loading={loading}
        dataSource={todayLeads}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 500 }}
      />
    </Layout.Content>
  )
}

LeadTable.propTypes = {}

export { LeadTable }
