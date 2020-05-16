import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Layout, Table } from 'antd'
import { SmileTwoTone } from '@ant-design/icons'
// import { Smile } from '../asssets/smile'
// import { Sad } from '../asssets/sad.svg'
// import { Normal } from '../asssets/normal.svg'

import '../styles/lead-table.css'
import '../styles/common.css'
import rest from 'services/http'
import constants from '../constants'
import { useHistory } from 'react-router-dom'

const LeadTable = props => {
  const [loading, setLoading] = useState(false)
  const [todayData, setTodayData] = useState([])
  const history = useHistory()

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 200,
      // eslint-disable-next-line react/display-name
      render: (name) => (
        <div>
          <img className="table-thumbnail" alt="" src='https://randomuser.me/api/portraits/women/42.jpg'/>
          <span className="table-name">
            <span className="table-inner-name">{name}</span><br />
            <span className="table-designation">Manager</span>
          </span>
        </div>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 200,
      // eslint-disable-next-line react/display-name
      render: text => <a>{text}</a>
    },
    {
      title: 'Contact Number',
      dataIndex: 'contact_number',
      width: 150
    },
    {
      title: 'Next Schedule',
      dataIndex: 'next_schedule',
      width: 150
    },
    {
      title: 'Location',
      dataIndex: 'location',
      width: 150
    },
    {
      title: 'Intrested Plots',
      dataIndex: 'intrested_plots',
      width: 150,
      // eslint-disable-next-line react/display-name
      render: (tags) => (
        <span>
          {
            tags.join()
          }
        </span>
      )
    },
    {
      title: 'Score Summary',
      dataIndex: 'score_summary',
      // eslint-disable-next-line react/display-name
      render: (scores) => (
        <div className="icons-list">
          {
            scores.map((score, i) => {
              let color
              if (score === 'happy') {
                color = '#52c41a'
              } else if (score === 'sad') {
                color = '#eb2f96'
              } else {
                color = '#1890ff'
              }
              return (
                <span key={i} style={{ paddingRight: '1rem' }}><SmileTwoTone twoToneColor={color}/></span>
              )
            })
          }
        </div>
      )
    },
    {
      title: 'Action',
      dataIndex: '',
      // eslint-disable-next-line react/display-name
      render: (agent) => (
        <span>
          <a onClick={() => { history.push('agent/overall?agentId=' + agent.id) }}>Add Call</a>
        </span>
      )
    }
  ]
  const tableColumns = columns.map(item => ({ ...item, ellipsis: true, className: 't-head' }))
  useEffect(() => {
    setLoading(true)
    rest.get(constants.URL.GET_TODAY_LEADS).then((res) => {
      setTodayData(res.data)
      setLoading(false)
    }).catch((err) => {
      console.error(err)
      setLoading(false)
    })
  }, [])
  return (
    <Layout.Content>
      <Table
        columns={tableColumns}
        size="middle"
        loading={loading}
        dataSource={todayData}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 300 }}
      />
    </Layout.Content>
  )
}

LeadTable.propTypes = {}

export { LeadTable }
