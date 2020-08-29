import { action, thunk } from 'easy-peasy'
import rest from 'services/http'
import constants from '../constants'
import { message } from 'antd'

const metricsModel = {
  metriclist: [],

  setMetric: action((state, payload) => {
    state.metriclist = payload
  }),
  unSetMetric: action((state, payload) => {
    state.metriclist = []
  }),
 
  getMetrics: thunk(async (actions,data) => {
    actions.setMetric([])
    rest
      .get(constants.URL.GET_METRICS+data.params)
      .then((res) => {
        actions.setMetric(res.data)  
        
        data.callback()      
      })
      .catch((err) => {
        message.error('Metrics loading failed')
        console.error(err)
      })
  }),  
  addNewMetric: action((state, payload) => {
    state.metriclist.push(payload)
  })
  
}

export default metricsModel
