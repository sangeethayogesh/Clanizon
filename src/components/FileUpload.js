import React from 'react'
import { Button } from 'antd'

const FileUpload = (props) => {
  const hiddenFileInput = React.useRef(null)

  const handleClick = (event) => {
    hiddenFileInput.current.click()
  }
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0]
    props.handleFile(fileUploaded)
  }
  return (
    <>
      <Button onClick={handleClick}>Upload Document</Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </>
  )
}
export default FileUpload
