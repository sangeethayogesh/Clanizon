import React from 'react'
import PropTypes from 'prop-types'
import { Drawer, Button, Input } from 'antd'

const AddNote = (props) => {
  return (
    <Drawer
      title="Add Note"
      width={520}
      onClose={props.onClose}
      visible={props.visible}
      bodyStyle={{ paddingBottom: 80 }}
      
      footer={
        <div
          style={{
            textAlign: 'right'
          }}
        >
          <Button onClick={props.onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={props.onSave('data')} type="primary">
            Save
          </Button>
        </div>
      }
    >
      <Input.TextArea></Input.TextArea>
    </Drawer>
  )
}

AddNote.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func
}

export { AddNote }
