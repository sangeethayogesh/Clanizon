/* eslint-disable no-unused-expressions */
import React, { useState } from 'react'
import { PageHeader, Button, Layout, Modal, message } from 'antd'
import '../styles/agent-overall.css'
import { Model } from 'miragejs'
import FileUpload from './FileUpload'
import { s3 } from 'utils/s3'
import rest from 'services/http'
import constants from 'constants'
const { Header } = Layout
const SubNavProperty = (props) => {
  const [loading, setLoading] = useState(false)
  const [successFiles, setSuccessFiles] = useState([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const onViewImage = () => {}
  const onClickUpload = () => {
    setShowUploadModal(true)
  }
  const onOkUpload = () => {
    setLoading(true)
    rest
      .post(constants.URL.ADD_IMAGE_TO_ASSET_GROUP, successFiles)
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
    const fname = new Date().getTime()
    s3.uploadFile(e, fname)
      .then((response) => {
        message.success('Uploaded!')
        setSuccessFiles([...successFiles, response])
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
      <Modal
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
        {/* <Upload customRequest={handleUpload} >
              <Button>
                <UploadOutlined />
              </Button>
            </Upload> */}
        <FileUpload handleFile={uploadToS3} />
        <h4>Uploaded</h4>
        <div>
          {successFiles &&
            successFiles.map((file, id) => {
              return <li key={id}>{file.key}</li>
            })}
        </div>
      </Modal>
    </div>
  )
}

export { SubNavProperty }
