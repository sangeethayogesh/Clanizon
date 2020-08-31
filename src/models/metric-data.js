import { action, thunk } from 'easy-peasy'
import rest from 'services/http'
import constants from '../constants'
import { message } from 'antd'

const metricsDataModel = {
  businessmetrics: null,
  amountmetrics: null,

  setBusinessMetrics: action((state, payload) => {
    state.businessmetrics = payload
  }),
  unsetBusinessMetrics: action((state, payload) => {
    state.businessmetrics= null
  }),
  setAmountMetrics: action((state, payload) => {
    state.amountmetrics = payload
  }),
  unsetAmountMetrics: action((state, payload) => {
    state.amountmetrics = null
  }),
  getBusinessMetrics: thunk(async (actions, data) => {
    actions.setBusinessMetrics({})
    rest
      .get(constants.URL.GET_BUSINESS_METRICS)
      .then((res) => {
        actions.setBusinessMetrics(res.data)
        
      })
      .catch((err) => {
        message.error('Business Metrics  loading failed')
        console.error(err)
      })
  }),

  getAmountMetrics: thunk(async (actions, callback) => {
    actions.setAmountMetrics({})
    rest
      .get(constants.URL.GET_AMOUNT_METRICS)
      .then((res) => {
        actions.setAmountMetrics(res.data)
        
      })
      .catch((err) => {
        message.error('Amount Metrics loading failed')
        console.error(err)
      })
  }),
  
  
  // count: computed(state => state.productIds.length),
}

export default metricsDataModel
