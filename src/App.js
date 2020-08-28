import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { StoreProvider, createStore } from 'easy-peasy'
import models from './models'
import './App.css'
import AdminHome from './screens/admin/Home'
import OverallProductReport from './screens/admin/OverallProductReport'
import ProductLead from './components/ProductLead'
import { AddPlotArea } from './screens/admin/AddPlotArea'
import { AgentHome } from './screens/agent/Home'
import { OverAll } from './screens/agent/OverAll'
import AddLead from 'screens/agent/AddLead'
import AddProduct from 'screens/admin/AddProduct'
import { ProductList } from 'screens/admin/ProductList'
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import { FinancialList } from 'screens/admin/FinancialList'
import AddFinancialMetrics from 'screens/admin/AddFinancialMetrics'
import { LeadList } from 'screens/agent/LeadList'
import LoginForm from 'screens/Login'
import PrivateRoute from 'screens/auth/PrivateRoute'
import { Property } from 'screens/admin/Property'
import { AreaList } from 'screens/agent/AreaList'
import AddCompany from './screens/agent/AddCompany'
import MaterialTableDemo from './screens/agent/Agentmaterial'
// import { Server, Model } from 'miragejs'

// const leaddata = []
// for (let i = 0; i < 35; i++) {
//   leaddata.push({
//     key: i,
//     name: `Paul walker ${i}`,
//     email: `Paulwalker${i}@gmail.com`,
//     contact_number: '1234567890',
//     next_schedule: '10:30AM',
//     location: 'madurai',
//     intrested_plots:
//       i % i === 0
//         ? ['P124', 'P435', 'G343']
//         : ['P124', 'P435', 'G343', 'P124', 'P435', 'P124', 'P435'],
//     score_summary: ['happy', 'sad', 'okay']
//   })
// }

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

function AppRouter() {
  return (
    <>
      <Route exact path="/" component={LoginForm}></Route>
      <Route exact path="/login" component={LoginForm}></Route>

      <PrivateRoute
        component={AddPlotArea}
        path="/admin/add-plot-area"
        exact
        userRole="1"
      ></PrivateRoute>
      <PrivateRoute
        component={AgentHome}
        path="/agent"
        exact
        userRole="2"
      ></PrivateRoute>
      <PrivateRoute
        component={LeadList}
        path="/agent/leads"
        exact
        userRole="2"
      ></PrivateRoute>
      <PrivateRoute
        component={OverallProductReport}
        path="/agent/overall-product-report"
        exact
        userRole="2"
      ></PrivateRoute>
      <PrivateRoute
        component={OverAll}
        path="/agent/overall"
        exact
        userRole="2"
      ></PrivateRoute>
      <PrivateRoute
        component={AddLead}
        path="/agent/add-lead"
        exact
        userRole="2"
      ></PrivateRoute>
      <PrivateRoute
        component={AddProduct}
        path="/admin/add-product"
        exact
        userRole="1"
      ></PrivateRoute>
      <PrivateRoute
        component={AddProduct}
        path="/agent/add-product"
        exact
        userRole="2"
      ></PrivateRoute>
      <PrivateRoute
        component={ProductList}
        path="/admin/productlist"
        exact
        userRole="1"
      ></PrivateRoute>
      <PrivateRoute
        component={ProductList}
        path="/agent/productlist"
        exact
        userRole="2"
      ></PrivateRoute>
      <PrivateRoute
        component={AddCompany}
        path="/admin/add-company"
        exact
        userRole="1"
      ></PrivateRoute>
      <PrivateRoute
        component={AddCompany}
        path="/agent/add-company"
        exact
        userRole="2"
      ></PrivateRoute>
      <PrivateRoute
        component={AreaList}
        path="/agent/area-list"
        exact
        userRole="2"
      ></PrivateRoute>

      <PrivateRoute
        component={AdminHome}
        path="/admin"
        exact
        userRole="1"
      ></PrivateRoute>

      <PrivateRoute
        component={Property}
        path="/admin/property"
        exact
        userRole="1"
      ></PrivateRoute>
      <PrivateRoute
        component={AddLead}
        path="/admin/add-lead"
        exact
        userRole="1"
      ></PrivateRoute>
      <PrivateRoute
        component={OverallProductReport}
        path="/admin/overall-product-report"
        exact
        userRole="1"
      ></PrivateRoute>
      <PrivateRoute
        component={AddPlotArea}
        path="/admin/add-plot-area"
        exact
        userRole="1"
      ></PrivateRoute>
      <PrivateRoute
        component={AddFinancialMetrics}
        path="/admin/add-financial-metrics"
        exact
        userRole="1"
      ></PrivateRoute>
      <PrivateRoute
        component={AddFinancialMetrics}
        path="/agent/add-financial-metrics"
        exact
        userRole="2"
      ></PrivateRoute>
      <PrivateRoute
        component={FinancialList}
        path="/admin/financiallist"
        exact
        userRole="1"
      ></PrivateRoute>
      <PrivateRoute
        component={FinancialList}
        path="/agent/financiallist"
        exact
        userRole="2"
      ></PrivateRoute>
      <Route path="*" render={() => <Redirect to="/login"></Redirect>}></Route>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <StoreProvider store={storeModel}>
        <AppRouter />
      </StoreProvider>
    </BrowserRouter>
  )
}

export default App
