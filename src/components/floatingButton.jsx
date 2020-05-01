import React from 'react'
import {
  SendOutlined,
  CloseOutlined
} from '@ant-design/icons'

const FloatingButton = (props) => {
  return (
    <div className="float">
      {props.show
        ? <CloseOutlined className="my-float" {...props}/>
        : <SendOutlined className="my-float" style={{
          transform: 'rotate(-30deg)',
          marginLeft: '10px'
        }} {...props}/>}
    </div>
  )
}
export default FloatingButton
