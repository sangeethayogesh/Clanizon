import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'

const LoginModel = props => {
  return (
    <div>
      <Card>
        <div></div>
        <Card>
          <Card></Card>
        </Card>
      </Card>
    </div>
  )
}

LoginModel.propTypes = {
  name: PropTypes.any.isRequired
}

export { LoginModel }
