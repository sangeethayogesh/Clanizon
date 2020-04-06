import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button, Modal } from 'antd'
import { CategoryTile } from '../../components/CategoryTile'
import { ReportCard } from '../../components/ReportCard'
import { LoadMore } from '../../components/LoadMore'
import HeaderBar from '../../components/HeaderBar'
import CustomerDetailedReport from '../../components/CustomerDetailedReport'
import '../../styles/overall-product-report.css'
const OverallProductReport = props => {
  const [visibleDetailedReport, setVisibleDetailedReport] = useState(false)
  function handleCancel (params) {
    setVisibleDetailedReport(false)
  }
  return (
    <HeaderBar>
      <Row gutter={[24, 16]}>
        <Col span="6" sm={ 6, 6 } xs={24}>
          <CategoryTile title="Lead" count="21" gradient={['#c185fa', '#6a3ec3']}></CategoryTile>
          <ReportCard onShowDetailReport={() => { setVisibleDetailedReport(true) }}></ReportCard>
          <ReportCard></ReportCard>
          <ReportCard></ReportCard>
          <LoadMore onLoadMore={() => { }}></LoadMore>
        </Col>
        <Col span="6" sm={6} xs={24} >
          <CategoryTile title="Prospecting" count="21" gradient={['#efd67c', '#f76b1c']}></CategoryTile>
          <ReportCard></ReportCard>
          <ReportCard></ReportCard>
          <ReportCard></ReportCard>
          <ReportCard></ReportCard>
          <ReportCard></ReportCard>
          <LoadMore onLoadMore={() => { }}></LoadMore>
        </Col>
        <Col span="6" sm={6} xs={24}><CategoryTile title="Closure" count="21" gradient={['#b9e270', '#60904d']}></CategoryTile>
          <ReportCard></ReportCard>
          <ReportCard></ReportCard>
          <LoadMore onLoadMore={() => { }}></LoadMore>
        </Col>
        <Col span="6" sm={6} xs={24}><CategoryTile title="Converted" count="21" gradient={['#ff5878', '#ff5878']}></CategoryTile>
          <ReportCard></ReportCard>
          <ReportCard></ReportCard>
          <ReportCard></ReportCard>
          <ReportCard></ReportCard>
          <LoadMore onLoadMore={() => { }}></LoadMore>
        </Col>
      </Row>
      <Modal
        visible={visibleDetailedReport}
        title="Customer’s detailed report"
        onCancel={handleCancel}
        footer={null}
        style={{
          borderRadius: '8px',
          boxShadow: '0 2px 25px 2px #0000003f',
          backgroundColor: '#ffffff'
        }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </HeaderBar>
  )
}

OverallProductReport.propTypes = {}

export default OverallProductReport
