import React from 'react'
import HeaderBar from '../../components/HeaderBar'
import { AddArea } from '../../components/AddArea'

const AddPlotArea = (props) => {
  return (
    <HeaderBar>
      <AddArea></AddArea>
    </HeaderBar>
  )
}

AddPlotArea.propTypes = {}

export { AddPlotArea }
