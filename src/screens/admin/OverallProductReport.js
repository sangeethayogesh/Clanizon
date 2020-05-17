import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Modal, Avatar, Descriptions } from 'antd'
import { CategoryTile } from '../../components/CategoryTile'
import { ReportCard } from '../../components/ReportCard'
import { LoadMore } from '../../components/LoadMore'
import HeaderBar from '../../components/HeaderBar'
import '../../styles/overall-product-report.css'
import { TimeLineView } from '../../components/TimeLineView'
import { UserInfoView } from '../../components/UserInfoView'
import { AddAgent } from '../../components/AddAgent'
const OverallProductReport = props => {
  const [visibleDetailedReport, setVisibleDetailedReport] = useState(false)
  const [visibleAddAgent, setVisibleAddAgent] = useState(true)
  function handleCancel (params) {
    setVisibleDetailedReport(false)
  }
  const showModel = () => {
    setVisibleDetailedReport(true)
  }
  const showAddAgent = () => {
    setVisibleAddAgent(true)
  }
  function handleAddAgentCancel () {
    setVisibleAddAgent(false)
  }
  return (
    <HeaderBar>
      <Row gutter={[24, 16]}>
        <Col span="6" sm={ 6, 6 } xs={24}>
          <CategoryTile title="Lead" count="21" gradient={['#c185fa', '#6a3ec3']} onClick={showAddAgent}></CategoryTile>
          <ReportCard onClick={showModel}></ReportCard>
          <ReportCard onClick={showModel}></ReportCard>
          <ReportCard onClick={showModel}></ReportCard>
          <LoadMore onLoadMore={() => { }}></LoadMore>
        </Col>
        <Col span="6" sm={6} xs={24} >
          <CategoryTile title="Prospecting" count="21" gradient={['#efd67c', '#f76b1c']}></CategoryTile>
          <ReportCard onClick={showModel}></ReportCard>
          <ReportCard onClick={showModel}></ReportCard>
          <ReportCard onClick={showModel}></ReportCard>
          <ReportCard onClick={showModel}></ReportCard>
          <ReportCard onClick={showModel}></ReportCard>
          <LoadMore onLoadMore={() => { }}></LoadMore>
        </Col>
        <Col span="6" sm={6} xs={24}><CategoryTile title="Closure" count="21" gradient={['#b9e270', '#60904d']}></CategoryTile>
          <ReportCard onClick={showModel}></ReportCard>
          <ReportCard onClick={showModel}></ReportCard>
          <LoadMore onLoadMore={() => { }}></LoadMore>
        </Col>
        <Col span="6" sm={6} xs={24}><CategoryTile title="Converted" count="21" gradient={['#ff5878', '#ff5878']}></CategoryTile>
          <ReportCard onClick={showModel}></ReportCard>
          <ReportCard onClick={showModel}></ReportCard>
          <ReportCard onClick={showModel}></ReportCard>
          <ReportCard onClick={showModel}></ReportCard>
          <LoadMore onLoadMore={() => { }}></LoadMore>
        </Col>
      </Row>
      <Modal
        visible={visibleDetailedReport}
        title="Customer’s detailed report"
        onCancel={handleCancel}
        footer={null}
        width="80%"
        centered
      >
        <Row>
          <Col span={1}><Descriptions>
            <Descriptions.Item label=""><Avatar style={{ color: '#e13f56', backgroundColor: '#f9f3ef', fontFamily: 'Lato' }}>IS</Avatar></Descriptions.Item>

          </Descriptions></Col>
          <Col span={14}>
            <UserInfoView/>
          </Col>
          <Col span={9} style={{ backgroundColor: '#fbfbfb' }}>
            <TimeLineView/>
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
