import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Layout } from 'antd'

const AddArea = props => {
  const [postion, setPosition] = useState([13.077806191753977, 80.27881622314455])
  function handleClick (e) {
    setPosition(e.latlng)
    console.log(e.latlng)
  }
  return (
    <Layout.Content>
      <Map
        center={postion}
        zoom={12}
        style={{ width: '100%', height: '500px' }}
        onclick= {handleClick}
        animate={true}
      >
        <TileLayer
          attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={postion}></Marker>
      </Map>
    </Layout.Content>

  )
}

AddArea.propTypes = {}

export { AddArea }
