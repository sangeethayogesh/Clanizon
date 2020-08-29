/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Row, Col, Modal, Avatar, Descriptions, message } from 'antd'
import { CategoryTile } from '../../components/CategoryTile'
import { ReportCard } from '../../components/ReportCard'
import { LoadMore } from '../../components/LoadMore'
import HeaderBar from '../../components/HeaderBar'
import '../../styles/overall-product-report.css'
import { TimeLineView } from '../../components/TimeLineView'
import { UserInfoView } from '../../components/UserInfoView'
import { useStoreState } from 'easy-peasy'
import rest from 'services/http'
import constants from '../../constants'

const OverallProductReport = (props) => {
  const [visibleDetailedReport, setVisibleDetailedReport] = useState(false)
  const [visibleAddAgent, setVisibleAddAgent] = useState(true)
  const [list, setList] = useState(null)
  const [detailed, setDetailed] = useState(null)
  const currentUser = useStoreState((state) => state.auth.user)
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
  const getAllLeads = (currentUser) => {
    rest
      .get(constants.URL.GET_All_LEAD_BYADMIN+ '?userMobile=' + currentUser)
      .then((response) => {
        processData(response.data)
      })
      .catch((error) => {
        console.log(error)
        message.error('Loading Failed!')
      })
  }
  useEffect(() => {
    getAllLeads(currentUser.userMobile)
  }, [])
  return (
    <HeaderBar>
      <Row gutter={[24, 16]}>
        <Col span="6" sm={(6, 6)} xs={24}>
          <CategoryTile
            title="Market Platform"
            count={(list && list.prospecting && list.prospecting.length) || 0}
            gradient={['#c185fa', '#6a3ec3']}
            onClick={showAddAgent}
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
            title="Working Platform"
            count={(list && list.closer && list.closer.length) || 0}
            gradient={['#efd67c', '#f76b1c']}
          ></CategoryTile>
          {list &&
            list.closer &&
            list.closer.map((lead, idx) => {
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
            title="Buying Platform"
            count={(list && list.converted && list.converted.length) || 0}
            gradient={['#b9e270', '#60904d']}
          ></CategoryTile>
          {list &&
            list.converted &&
            list.converted.map((lead, idx) => {
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
        {/* <Col span="6" sm={6} xs={24}>
          <CategoryTile
            title="Closure"
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
                  onClick={() => showModel(lead)}
                ></ReportCard>
              )
            })}
          <LoadMore onLoadMore={() => {}}></LoadMore>
        </Col> */}
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
                  {(detailed && detailed.companyName)
                    ? detailed.companyName.slice(0, 2)
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
