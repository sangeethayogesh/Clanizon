import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Modal, Avatar, Descriptions, message } from 'antd'
import { CategoryTile } from '../../components/CategoryTile'
import { ReportCard } from '../../components/ReportCard'
import { LoadMore } from '../../components/LoadMore'
import HeaderBar from '../../components/HeaderBar'
import '../../styles/overall-product-report.css'
import { TimeLineView } from '../../components/TimeLineView'
import { UserInfoView } from '../../components/UserInfoView'
import rest from 'services/http'
const OverallProductReport = (props) => {
  const [visibleDetailedReport, setVisibleDetailedReport] = useState(false)
  const [visibleAddAgent, setVisibleAddAgent] = useState(true)
  const [list, setList] = useState(null)
  const [detailed, setDetailed] = useState(null)
  function handleCancel(params) {
    setVisibleDetailedReport(false)
  }
  const showModel = (data) => {
    setDetailed(data)
    console.log(data)
    setVisibleDetailedReport(true)
  }
  const showAddAgent = () => {
    setVisibleAddAgent(true)
  }
  function processData(data) {
    const created = data.filter((leads) => leads.leadStatus == 1)
    const prospecting = data.filter((leads) => leads.leadStatus == 2)
    const closer = data.filter((leads) => leads.leadStatus == 3)
    const converted = data.filter((leads) => leads.leadStatus == 4)
    setList({
      created: created,
      prospecting: prospecting,
      closer: closer,
      converted: converted
    })
    console.log(list)
  }
  const getAllLeads = () => {
    rest
      .get('http://realkeyip.in:8083/api/leads/getAllLeads')
      .then((response) => {
        processData(response.data)
      })
      .catch((error) => {
        console.log(error)
        message.error('Loading Failed!')
      })
  }
  useEffect(() => {
    getAllLeads()
  }, [])
  return (
    <HeaderBar>
      <Row gutter={[24, 16]}>
        <Col span="6" sm={(6, 6)} xs={24}>
          <CategoryTile
            title="Lead"
            count={(list && list.created && list.created.length) || 0}
            gradient={['#c185fa', '#6a3ec3']}
            onClick={showAddAgent}
          ></CategoryTile>
          {list &&
            list.created &&
            list.created.map((lead, idx) => {
              return (
                <ReportCard
                  lead={lead}
                  key={idx}
                  onClick={() => showModel(lead)}
                ></ReportCard>
              )
            })}

          <LoadMore onLoadMore={() => {}}></LoadMore>
        </Col>
        <Col span="6" sm={6} xs={24}>
          <CategoryTile
            title="Prospecting"
            count={(list && list.prospecting && list.prospecting.length) || 0}
            gradient={['#efd67c', '#f76b1c']}
          ></CategoryTile>
          {list &&
            list.prospecting &&
            list.prospecting.map((lead, idx) => {
              return (
                <ReportCard
                  lead={lead}
                  key={idx}
                  onClick={() => showModel(lead)}
                ></ReportCard>
              )
            })}
          <LoadMore onLoadMore={() => {}}></LoadMore>
        </Col>
        <Col span="6" sm={6} xs={24}>
          <CategoryTile
            title="Closure"
            count={(list && list.closer && list.closer.length) || 0}
            gradient={['#b9e270', '#60904d']}
          ></CategoryTile>
          {list &&
            list.closer &&
            list.closer.map((lead, idx) => {
              return (
                <ReportCard
                  lead={lead}
                  key={idx}
                  onClick={showModel}
                ></ReportCard>
              )
            })}
          <LoadMore onLoadMore={() => {}}></LoadMore>
        </Col>
        <Col span="6" sm={6} xs={24}>
          <CategoryTile
            title="Converted"
            count={(list && list.converted && list.converted.length) || 0}
            gradient={['#ff5878', '#ff5878']}
          ></CategoryTile>
          {list &&
            list.converted &&
            list.converted.map((lead, idx) => {
              return (
                <ReportCard
                  lead={lead}
                  key={idx}
                  onClick={showModel}
                ></ReportCard>
              )
            })}
          <LoadMore onLoadMore={() => {}}></LoadMore>
        </Col>
      </Row>
      <Modal
        visible={visibleDetailedReport}
        title="Leads’s detailed report"
        onCancel={handleCancel}
        footer={null}
        width="80%"
        centered
      >
        <Row>
          <Col span={1}>
            <Descriptions>
              <Descriptions.Item label="">
                <Avatar
                  style={{
                    color: '#e13f56',
                    backgroundColor: '#f9f3ef',
                    fontFamily: 'Lato'
                  }}
                >
                  {detailed
                    ? detailed.leadCustomer.userFname.slice(0, 2)
                    : 'Is'}
                </Avatar>
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={14}>
            <UserInfoView lead={detailed} />
          </Col>
          <Col span={9} style={{ backgroundColor: '#fbfbfb' }}>
            <TimeLineView />
          </Col>
        </Row>
      </Modal>
      {/* <Modal
        visible={visibleAddAgent}
        title="Add new agent"
        onCancel={handleAddAgentCancel}
        footer={null}
        width="40%"
        centered
      >
        <AddAgent/>
      </Modal> */}
    </HeaderBar>
  )
}

OverallProductReport.propTypes = {}

export default OverallProductReport
