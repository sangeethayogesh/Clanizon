/* eslint-disable no-unused-expressions */
import React, { useState } from 'react'
import {
  PageHeader,
  Button,
  Layout,
  Modal,
  message,
  Carousel,
  Divider
} from 'antd'
import '../styles/agent-overall.css'

import FileUpload from './FileUpload'
import { s3 } from 'utils/s3'
import rest from 'services/http'
// import constants from 'constants'

import constants from '../constants'
const { Header } = Layout
const SubNavProperty = (props) => {
  const { group } = props
  const [loading, setLoading] = useState(false)
  const [successFiles, setSuccessFiles] = useState([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const onClickUpload = () => {
    rest
      .get(constants.URL.LIST_GROUP_IMAGE + group.assetGroupId)
      .then((res) => {
        setLoading(false)
        console.log(res)
        setSuccessFiles(res.data)
        setShowUploadModal(true)
      })
      .catch((err) => {
        setLoading(false)
        console.error(err)
        message.error('Upload Error')
      })
  }
  // const onOkUpload = (uploaddocrequest) => {
  //   setLoading(true)
  //   rest
  //     .post(constants.URL.ADD_IMAGE_TO_ASSET_GROUP, uploaddocrequest)
  //     .then((res) => {
  //       setLoading(false)
  //       setShowUploadModal(false)
  //     })
  //     .catch((err) => {
  //       setLoading(false)
  //       console.error(err)
  //       message.error('Upload Error')
  //     })
  //   setShowUploadModal(false)
  // }
  const onCancelUpload = () => {
    setShowUploadModal(false)
  }
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
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
          assetGroupId: group.assetGroupId,
          docTypeId: 2,
          docurl: response.location
        }
        // setSuccessFiles([...successFiles, response])
        // console.log(successFiles);
        rest
          .post(constants.URL.ADD_IMAGE_TO_ASSET_GROUP, uploaddocrequest)
          .then((res) => {
            setLoading(false)
            message.success('Uploaded!')
            successFiles.push(res.data)
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
          <Button key="1" onClick={() => onClickUpload()}>
            Documents
          </Button>
        ]}
      ></PageHeader>
      <Modal
        closable={true}
        onCancel={onCancelUpload}
        width={800}
        height={800}
        title="Upload Images"
        visible={showUploadModal}
        footer={null}
      >
        <Carousel autoplay>
          {successFiles.map((file, index) => {
            return (
              <input
                key={index}
                height={450}
                type="image"
                alt="document"
                src={file.docurl}
              ></input>
            )
          })}
        </Carousel>
        <Divider dashed>Or</Divider>
        <div style={{ textAlign: 'center' }}>
          <FileUpload handleFile={uploadToS3} />
        </div>
      </Modal>
    </div>
  )
}

export { SubNavProperty }
