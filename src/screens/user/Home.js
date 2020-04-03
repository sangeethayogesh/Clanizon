import React from 'react';
import { Button,Layout, Row, Col} from 'antd';
import { CategoryTile } from '../../components/CategoryTile';
import Grid from 'antd/lib/card/Grid';
const { Header, Footer, Sider, Content } = Layout;
function HeaderBar(){
    return(
       
          <div style={{ padding: '0 50px' }}>
            <Row gutter={[8, 16]}>
              <Col span="6" sm={6} xs={24}><CategoryTile title="Lead" count="21" gradient={['#c185fa','#6a3ec3']}></CategoryTile></Col>
              <Col span="6" sm={6} xs={24} ><CategoryTile title="Prospecting" count="21" gradient={['#efd67c','#f76b1c']}></CategoryTile></Col>
              <Col span="6" sm={6} xs={24}><CategoryTile title="Closure" count="21" gradient={['#b9e270','#60904d']}></CategoryTile></Col>
              <Col span="6" sm={6} xs={24}><CategoryTile title="Converted" count="21" gradient={['#ff5878','#ff5878']}></CategoryTile></Col>
            </Row>
            </div>
    )
}



function UserHome(){
    return(
        <HeaderBar></HeaderBar>
    )
}
export default UserHome;