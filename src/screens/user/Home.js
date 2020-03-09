import React from 'react';
import { Button,Layout} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
function HeaderBar(){
    return(
        <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
    )
}



function UserHome(){
    return(
        <HeaderBar></HeaderBar>
    )
}
export default UserHome;