import React, { useEffect, useState } from 'react'
import HeaderBar from '../../components/HeaderBar'
import { SubNavBar } from '../../components/SubNavBar'
import { Row, Col, Descriptions, Modal,Card, Layout,message,Divider,   Button} from 'antd'
import { useStoreActions } from 'easy-peasy'
import { s3 } from 'utils/s3'
import { Document, Page } from 'react-pdf';
import FileUpload from '../../components/FileUpload'
import { LeadPersonalCard } from '../../components/LeadPersonalCard'
import '../../styles/agent-overall.css'
import rest from 'services/http'
import { OverallCallStatus } from '../../components/OverallCallStatus'
import { useHistory } from 'react-router-dom'

import constants from '../../constants'
import PDFViewer from 'pdf-viewer-reactjs'
import { useStoreState } from 'easy-peasy'
const OverAll = (props) => {
  const { group } = props
  const [showUploadModal, setShowUploadModal] = useState(false)
  const history = useHistory()
  const [successFiles, setSuccessFiles] = useState({})
  const lead = history.location.leadDetail
  const getleadDetail = useStoreActions(
    (actions) => actions.leads.getLeadDetail
  )
  const onCancelUpload = () => {
    setShowUploadModal(false)
  }
  const currentUser = useStoreState((state) => state.auth.user)
  const leadDetail = useStoreState((store) => store.leads.leadDetail)
  const [loading, setLoading] = useState(false)
  const data = {
    url:constants.URL.GET_LEAD_DETAIL + '?leadId=' + lead.leadId,
    callback: () => {
      setLoading(false)
    }
  }
  useEffect(() => {
    setLoading(true)
    getleadDetail(data)
  }, [])

  useEffect(() => {
    if (lead === undefined) history.goBack()
  }, [])
  function beforeUpload(file) {
    const isPDF = file.type === "application/pdf"
    if (!isPDF) {
      message.error('You can only PDF File!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isPDF && isLt2M
  }

   const onClickUpload = () => {
    rest
      .get(constants.URL.GET_LEAD_DOCUMENT +'?leadId=' + lead.leadId)
      .then((res) => {
        setLoading(false)
        console.log(res)
        setSuccessFiles(res.data[0])
        setShowUploadModal(true)
      })
      .catch((err) => {
        
        setLoading(false)
        console.error(err)
        message.error('PDF read Error')
      })
  }
  const uploadToS3 = (e) => {
    console.log('In file uplo')
    var valid = beforeUpload(e)
    if (!valid) {
      return false
    }
    const fname = new Date().getTime()
    setLoading(true)
    s3.uploadFile(e, fname)
      .then((response) => {
        console.log(response)
        var uploaddocrequest = {
          docIdLead:lead.leadId,
          docTypeId: 2,
          docCreatedDatetime:new Date(),
          docUrl: response.location
        }
        // setSuccessFiles([...successFiles, response])
        // console.log(successFiles);
        rest
          .post(constants.URL.ADD_LEAD_DOCUMENT, uploaddocrequest)
          .then((res) => {
            setLoading(false)
            message.success('Uploaded!')
           
           
          })
          .catch((err) => {
            setLoading(false)
            message.error('Upload Error')
          })
      })
      .catch((err) => {
        console.log(err)
        message.error('Upload failed!')
      })
  }

  return (
    <HeaderBar drawer={false}>
      <SubNavBar></SubNavBar>
      <Layout.Content id="lead-section" style={{ padding: '1rem' }}>
        <Row gutter={[16, 16]}>
          {lead && lead.leadStatus && (
            <>
              <Col span={16}>
                <OverallCallStatus
                  leadId={lead.leadId}
                  leadDetail={leadDetail}
                  status={lead.leadStatus}
                  leadAsset={lead.leadAsset}
                  currentUser={currentUser}
                ></OverallCallStatus>
              </Col>
              <Col span={8}>
                <Card className="lead-card">
                  <Descriptions
                    colon={false}
                    size="middle"
                    layout="vertical"
                    column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                  >
                    <Descriptions.Item label="Lead Status">
                      {constants.getLeadStatusById(lead.leadStatus)}
                    </Descriptions.Item>
                   
                    {/* <Descriptions.Item label="Intrested  area">
                Adayar{' '}
              </Descriptions.Item>
              <Descriptions.Item label="Intrested  plots">
                Plot CA301, Plot CA304, Plot CA308,Plot CA308
              </Descriptions.Item> */}
                  </Descriptions>
                </Card>
                <div style={{ paddingTop: '1rem' }}>
                  <LeadPersonalCard
                    lead={lead}

                    source={lead.leadSource}
                  ></LeadPersonalCard>
                </div>
                <Divider/>
                {currentUser.userRole == '2' && 
                  (<Button key="1" onClick={() => onClickUpload()}>
                      Documents
                  </Button>)}
                <Modal
        closable={true}
        onCancel={onCancelUpload}
        width={800}
        height={800}
        title="Upload Proposal Document"
        visible={showUploadModal}
        footer={null}
      >
                <Divider dashed>Or</Divider>
        <div style={{ textAlign: 'center' }}>
          <FileUpload handleFile={uploadToS3} />
        </div>
       

<Document
        file={successFiles?successFiles.docUrl:null}
        
      >
        <Page pageNumber={1} />
      </Document>
      </Modal>
              </Col>
            </>
          )}
        </Row>
      </Layout.Content>
      <Layout.Content></Layout.Content>
    </HeaderBar>
  )
}

export { OverAll }
