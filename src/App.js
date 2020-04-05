import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { StoreProvider, createStore } from 'easy-peasy'
import models from './models'
import './App.css'

import UserHome from './screens/user/Home'
import AdminHome from './screens/admin/Home'

const storeModel = createStore(models)

function AppRouter () {
  return (
    <>
      <Route exact path="/" component={UserHome}></Route>
      <Route exact path="/admin" component={AdminHome}></Route>
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
