import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CustomerDetailedReport = props => {
  const [visible, setVisible] = useState(false)
  const handleCancel = () => {
    setVisible(false)
  }
  return (
    <div></div>
  )
}

CustomerDetailedReport.propTypes = {
  title: PropTypes.string
}

export default { CustomerDetailedReport }
