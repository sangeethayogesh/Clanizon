import React from 'react'
// import { Row, Col } from 'antd'
// import { CategoryTile } from '../../components/CategoryTile'
// import { ReportCard } from '../../components/ReportCard'
// import { LoadMore } from '../../components/LoadMore'
import HeaderBar from '../../components/HeaderBar'
import { Link } from 'react-router-dom'
// function Home () {
//   return (
//     <Row gutter={[24, 16]}>
//       <Col span="6" sm={ 6, 6 } xs={24}>
//         <CategoryTile title="Lead" count="21" gradient={['#c185fa', '#6a3ec3']}></CategoryTile>
//         <ReportCard></ReportCard>
//         <ReportCard></ReportCard>
//         <ReportCard></ReportCard>
//         <LoadMore onLoadMore={() => { }}></LoadMore>
//       </Col>
//       <Col span="6" sm={6} xs={24} >
//         <CategoryTile title="Prospecting" count="21" gradient={['#efd67c', '#f76b1c']}></CategoryTile>
//         <ReportCard></ReportCard>
//         <ReportCard></ReportCard>
//         <ReportCard></ReportCard>
//         <ReportCard></ReportCard>
//         <ReportCard></ReportCard>
//         <LoadMore onLoadMore={() => { }}></LoadMore>
//       </Col>
//       <Col span="6" sm={6} xs={24}><CategoryTile title="Closure" count="21" gradient={['#b9e270', '#60904d']}></CategoryTile>
//         <ReportCard></ReportCard>
//         <ReportCard></ReportCard>
//         <LoadMore onLoadMore={() => { }}></LoadMore>
//       </Col>
//       <Col span="6" sm={6} xs={24}><CategoryTile title="Converted" count="21" gradient={['#ff5878', '#ff5878']}></CategoryTile>
//         <ReportCard></ReportCard>
//         <ReportCard></ReportCard>
//         <ReportCard></ReportCard>
//         <ReportCard></ReportCard>
//         <LoadMore onLoadMore={() => { }}></LoadMore>
//       </Col>
//     </Row>
//   )
// }
function UserHome() {
  return (
    <HeaderBar>
      <h2>Home</h2>
      <Link to="/agent">Agent</Link> || <Link to="/admin">Admin</Link>
    </HeaderBar>
  )
}
export default UserHome
