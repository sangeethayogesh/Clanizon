import { action, thunk } from 'easy-peasy'
import rest from 'services/http'
import constants from '../constants'
import { message } from 'antd'

const performanceModel = {
  agentperflist: null,
  perflist: null,

  setAgentPerformance: action((state, payload) => {
    state.agentperflist = payload
  }),
  unsetAgentPerformance: action((state, payload) => {
    state.agentperflist= null
  }),
  setPerfomanceList: action((state, payload) => {
    state.perflist = payload
  }),
  unsetPerfomanceList: action((state, payload) => {
    state.perflist = null
  }),
  getPerformanceByAgent: thunk(async (actions, data) => {
    actions.setAgentPerformance({})
    rest
      .get(constants.URL.GET_AGENT_PERFORMANCE+data.params)
      .then((res) => {
        actions.setAgentPerformance(res.data)
       
      })
      .catch((err) => {
        message.error('Agent performance loading failed')
        console.error(err)
      })
  }),

  getOverAllPerformance: thunk(async (actions, data) => {
    actions.setPerfomanceList({})
    rest
      .get(constants.URL.GET_PERFORMANCE_DATA+data)
      .then((res) => {
        actions.setPerfomanceList(res.data)
        ///callback()
      })
      .catch((err) => {
        message.error('Overall Performance loading failed')
        console.error(err)
      })
  }),
  
  
  // count: computed(state => state.productIds.length),
}

export default performanceModel
