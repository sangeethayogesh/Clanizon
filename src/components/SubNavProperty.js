/* eslint-disable no-unused-expressions */
import React, { useState } from 'react'
import { PageHeader, Button, Layout, Modal, message ,Carousel} from 'antd'
import '../styles/agent-overall.css'
import { Model } from 'miragejs'
import ImgsViewer from 'react-images-viewer'

import FileUpload from './FileUpload'
import { s3 } from 'utils/s3'
import rest from 'services/http'
//import constants from 'constants'

import constants from '../constants'
const { Header } = Layout
const SubNavProperty = (props) => {
  const { group } = props
  const docList =[]
  const [loading, setLoading] = useState(false)
  const [successFiles, setSuccessFiles] = useState([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const onViewImage = () => {}
  const onClickUpload = () => {
    rest
      .get(constants.URL.LIST_GROUP_IMAGE+group.assetGroupId  )
      .then((res) => {
        setLoading(false)
        console.log(res)
        setSuccessFiles(res.data)
        message.success('Doc Done!')
        setShowUploadModal(true)
      })
      .catch((err) => {
        setLoading(false)
        console.error(err)
        message.error('Upload Error')
      })
  }
  const onOkUpload = (uploaddocrequest) => {
    setLoading(true)
    rest
      .post(constants.URL.ADD_IMAGE_TO_ASSET_GROUP, uploaddocrequest)
      .then((res) => {
        setLoading(false)
       
        setShowUploadModal(false)
      })
      .catch((err) => {
        setLoading(false)
        console.error(err)
        message.error('Upload Error')
      })
    setShowUploadModal(false)
  }
  const onCancelUpload = () => {
    setShowUploadModal(false)
  }
  const addNewImage = (res) => {}
  const uploadToS3 = (e) => {
    console.log("In file uplo");
    const fname = new Date().getTime()
    setLoading(true);
    s3.uploadFile(e, fname)
      .then((response) => {
       console.log(response);
       var uploaddocrequest= {
        "assetGroupId": group.assetGroupId,
        "docTypeId": 2,
        "docurl":response.location
       };
        //setSuccessFiles([...successFiles, response])
       // console.log(successFiles);
       rest
      .post(constants.URL.ADD_IMAGE_TO_ASSET_GROUP, uploaddocrequest)
      .then((res) => {
        setLoading(false)
        message.success('Uploaded!')
        setShowUploadModal(false)
      })
      .catch((err) => {
        setLoading(false)
        console.error(err)
        message.error('Upload Error')
      })
    setShowUploadModal(false)
      })
      .catch((err) => {
        console.log(err)
        message.error('Upload failed!')
      })
  }
  return (
    <div>
      <Header style={{ padding: '2rem' }}></Header>
      <PageHeader
        className="site-page-subheader"
        ghost={true}
        onBack={() => window.history.back()}
        title="Back"
        extra={[
          <Button className="book-btn" key="2" onClick={() => onViewImage()}>
            Images
          </Button>,
          <Button key="1" onClick={() => onClickUpload()}>
            Upload
          </Button>
        ]}
      ></PageHeader>
      <Modal width={800} height={800}
        title="Upload Images"
        visible={showUploadModal}
        footer={[
          <Button key="back" onClick={onCancelUpload}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={onOkUpload}
          >
            Submit
          </Button>
        ]}
      >


         <Carousel >
         {successFiles.map((file, index) => {
           console.log(file);
                        return (
                          <input height= {450} type="image" src={file.docurl}>
                            
                          </input>
                        )
                      })}
  </Carousel>
        <FileUpload handleFile={uploadToS3} />
     
       
      </Modal>
    </div>
  )
}

export { SubNavProperty }
