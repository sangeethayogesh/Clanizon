import React, { useEffect } from 'react'
import { Layout, Row, Col } from 'antd'
import HeaderBar from '../../components/HeaderBar'
import { SubNavBar } from '../../components/SubNavBar'
import { useStoreState } from 'easy-peasy'
import { useHistory } from 'react-router-dom'
import { FlatLists } from '../../components/Property/FlatLists'
import '../../styles/flat.css'
import { FlatForm } from 'components/Property/FlatForm'

const Property = (props) => {
  const history = useHistory()
  const group = history.location.groupDetails
  const currentUser = useStoreState((state) => state.auth.user)
  useEffect(() => {
    if (group === undefined) history.goBack()
  }, [])
  return (
    <>
      <HeaderBar drawer={false}>
        <SubNavBar></SubNavBar>
        <Layout.Content id="lead-section" style={{ padding: '1rem' }}>
          <Row gutter={[16, 16]}>
            <Col span="17" className="flat-card-outline">
              <FlatLists group={group} />
            </Col>
            <Col span="6" className="flat-card-outline">
              <FlatForm group={group} />
            </Col>
          </Row>
        </Layout.Content>
      </HeaderBar>
    </>
  )
}

Property.propTypes = {}

export { Property }
