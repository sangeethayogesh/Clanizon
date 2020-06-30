/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, Component } from 'react'
import { BrowserRouter, Route, Redirect, useHistory } from 'react-router-dom'
import { StoreProvider, createStore, useStoreState } from 'easy-peasy'
import models from './models'
import './App.css'
// import UserHome from './screens/user/Home'
import AdminHome from './screens/admin/Home'
import OverallProductReport from './screens/admin/OverallProductReport'
import { AddPlotArea } from './screens/admin/AddPlotArea'
import { AgentHome } from './screens/agent/Home'
import { OverAll } from './screens/agent/OverAll'
import AddLead from 'screens/agent/AddLead'
// import { Server, Model } from 'miragejs'
import LoginForm from 'screens/auth/Login'

// eslint-disable-next-line no-new
// new Server({
//   models: {
//     today_leads: Model,
//     movies: Model,
//     admin_messages: Model
//   },
//   seeds (server) {
//     server.db.loadData({
//       movies: [
//         { title: 'Interstellar' },
//         { title: 'Inception' },
//         { title: 'Dunkirk' }
//       ],
//       admin_messages: [
//         { message: 'hello new plot added on madurai', createdAt: new Date() },
//         { message: 'hello new plot added on chennai', createdAt: new Date() }
//       ],
//       today_leads: leaddata
//     })
//   },
//   routes () {
//     this.namespace = '/api'
//     this.get('/movies', (schema, request) => {
//       return schema.movies.all()
//     })
//     this.get('/admin_messages', (schema, request) => {
//       return schema.db.admin_messages
//     })
//     this.get('/users', (schema, request) => {
//       return ['Deepan', 'Aswath', 'Gunalan', 'Krishnaveni']
//     })

//     this.get('/movies/:id', (schema, request) => {
//       const id = request.params.id

//       return schema.movies.find(id)
//     })

//     this.post('/movies', (schema, request) => {
//       const attrs = JSON.parse(request.requestBody)

//       return schema.movies.create(attrs)
//     })

//     this.patch('/movies/:id', (schema, request) => {
//       const newAttrs = JSON.parse(request.requestBody)
//       const id = request.params.id
//       const movie = schema.movies.find(id)

//       return movie.update(newAttrs)
//     })

//     this.delete('/movies/:id', (schema, request) => {
//       const id = request.params.id

//       return schema.movies.find(id).destroy()
//     })

//     this.get('/today_leads', (schema, request) => {
//       return schema.db.today_leads
//     })
//   }

// })

const storeModel = createStore(models)

const VerifyUser = (props) => {
  const history = useHistory()
  const [isSecure, setIsSecure] = useState(false)
  useEffect(() => {
    check()
  }, [])
  const check = () => {
    if (props.isLoggedIn && props.currentUser.userRole === props.roleType) {
      // setIsSecure(true)
      return <Component {...props}></Component>
    } else {
      return (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  }
  return <></>
}
const AppRouter = () => {
  return (
    <>
      <Route exact path="/" component={LoginForm}></Route>
      <Route exact path="/login" component={LoginForm}></Route>
      {/* <AuthenticatedRoute
        path="/agent"
        component={AgentHome}
        roleType="2"
      ></AuthenticatedRoute> */}
      <Route exact path="/agent" component={AgentHome}></Route>
      <Route exact path="/agent/add-lead" component={AddLead}></Route>
      <Route exact path="/agent/overall" component={OverAll}></Route>

      <Route exact path="/admin" component={AdminHome}></Route>
      <Route
        exact
        path="/admin/overall-product-report"
        component={OverallProductReport}
      ></Route>
      <Route exact path="/admin/add-plot-area" component={AddPlotArea}></Route>
    </>
  )
}
const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useStoreState((state) => state.auth.isLoggedIn)
  const currentUser = useStoreState((state) => state.auth.user)

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          currentUser.userRole === rest.roleType ? (
            <Component {...props}></Component>
          ) : (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}
const App = () => {
  return (
    <BrowserRouter>
      <StoreProvider store={storeModel}>
        <AppRouter />
      </StoreProvider>
    </BrowserRouter>
  )
}

export default App
