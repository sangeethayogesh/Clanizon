import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Row, Col } from 'antd';
import '../styles/overall-tile.css';
const OverallTile = props => {
  const [total, setTotal] = useState(0)
  return (
    <div >
      <Card className="overall-tile" bordered={false}>
        <p> Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>

  )
};

OverallTile.propTypes = {};

export { OverallTile };