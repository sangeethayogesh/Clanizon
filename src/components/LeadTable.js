import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Table, Tag } from 'antd'
import { SmileTwoTone } from '@ant-design/icons'
// import { Smile } from '../asssets/smile'
// import { Sad } from '../asssets/sad.svg'
// import { Normal } from '../asssets/normal.svg'

import '../styles/lead-table.css'
import '../styles/common.css'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 200,
    // eslint-disable-next-line react/display-name
    render: (name) => (
      <div>
        <img className="table-thumbnail" src='https://randomuser.me/api/portraits/women/42.jpg'/>
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
  }
]
const tableColumns = columns.map(item => ({ ...item, ellipsis: true, className: 't-head' }))
const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Paul walker ${i}`,
    email: `Paulwalker${i}@gmail.com`,
    contact_number: '1234567890',
    next_schedule: '10:30AM',
    location: 'madurai',
    intrested_plots: (i % i === 0) ? ['P124', 'P435', 'G343'] : ['P124', 'P435', 'G343', 'P124', 'P435', 'P124', 'P435'],
    score_summary: ['happy', 'sad', 'okay']
  })
}
const LeadTable = props => {
  return (
    <Layout.Content>
      <Table columns={tableColumns} size="middle" dataSource={data} pagination={{ pageSize: 10 }} scroll={{ y: 300 }}/>
    </Layout.Content>
  )
}

LeadTable.propTypes = {}

export { LeadTable }
