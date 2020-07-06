import React, { useEffect, useState } from 'react'
import { Layout, Row, Col } from 'antd'
import HeaderBar from '../../components/HeaderBar'
import { SubNavBar } from '../../components/SubNavBar'
import { useStoreState } from 'easy-peasy'
import { useHistory } from 'react-router-dom'
import { FlatLists } from '../../components/Property/FlatLists'
import '../../styles/flat.css'
import { FlatForm } from '../../components/Property/FlatForm'
import { FlatEditForm } from '../../components/Property/FlatEditForm'

const Property = (props) => {
  const history = useHistory()
  const group = history.location.groupDetails
  const [flatForEdit, setFlatForEdit] = useState(null)

  const onFlatClick = (flat) => {
    setFlatForEdit(null)
    setFlatForEdit(flat)
  }
  const clearEdit = () => {
    setFlatForEdit(null)
  }
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
              <FlatLists group={group} onFlatClick={onFlatClick} />
            </Col>
            <Col span="6" className="flat-card-outline">
              {!flatForEdit && <FlatForm group={group} />}
              {flatForEdit && (
                <FlatEditForm
                  group={group}
                  flat={flatForEdit}
                  status={flatForEdit.assetStatus.assetStatusId}
                  onSuccess={clearEdit}
                ></FlatEditForm>
              )}
            </Col>
          </Row>
        </Layout.Content>
      </HeaderBar>
    </>
  )
}

Property.propTypes = {}

export { Property }
