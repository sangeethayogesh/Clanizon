import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { StoreProvider, createStore } from 'easy-peasy'
import models from './models'
import './App.css'
import UserHome from './screens/user/Home'
import AdminHome from './screens/admin/Home'
import OverallProductReport from './screens/admin/OverallProductReport'
import { AddPlotArea } from './screens/admin/AddPlotArea'
import { AgentHome } from './screens/agent/Home'
import { OverAll } from './screens/agent/OverAll'
import AddLead from 'screens/agent/AddLead'

const storeModel = createStore(models)

function AppRouter () {
  return (
    <>

      <Route exact path="/" component={UserHome}></Route>
      <Route exact path="/admin" component={AdminHome}></Route>
      <Route exact path="/agent" component={AgentHome}></Route>
      <Route exact path="/agent/overall" component={OverAll}></Route>
      <Route exact path="/admin/overall-product-report" component={OverallProductReport}></Route>
      <Route exact path="/admin/add-plot-area" component={AddPlotArea}></Route>
      <Route exact path="/agent/add-lead" component={AddLead}></Route>
    </>
  )
}

function App () {
  return (
    <BrowserRouter>
      <StoreProvider store={storeModel}>
        <AppRouter />
      </StoreProvider>
    </BrowserRouter>
  )
}

export default App
